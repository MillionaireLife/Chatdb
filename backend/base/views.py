from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import queryresponse
from .serializers import queryresponseSerializer



@api_view(["POST","GET","PUT","PATCH","DELETE"])
def messages(request):
    if request.method == "GET":
        messages = queryresponse.objects.all() #fetches all from db
        serializer = queryresponseSerializer(messages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == "PUT":
        message = request.data
        object = queryresponse.objects.get(id = message["id"])
        serializer = queryresponseSerializer(object,data = message, partial = False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "PATCH":
        message = request.data
        object = queryresponse.objects.get(id = message["id"])
        serializer = queryresponseSerializer(object,data = message, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
    elif request.method == "DELETE":
        message = request.data
        object = queryresponse.objects.get(id = message["id"])
        object.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)      
    else:
        message = request.data
        serializer = queryresponseSerializer(data = message)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def executequery(request):
    message = request.data.get("message")
    type = "table" if "table" in message.lower() else "chart" if "chart" in message.lower() else "text"
    response = generate_response(message,type)
    # object_data = queryresponse(message=message,type=type,response=response)
    object_data = {"message":message,"type":type,"response":response}
    print(object_data)
    serializer = queryresponseSerializer(data = object_data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED) 
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
       
def generate_response(message,type):
    if type == "table":
        return {
        "head":['Element position', 'Atomic mass', 'Symbol', 'Element name'],
        "body": [[6, 12.011, 'C', 'Carbon'],[7, 14.007, 'N', 'Nitrogen'],[39, 88.906, 'Y', 'Yttrium'],[56, 137.33, 'Ba', 'Barium'],[58, 140.12, 'Ce', 'Cerium']]}
    elif type == "chart":
        return {
           "body" : [{ "name": 'USA', "value": 400, "color": 'indigo.6' },{ "name": 'India', "value": 300, "color": 'yellow.6' },{ "name": 'Japan', "value": 300, "color": 'teal.6' },{ "name": 'Other', "value": 200, "color": 'gray.6' }]
        }
    else:
        return {"text": message}
    

    
    
        
    