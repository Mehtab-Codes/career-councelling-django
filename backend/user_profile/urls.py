from django.urls import path
from . import views

urlpatterns = [
    path('', views.user_profile_view, name='profile_home'),

]
