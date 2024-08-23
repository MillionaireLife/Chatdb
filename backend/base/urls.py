from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path("messages", views.messages, name="get/delete all messages"),
    path("executequery", views.executequery, name="execute query"),
    path("fetch_from_db", views.fetch_from_db, name="fetch_from_db"),
    path("settings", views.fetchsettings, name="fetchsettings"),
]
