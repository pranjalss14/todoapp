# Generated by Django 5.0.7 on 2024-07-30 17:35

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Ticket",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("title", models.CharField(max_length=255)),
                ("description", models.TextField()),
                ("status", models.CharField(max_length=255)),
                ("priority", models.CharField(max_length=255)),
                ("owner", models.CharField(max_length=255)),
                ("created_on", models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
