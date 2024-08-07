from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import queryresponse
from .serializers import queryresponseSerializer


@api_view(["POST"])
def execute_query(request):
    message = request.data.get("message", "")
    message_type = "table" if "table" in message.lower() else "text"
    response_message = generate_ai_response(message_type, message)
    
    new_message = queryresponse(
        message=message,
        type=message_type,
        response=response_message
    )
    
    new_message.save()
    serializer = queryresponseSerializer(new_message)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


def generate_ai_response(type, message):
    if type == "text":
        return { "text": "AI response: " + message }
    else:
        return {
            "head": ["Element position", "Atomic mass", "Symbol", "Element name"],
            "body": [
                [6, 12.011, "C", "Carbon"],
                [7, 14.007, "N", "Nitrogen"],
                [39, 88.906, "Y", "Yttrium"],
                [56, 137.33, "Ba", "Barium"],
                [58, 140.12, "Ce", "Cerium"]
            ]
        }