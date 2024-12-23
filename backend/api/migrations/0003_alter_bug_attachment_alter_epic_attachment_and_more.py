# Generated by Django 4.2.15 on 2024-10-16 04:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_bug_attachment_alter_bug_created_by_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bug',
            name='attachment',
            field=models.FileField(blank=True, null=True, upload_to='attachment/'),
        ),
        migrations.AlterField(
            model_name='epic',
            name='attachment',
            field=models.FileField(blank=True, null=True, upload_to='attachment/'),
        ),
        migrations.AlterField(
            model_name='story',
            name='attachment',
            field=models.FileField(blank=True, null=True, upload_to='attachment/'),
        ),
        migrations.AlterField(
            model_name='subtask',
            name='attachment',
            field=models.FileField(blank=True, null=True, upload_to='attachment/'),
        ),
        migrations.AlterField(
            model_name='task',
            name='attachment',
            field=models.FileField(blank=True, null=True, upload_to='attachment/'),
        ),
    ]
