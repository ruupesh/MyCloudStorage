from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    iam_user = models.CharField(max_length=100, blank=True, null=True)
    iam_password = models.CharField(max_length=100, blank=True, null=True)


