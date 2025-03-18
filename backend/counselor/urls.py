from django.urls import path
from . import views

urlpatterns = [
    path('', views.counselor_list, name='counselor_list'),  # List all counselors
]
