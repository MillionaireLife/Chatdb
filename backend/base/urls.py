from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path("helloworld",views.helloworld, name="helloworld"),
    path("books",views.books, name="books"),
    path("books_post",views.books_post, name="books_post"),
]
