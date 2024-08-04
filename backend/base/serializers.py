from rest_framework import serializers
from .models import queryresponse


class queryresponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = queryresponse
        fields = ["sender", "message", "type"] 
        # __all__ is used to include all fields exclude = ["id"] is used to exclude id field