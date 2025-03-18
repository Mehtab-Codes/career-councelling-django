from django.http import JsonResponse

def course_list(request):
    return JsonResponse({"message": "Courses API is working!"})
