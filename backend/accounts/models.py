from django.contrib.auth.models import AbstractUser
from django.db import models

#Extends Django's user model to add different roles (student/teacher/admin)

class User(AbstractUser):
#User roles
    ROLE_CHOICES = [
        ('student', 'Student'),
        ('teacher', 'Teacher'),
        ('admin', 'Admin'),
    ]
#Stores user roles
    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default='student'
    )

