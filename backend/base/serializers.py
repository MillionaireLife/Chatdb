from rest_framework import serializers
from .models import queryresponse


class queryresponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = queryresponse
        fields = [ "message", "type","id","response","created_at" ]
        # __all__ is used to include all fields exclude = ["id"] is used to exclude id field
        read_only_fields = ["id","created_at"]
    
    def validate_response(self,value):
        type = self.initial_data.get("type")
        if type == "text":
            self.validate_text(value)
        elif type == "table":
            self.validate_table(value)
        elif type == "chart":
            self.validate_chart(value)         
        return value
    
    def validate_chart(self,value):
        if not isinstance(value,dict) or "body" not in value:
            raise serializers.ValidationError("Invalid Response Format for table type")
        if type(value["body"]) != list:
            raise serializers.ValidationError("Invalid Response Format for table type")
        if type(value["body"][0]) != dict:
            raise serializers.ValidationError("Invalid Response Format for table type")
        
    def validate_table(self,value):
        if not isinstance(value,dict) or "head" not in value or "body" not in value:
            raise serializers.ValidationError("Invalid Response Format for table type")
        if not isinstance(value["head"], list) or not isinstance(value["body"], list):
            raise serializers.ValidationError("Invalid Response Format for table type")
        if len(value["body"]) > 0 and len(value["head"]) != len(value["body"][0]):
            raise serializers.ValidationError("Number of columns in head and body should be the same")
        # if type(value["head"]) != list or type(value["body"]) != list:
        #     raise serializers.ValidationError("Invalid Response Format for table type")
        # if len(value["head"]) != len(value["body"][0]):
        #     raise serializers.ValidationError("No of columns in head and body should be same")
        # if type("body") != list:
        #     raise serializers.ValidationError("Invalid Response Format for table type")
        
    def validate_text(self,value):
        if not isinstance(value,dict) or "text" not in value:
            raise serializers.ValidationError("Invalid Format for text type")
        if type(value["text"]) != str:
            raise serializers.ValidationError("Invalid Format for text type")
        