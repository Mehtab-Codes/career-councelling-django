import json
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from .models import UserProfile  # Import the UserProfile model

# Predefined career paths
career_paths = {
    "Data Science": ["Python", "Machine Learning", "Statistics", "Data Analysis"],
    "Web Development": ["HTML", "CSS", "JavaScript", "React", "Node.js"],
    "Cybersecurity": ["Network Security", "Ethical Hacking", "Cryptography"],
    "Software Engineering": ["Java", "C++", "Software Design", "Algorithms"],
}

# Function to generate career recommendations
def recommend_career(skills, interests):
    recommendations = []
    for career, required_skills in career_paths.items():
        if any(skill in skills for skill in required_skills) or any(interest in interests for interest in required_skills):
            recommendations.append(career)
    return recommendations

@login_required
def user_profile_view(request):
    user = request.user  # Get the logged-in user

    try:
        user_profile = UserProfile.objects.get(user=user)  # Get user profile
        skills = user_profile.skills.split(",") if user_profile.skills else []
        interests = user_profile.interests.split(",") if user_profile.interests else []

        # Generate recommendations
        recommendations = recommend_career(skills, interests)
        user_profile.career_recommendations = json.dumps(recommendations)
        user_profile.save()

        # Fetch user details
        user_data = {
            "id": user.id,
            "name": user.get_full_name() or user.first_name,
            "email": user.email,
            "dashboard_message": f"Welcome back, {user.get_full_name() or user.first_name}!",
            "career_recommendations": recommendations,  # Include recommendations in response
        }

        return JsonResponse(user_data, status=200)

    except UserProfile.DoesNotExist:
        return JsonResponse({"error": "User profile not found"}, status=404)
