from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Lead(models.Model):
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=100, unique=True)
    message = models.CharField(max_length=500, blank=True)
    create_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(
        User, related_name="leads", on_delete=models.CASCADE, null=True)

    class Meta:
        ordering = ('-create_at',)  # ranger par ordre decroissant

    def __str__(self):
        return self.name + '' + self.email  # return le titre de chaque objet
