# Generated by Django 4.2.15 on 2024-08-25 02:20

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('contenttypes', '0002_remove_content_type_name'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0010_story_task_story'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='task',
            name='Story',
        ),
        migrations.CreateModel(
            name='SubTask',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('priority', models.CharField(choices=[('LOW', 'Low'), ('NORMAL', 'Normal'), ('HIGH', 'High'), ('URGENT', 'Urgent')], default='NORMAL', max_length=15)),
                ('status', models.CharField(choices=[('TO_DO', 'To Do'), ('IN_PROGRESS', 'In Progress'), ('COMPLETED', 'Completed')], default='TO_DO', max_length=15)),
                ('attachment', models.FileField(upload_to='attachment/')),
                ('object_id', models.PositiveIntegerField()),
                ('assigned_to', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='%(app_label)s_%(class)s_assigned_to', to=settings.AUTH_USER_MODEL)),
                ('content_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='contenttypes.contenttype')),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='%(app_label)s_%(class)s_created_by', to=settings.AUTH_USER_MODEL)),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.project')),
                ('tags', models.ManyToManyField(to='api.tag')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
