from django.urls import path
from .views import recommend_careers

urlpatterns = [
    path('recommend/', recommend_careers, name="recommend_careers"),
]
