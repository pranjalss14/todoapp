from django.db import models

# Create your models here
class Ticket(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255, null=False)
    description = models.TextField()
    status = models.CharField(max_length=255, null=False)
    priority = models.CharField(max_length=255, null=False)
    owner = models.CharField(max_length=255, null=False)
    created_on = models.DateTimeField(auto_now_add=True)

