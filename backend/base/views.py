from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import queryresponse
from .serializers import queryresponseSerializer

@api_view(["GET"])
def helloworld(request):
    hello = {"sender":"user", "message":"Hello World"}
    return Response(hello, status=status.HTTP_200_OK)

@api_view(["GET","POST"])
def books(request):
    books = [
        {"title":"The Great Gatsby", "author":"F. Scott Fitzgerald", "id":"1"},
        {"title":"The Catcher in the Rye", "author":"J.D. Salinger", "id":"2"},
        {"title":"To Kill a Mockingbird", "author":"Harper Lee", "id":"3"} ]
    if request.method == "GET":
        id = request.GET.get("id")
        if id is None:
            return Response(books, status=status.HTTP_200_OK)
        else:
            res= next((book for book in books if book['id'] == id), None)
            return Response(res, status=status.HTTP_200_OK)
    else:
        book = request.data
        books.append(book)
        return Response(books, status=status.HTTP_201_CREATED)

@api_view(["POST"])
def books_post(request):
    book = request.data
    print(book)
    return Response(book, status=status.HTTP_201_CREATED)

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
    
    
        
    