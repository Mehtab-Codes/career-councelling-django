from django.http import JsonResponse

def forum_home(request):
    return JsonResponse({"message": "Forum API is working!"})
