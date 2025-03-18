from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.db import IntegrityError
import json

from user_profile.models import UserProfile  # Ensure UserProfile model is imported correctly

# Predefined career paths based on skills and interests
CAREER_PATHS = {
    "Data Science": ["Python", "Machine Learning", "Statistics"],
    "Web Development": ["JavaScript", "React", "HTML", "CSS"],
    "Cybersecurity": ["Networking", "Ethical Hacking", "Security Analysis"],
    "Software Engineering": ["Java", "C++", "Software Design"],
    "AI Research": ["Deep Learning", "NLP", "AI Algorithms"],
}

# Function to match user skills/interests with career paths
def get_career_recommendations(skills, interests):
    recommendations = []
    for career, required_skills in CAREER_PATHS.items():
        if any(skill in required_skills for skill in skills) or any(interest in required_skills for interest in interests):
            recommendations.append(career)
    return recommendations if recommendations else ["General Career Guidance"]

# User Registration View
@csrf_exempt
def register_view(request):
    """
    Handles user registration with profile data.
    Accepts JSON with 'name', 'email', 'password', 'skills', 'interests', 'career_goals'.
    """
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get("email")
            password = data.get("password")
            name = data.get("name")
            skills = data.get("skills", [])  # List of user skills
            interests = data.get("interests", [])  # List of user interests
            career_goals = data.get("career_goals", "")

            if User.objects.filter(username=username).exists():
                return JsonResponse({"error": "User already exists"}, status=400)

            user = User.objects.create_user(username=username, password=password, first_name=name)
            user.save()

            # Generate career recommendations
            recommendations = get_career_recommendations(skills, interests)

            # Create user profile with additional details
            UserProfile.objects.create(
                user=user,
                skills=skills,
                interests=interests,
                career_goals=career_goals,
                career_recommendations=recommendations
            )

            return JsonResponse({"message": "User registered successfully", "recommendations": recommendations}, status=201)

        except IntegrityError:
            return JsonResponse({"error": "Database error occurred"}, status=500)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)

# User Login View
@csrf_exempt
def login_view(request):
    """
    Handles user login and retrieves user profile including recommendations.
    """
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get("email")
            password = data.get("password")

            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)

                user_profile = UserProfile.objects.filter(user=user).first()
                recommendations = user_profile.career_recommendations if user_profile else []

                user_data = {
                    "id": user.id,
                    "name": user.first_name,
                    "email": user.username,
                    "recommendations": recommendations,
                }

                return JsonResponse({"message": "Login successful", "user": user_data}, status=200)
            else:
                return JsonResponse({"error": "Invalid credentials. Please try again."}, status=401)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)

# User Logout View
@csrf_exempt
def logout_view(request):
    """
    Handles user logout and ends the session.
    """
    if request.method == "POST":
        logout(request)
        return JsonResponse({"message": "Logout successful"}, status=200)

    return JsonResponse({"error": "Invalid request method"}, status=405)

# User Profile View
def profile_view(request):
    """
    Fetches user profile details along with career recommendations.
    """
    if request.user.is_authenticated:
        user_profile = UserProfile.objects.filter(user=request.user).first()
        recommendations = user_profile.career_recommendations if user_profile else []

        return JsonResponse({
            "id": request.user.id,
            "name": request.user.first_name,
            "email": request.user.username,
            "dashboard_message": f"Welcome back, {request.user.first_name}!",
            "recommendations": recommendations
        })

    return JsonResponse({"error": "User not authenticated"}, status=401)
