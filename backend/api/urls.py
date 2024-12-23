from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from api.views import (UserViewSet, ProjectViewSet, BugViewSet, 
                       TaskViewSet, TagViewSet, StoryViewSet, 
                       SubTaskViewSet, EpicViewSet, UserLogin, 
                       UserLogout, UserRegister, CustomTokenObtainPairView,
                       CustomTokenRefreshView, EpicHistoryListView, StoryHistoryListView, TaskHistoryListView, BugHistoryListView,
                       GroupViewSet)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'projects', ProjectViewSet)
router.register(r'bug', BugViewSet)
router.register(r'task', TaskViewSet)
router.register(r'tag', TagViewSet)
router.register(r'story', StoryViewSet)
router.register(r'subtask', SubTaskViewSet)
router.register(r'epic', EpicViewSet)
router.register(r'groups', GroupViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('login/', UserLogin.as_view()),
    path('logout/', UserLogout.as_view()),
    path('register/', UserRegister.as_view()),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('epic/<int:pk>/history/', EpicHistoryListView.as_view(), name='epic-history'),
    path('story/<int:pk>/history/', StoryHistoryListView.as_view(), name='story-history'),
    path('task/<int:pk>/history/', TaskHistoryListView.as_view(), name='task-history'),
    path('bug/<int:pk>/history/', BugHistoryListView.as_view(), name='bug-history'),
]
