# Generated by Django 5.1.4 on 2025-02-09 00:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="result",
            name="grammar",
            field=models.CharField(blank=True, max_length=3, null=True),
        ),
        migrations.AlterField(
            model_name="result",
            name="listening",
            field=models.CharField(blank=True, max_length=3, null=True),
        ),
        migrations.AlterField(
            model_name="result",
            name="pronunciation",
            field=models.CharField(blank=True, max_length=3, null=True),
        ),
        migrations.AlterField(
            model_name="result",
            name="reading",
            field=models.CharField(blank=True, max_length=3, null=True),
        ),
        migrations.AlterField(
            model_name="result",
            name="speaking",
            field=models.CharField(blank=True, max_length=3, null=True),
        ),
        migrations.AlterField(
            model_name="result",
            name="vocabulary",
            field=models.CharField(blank=True, max_length=3, null=True),
        ),
        migrations.AlterField(
            model_name="result",
            name="writing",
            field=models.CharField(blank=True, max_length=3, null=True),
        ),
        migrations.AlterUniqueTogether(
            name="result",
            unique_together={("student", "week")},
        ),
    ]
