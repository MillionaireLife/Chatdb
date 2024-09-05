from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path("messages", views.messages, name="get/delete all messages"),
    path("fetchfromdb", views.fetchfromdb, name="fetchfromdb"),
    path("settings", views.fetchsettings, name="fetchsettings"),
    path("disconnectdb", views.disconnectdb, name="disconnectdb"),
    path("switchdatabase", views.switchdatabase, name="switchdatabase"),
]
