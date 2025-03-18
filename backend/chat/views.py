from django.http import JsonResponse

def chat_home(request):
    return JsonResponse({"message": "Chat API is working!"})
