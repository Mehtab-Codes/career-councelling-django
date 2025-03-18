from django.contrib.auth.models import User
from django.db import models

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='auth_userprofile')
    skills = models.JSONField(default=list)
    interests = models.JSONField(default=list)
    career_goals = models.TextField(blank=True, null=True)
    career_recommendations = models.JSONField(default=list)

    def __str__(self):
        return self.user.username
