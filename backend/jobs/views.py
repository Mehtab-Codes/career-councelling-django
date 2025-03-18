from django.http import JsonResponse

def job_list(request):
    return JsonResponse({"message": "Jobs API is working!"})
