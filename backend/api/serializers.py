from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.contenttypes.models import ContentType
from .models import Project, Bug, Issue, Task, Tag, Story, SubTask, Epic, Comment, CustomUser
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'username']

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    password2 = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'username', 'is_superuser', 'password', 'password2']
        read_only_fields = ['id']
        
    def validate(self, attrs):
        password=attrs.get('password')
        password2=attrs.pop('password2')
        if password != password2:
            raise serializers.ValidationError({"password": "Passwords didn't match."})
        return attrs
        
    def create(self, validated_data):
        email = validated_data.get('email')
        password = validated_data.get('password')
        username = validated_data.get('username')
        is_superuser = validated_data.get('is_superuser')
        
        if is_superuser:
            user = CustomUser.objects.create_superuser(email=email, username=username, password=password)
        else:
            user = CustomUser.objects.create_user(email=email, username=username, password=password)
        return user
    
class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length = 255)
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})
    
    def check_user(self, clean_data):
        user = authenticate(email=clean_data['email'], password=clean_data['password'])
        if not user:
            raise AuthenticationFailed("Invalid login credentials")
        return user
    
class ProjectSerializer(serializers.ModelSerializer):
    title = serializers.CharField(required=True)
    
    class Meta:
        model = Project
        fields = ['id','title', 'description', 'created_at', 'updated_at', 'version']
        read_only_fields = ['id']
        
    def validate_version(self, value):
        project = self.instance
        
        for index in range(0, len(value)):
            if index % 2 == 0 and '0' <= value[index] <= '9':
                pass
            elif index % 2 != 0 and value[index] == '.':
                pass
            else:
                raise serializers.ValidationError("Version is not a valid format. Format: X.X.X, where X is a digit.")

        if project and value < project.version:
            raise serializers.ValidationError("Version is not a valid. Updated version must be higher than current version.")
        
        return value   
            
class TagSerializer(serializers.ModelSerializer):
    title = serializers.CharField(required=True)
    
    class Meta:
        model = Tag
        fields = ['id', 'title', 'description']   
        
class CommentSerailizer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'body', 'project', 'created_by', 'created_at']

class IssueSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    
    class Meta:
        model = Issue
        fields = ['id', 'issueType','title', 'description', 'created_at', 'updated_at',
                  'created_by', 'assigned_to', 'project', 'priority', 'status', 'attachment', 'tags', 'start_date', 'target_date']
        read_only_fields = ['id']
        
    def validate(self, attrs):
        start_date=attrs.get('start_date')
        target_date=attrs.get('target_date')
        
        if start_date and target_date and start_date > target_date:
            raise serializers.ValidationError('Error: Start date is after the Target date.')
        
        return attrs
        
class EpicSerializer(IssueSerializer):
    class Meta(IssueSerializer.Meta):
        model = Epic
        fields = IssueSerializer.Meta.fields
        
class BugSerializer(IssueSerializer):
    class Meta(IssueSerializer.Meta):
        model = Bug
        fields = IssueSerializer.Meta.fields + ['epic']

class TaskSerializer(IssueSerializer):
    class Meta(IssueSerializer.Meta):
        model = Task
        fields = IssueSerializer.Meta.fields + ['epic']

class StorySerializer(IssueSerializer):
    class Meta(IssueSerializer.Meta):
        model = Story
        fields = IssueSerializer.Meta.fields + ['epic']
        
class SubTaskObjectRelatedField(serializers.RelatedField):
    def to_representation(self, value):
        if isinstance(value, Story):
            return 'Story: ' + value.title
        elif isinstance(value, Bug):
            return 'Bug: ' + value.title
        elif isinstance(value, Task):
            return 'Task: ' + value.title
          
        
        raise serializers.ValidationError('Unexpected Issue type.')
        # raise Exception('Unexpected type of issue.')    
    
class SubTaskSerializer(IssueSerializer):
    issue = SubTaskObjectRelatedField(read_only=True)
    
    class Meta(IssueSerializer.Meta):
        model = SubTask
        fields = IssueSerializer.Meta.fields + ['issue_type','issue_id','issue']
        
    def validate(self, attrs):
        issue_type=attrs.get('issue_type')
        issue_id=attrs.get('issue_id')
        
        if issue_type == ContentType.objects.get_for_model(Story) and Story.objects.filter(id=issue_id).first() is not None:
            pass
        elif issue_type == ContentType.objects.get_for_model(Task) and Task.objects.filter(id=issue_id).first() is not None:
            pass
        elif issue_type == ContentType.objects.get_for_model(Bug) and Bug.objects.filter(id=issue_id).first() is not None:
            pass
        else:
            raise serializers.ValidationError('Invalid Issue type or Issue id.')
        
        return super().validate(attrs)
    
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['id'] = user.id
        token['email'] = user.email
        token['username'] = user.username
        # ...

        return token