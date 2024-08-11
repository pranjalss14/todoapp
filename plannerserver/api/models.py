from django.db import models
from django.core.exceptions import ValidationError

# Create your models here
class Ticket(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255, null=False)
    description = models.TextField()
    status = models.CharField(max_length=255, null=False)
    priority = models.CharField(max_length=255, null=False)
    owner = models.ForeignKey('User', on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)

class User(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=255, null=False)
    password = models.CharField(max_length=255, null=False)
    email = models.CharField(max_length=255, null=False)
    status = models.CharField(max_length=255, null=False)
    created_on = models.DateTimeField(auto_now_add=True)
    ticket_status = models.JSONField()

    def clean(self):

        if not isinstance(self.ticket_status, dict):
            raise ValidationError("ticket_status must be a dictionary.")

        if len(self.ticket_status) > 10:
            raise ValidationError("ticket_status cannot have more than 10 entries.")

        for key, stage in self.ticket_status.items():
            if not isinstance(stage, dict):
                raise ValidationError(f"'{key}' must be a dictionary.")
            if "name" not in stage or "order" not in stage:
                raise ValidationError(f"Each status in ticket_status must contain 'name' and 'order' fields.")
            if not isinstance(stage["name"], str):
                raise ValidationError(f"'name' must be a string in status '{key}'.")
            if not isinstance(stage["order"], int):
                raise ValidationError(f"'order' must be an integer in status '{key}'.")

    def save(self, *args, **kwargs):
        self.clean()
        super(User, self).save(*args, **kwargs)

    def get_ticket_status(self):
        return self.ticket_status
    def __str__(self):
        return self.username
