from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path("messages",views.messages, name="get/delete all messages"),
    path("executequery",views.execute_query, name="execute query"),
]
