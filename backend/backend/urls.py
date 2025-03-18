"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),  # Django Admin Panel
    path('auth/', include('authentication.urls')),  # Authentication Routes
    # path('profile/', include('user.urls')), # Overall user page (OPTIONAL)
    path('profile/', include('user_profile.urls')),  # User Profile Routes
    path('career/', include('career_assessment.urls')),  # Career Assessment Routes
    path('recommendations/', include('recommendations.urls')),  # Career Recommendations Routes
    path('courses/', include('courses.urls')),  # Courses & Resources Routes
    path('jobs/', include('jobs.urls')),  # Jobs & Internships Routes
    path('counselors/', include('counselor.urls')),  # Counselor Matching & Consultation
    path('chat/', include('chat.urls')),  # Chat & Consultation
    path('forum/', include('forum.urls')),  # Forum & Community
    # Your other URLs here...

]
# Only in development mode
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
