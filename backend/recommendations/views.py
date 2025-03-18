from django.http import JsonResponse

def recommendations(request):
    return JsonResponse({"message": "Career recommendations API is working!"})
