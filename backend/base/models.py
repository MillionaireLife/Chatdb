from django.db import models

class queryresponse(models.Model):
    SENDER = [("user", "User"),("ai","AI")]
    sender = models.CharField(max_length=100,choices=SENDER)
    message = models.TextField()
    TYPE = [("text", "TEXT"),("table","TABLE"),("chart", "CHART")]
    type = models.CharField(max_length=100,choices=TYPE)
