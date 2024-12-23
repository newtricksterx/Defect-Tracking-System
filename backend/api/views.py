from django.shortcuts import render
from django.contrib.auth import login, logout, get_user_model
from rest_framework import generics, viewsets, status
from .serializers import (UserSerializer, ProjectSerializer, BugSerializer, 
                          UserRegistrationSerializer, TaskSerializer, TagSerializer, StorySerializer, 
                          SubTaskSerializer, EpicSerializer, CommentSerailizer, UserLoginSerializer,
                          EpicHistorySerializer, StoryHistorySerializer, TaskHistorySerializer, BugHistorySerializer, GroupSerializer)

from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.response import Response
from .models import Project, Bug, Task, Tag, Story, SubTask, Epic, Comment, CustomUser, Group
from django.http import JsonResponse
from rest_framework import views, permissions
from rest_framework.authentication import SessionAuthentication
from django.core.exceptions import ValidationError
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.throttling import UserRateThrottle
from .throttle_rate import (TokenRefreshThrottle)

# Create your views here.

class CustomTokenObtainPairView(TokenObtainPairView):
    permission_classes = [AllowAny]
    
class CustomTokenRefreshView(TokenRefreshView):
    throttle_classes = [TokenRefreshThrottle]

class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
class UserLogin(views.APIView):
    permission_classes = (permissions.AllowAny, )
    authentication_classes = (SessionAuthentication, )
    def post(self, request):
        data = request.data
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)
        
class UserLogout(views.APIView):
    permission_classes = (permissions.AllowAny, )
    authentication_classes = ()
    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)
    
    
class UserRegister(views.APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(request.data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
		
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
            
            
class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    
class EpicViewSet(viewsets.ModelViewSet):
    queryset = Epic.objects.all()
    serializer_class = EpicSerializer
    
    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        # Check if the user is authenticated
        if request.user.is_authenticated:
            data['created_by'] = request.user.id
        else:
            try:
                default_user = get_user_model().objects.get(username='default_user')
                data['created_by'] = default_user.id
            except get_user_model().DoesNotExist:
                raise ValidationError("Default user does not exist. Please create a default user.")

        serializer = self.get_serializer(data=data)
        
        print(data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def perform_create(self, serializer):
        serializer.save(issueType="EPIC")
        
        
class BugViewSet(viewsets.ModelViewSet):
    queryset = Bug.objects.all()
    serializer_class = BugSerializer
    
    def perform_create(self, serializer):
        if self.request.user.is_authenticated:
            # If the user is authenticated, use the logged-in user
            serializer.save(created_by=self.request.user, issueType="BUG")
        else:
            # If the user is not authenticated, raise an error or assign a default user
            default_user = get_user_model().objects.get(username='default_user')
            serializer.save(created_by=default_user, issueType="BUG")

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    
    def perform_create(self, serializer):
        if self.request.user.is_authenticated:
            # If the user is authenticated, use the logged-in user
            serializer.save(created_by=self.request.user, issueType="TASK")
        else:
            # If the user is not authenticated, raise an error or assign a default user
            default_user = get_user_model().objects.get(username='default_user')
            serializer.save(created_by=default_user, issueType="TASK")
        
class StoryViewSet(viewsets.ModelViewSet):
    queryset = Story.objects.all()
    serializer_class = StorySerializer
    
    def perform_create(self, serializer):
        if self.request.user.is_authenticated:
            # If the user is authenticated, use the logged-in user
            serializer.save(created_by=self.request.user, issueType="STORY")
        else:
            # If the user is not authenticated, raise an error or assign a default user
            default_user = get_user_model().objects.get(username='default_user')
            serializer.save(created_by=default_user, issueType="STORY")
        
class SubTaskViewSet(viewsets.ModelViewSet):
    queryset = SubTask.objects.all()
    serializer_class = SubTaskSerializer
    
    def perform_create(self, serializer):
        serializer.save(issueType="SUBTASK")
        
        if self.request.user.is_authenticated:
            # If the user is authenticated, use the logged-in user
            serializer.save(created_by=self.request.user, issueType="SUBTASK")
        else:
            # If the user is not authenticated, raise an error or assign a default user
            default_user = get_user_model().objects.get(username='default_user')
            serializer.save(created_by=default_user, issueType="SUBTASK")
        
class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    
class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerailizer

class EpicHistoryListView(generics.ListAPIView):
    serializer_class = EpicHistorySerializer

    def get_queryset(self):
        # Filter history by specific instance, if needed
        instance_id = self.kwargs.get('pk')  # Assuming you pass a pk to get specific history
        return Epic.history.filter(id=instance_id)
    
class StoryHistoryListView(generics.ListAPIView):
    serializer_class = StoryHistorySerializer

    def get_queryset(self):
        # Filter history by specific instance, if needed
        instance_id = self.kwargs.get('pk')  # Assuming you pass a pk to get specific history
        return Story.history.filter(id=instance_id)
    
    
class TaskHistoryListView(generics.ListAPIView):
    serializer_class = TaskHistorySerializer

    def get_queryset(self):
        # Filter history by specific instance, if needed
        instance_id = self.kwargs.get('pk')  # Assuming you pass a pk to get specific history
        return Task.history.filter(id=instance_id)
    
class BugHistoryListView(generics.ListAPIView):
    serializer_class = BugHistorySerializer

    def get_queryset(self):
        # Filter history by specific instance, if needed
        instance_id = self.kwargs.get('pk')  # Assuming you pass a pk to get specific history
        return Bug.history.filter(id=instance_id)