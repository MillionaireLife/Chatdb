from rest_framework import serializers
from .models import queryresponse


class queryresponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = queryresponse
        fields = [ "message", "type","id","response","created_at" ]
        # __all__ is used to include all fields exclude = ["id"] is used to exclude id field
        read_only_fields = ["id","response","type","created_at"]