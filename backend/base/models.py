from django.db import models

class queryresponse(models.Model):
    message = models.TextField()
    TYPE = [("text", "TEXT"),("table","TABLE"),("chart", "CHART")]
    type = models.CharField(max_length=100,choices=TYPE)
    response = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
    
