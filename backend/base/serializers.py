from rest_framework import serializers
from .models import queryresponse


class queryresponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = queryresponse
        fields = ['id', 'message', 'type', 'response', 'created_at']
        read_only_fields = ['id', 'response', 'type', 'created_at']
        