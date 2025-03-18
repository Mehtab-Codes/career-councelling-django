from django.http import JsonResponse

def counselor_list(request):
    return JsonResponse({"message": "Counselor API is working!"})
