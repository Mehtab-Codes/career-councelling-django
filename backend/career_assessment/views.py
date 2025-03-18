from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .career_data import CAREER_PATHS

@csrf_exempt
def recommend_careers(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            user_skills = set(data.get("skills", []))
            user_interests = set(data.get("interests", []))

            recommended_careers = []

            for career in CAREER_PATHS:
                matching_skills = user_skills.intersection(career["skills"])
                if matching_skills or career["name"] in user_interests:
                    recommended_careers.append({"career": career["name"], "matching_skills": list(matching_skills)})

            return JsonResponse({"recommendations": recommended_careers}, status=200)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)
