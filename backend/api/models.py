from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.contrib.auth.base_user import BaseUserManager

PRIORITY_CHOICES = [
        ("LOW", "Low"),
        ("NORMAL", "Normal"),
        ("HIGH", "High"),
        ("URGENT", "Urgent"),
    ]
    
STATUS_CHOICES = [
        ("TO_DO", "To Do"),
        ("IN_PROGRESS", "In Progress"),
        ("COMPLETED", "Completed"),
    ]

# Add UserManager class
class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, password=None):
        if not email:
            raise ValueError("An email is required.")
        if not username:
            raise ValueError("A username is required.")
        if not password:
            raise ValueError("A password is required.")
        
        email = self.normalize_email(email)
        user = self.model(email=email, username=username)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, username, password=None):
        user = self.create_user(email=email, username=username, password=password)
        user.is_superuser = True
        user.save()
        return user


# Add CustomUser class
class CustomUser(AbstractBaseUser, PermissionsMixin):
    id = models.BigAutoField(primary_key=True)
    email = models.EmailField(max_length=255, unique=True)
    username = models.CharField(max_length=50, unique=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    # group = models.ForeignKey()
    
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]
    
    objects = CustomUserManager()
    
    def __str__(self) -> str:
        return self.username

# Create your models here.
class Project(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=100)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    version = models.CharField(max_length=10,default='1.0.0')
    
    def __str__(self) -> str:
        return self.title
    
class Tag(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=100)
    description = models.TextField()
    
    def __str__(self) -> str:
        return self.title
    
class Comment(models.Model):
    id = models.BigAutoField(primary_key=True)
    body = models.CharField(max_length=1000)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    created_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.body

class Issue(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=100)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(CustomUser, related_name="%(app_label)s_%(class)s_created_by", on_delete=models.CASCADE, null=True)
    assigned_to = models.ForeignKey(CustomUser, related_name="%(app_label)s_%(class)s_assigned_to", on_delete=models.CASCADE, null=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    priority = models.CharField(max_length=15, choices=PRIORITY_CHOICES, default="NORMAL")
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default="TO_DO")
    attachment = models.FileField(upload_to="attachment/")
    tags = models.ManyToManyField(Tag, related_name="%(app_label)s_%(class)s_tags", blank=True)
    start_date = models.DateField(null=True)
    target_date = models.DateField(null=True)
    
    def __str__(self) -> str:
        return self.title
    
    class Meta:
        abstract = True
        
class Epic(Issue):
    class Meta(Issue.Meta):
        abstract = False
    
class Bug(Issue):
    epic = models.ForeignKey(Epic, on_delete=models.CASCADE, null=True)
    
    class Meta(Issue.Meta):
        abstract = False
        
class Story(Issue):
    epic = models.ForeignKey(Epic, on_delete=models.CASCADE, null=True)
    
    class Meta(Issue.Meta):
        abstract = False
    
class Task(Issue):
    epic = models.ForeignKey(Epic, on_delete=models.CASCADE, null=True)
    
    class Meta(Issue.Meta):
        abstract = False
        
class SubTask(Issue):
    issue_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    issue_id = models.PositiveIntegerField()
    issue = GenericForeignKey("issue_type", "issue_id")
    
    class Meta(Issue.Meta):
        abstract = False
        
#class Group(models.Model):
#    id = models.BigAutoField(primary_key=True)
#    groupName = models.CharField(max_length=100)
    
    
    

