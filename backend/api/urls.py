from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from api.views import UserViewSet, ProjectViewSet, BugViewSet, TaskViewSet, TagViewSet, StoryViewSet, SubTaskViewSet, EpicViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'project', ProjectViewSet)
router.register(r'bug', BugViewSet)
router.register(r'task', TaskViewSet)
router.register(r'tag', TagViewSet)
router.register(r'story', StoryViewSet)
router.register(r'subtask', SubTaskViewSet)
router.register(r'epic', EpicViewSet)


urlpatterns = [
    path('', include(router.urls))
]
