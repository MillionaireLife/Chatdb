from django.db import models


class queryresponse(models.Model):
    TYPE = [("text", "TEXT"), ("table", "TABLE"), ("chart", "CHART")]

    message = models.TextField()
    type = models.CharField(max_length=100, choices=TYPE)
    response = models.JSONField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
