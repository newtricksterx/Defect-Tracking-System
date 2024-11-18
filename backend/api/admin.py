from django.contrib import admin
from .models import CustomUser, Project, Epic, Bug, Task, Story, Group, CustomUserManager

# Register your models here.
@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('email', 'username', 'is_active', 'is_admin')