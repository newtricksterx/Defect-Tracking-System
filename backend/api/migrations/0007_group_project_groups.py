# Generated by Django 5.1.2 on 2024-11-18 14:27

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_historicalbug_historicalepic_historicalstory_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Group',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('groupName', models.CharField(max_length=100)),
                ('users', models.ManyToManyField(null=True, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='project',
            name='groups',
            field=models.ManyToManyField(null=True, to='api.group'),
        ),
    ]
