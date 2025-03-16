# Generated by Django 5.1.4 on 2025-03-14 06:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="student",
            name="end_date",
            field=models.DateField(null=True),
        ),
        migrations.AddField(
            model_name="student",
            name="overall_listening",
            field=models.CharField(blank=True, max_length=1),
        ),
        migrations.AddField(
            model_name="student",
            name="overall_reading",
            field=models.CharField(blank=True, max_length=1),
        ),
        migrations.AddField(
            model_name="student",
            name="overall_speaking",
            field=models.CharField(blank=True, max_length=1),
        ),
        migrations.AddField(
            model_name="student",
            name="overall_writing",
            field=models.CharField(blank=True, max_length=1),
        ),
    ]
