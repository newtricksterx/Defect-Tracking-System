# Generated by Django 4.2.15 on 2024-08-26 04:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_subtask'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bug',
            name='tags',
            field=models.ManyToManyField(related_name='%(app_label)s_%(class)s_tags', to='api.tag'),
        ),
        migrations.AlterField(
            model_name='story',
            name='tags',
            field=models.ManyToManyField(related_name='%(app_label)s_%(class)s_tags', to='api.tag'),
        ),
        migrations.AlterField(
            model_name='subtask',
            name='tags',
            field=models.ManyToManyField(related_name='%(app_label)s_%(class)s_tags', to='api.tag'),
        ),
        migrations.AlterField(
            model_name='task',
            name='tags',
            field=models.ManyToManyField(related_name='%(app_label)s_%(class)s_tags', to='api.tag'),
        ),
    ]
