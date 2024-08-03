from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

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
        
    