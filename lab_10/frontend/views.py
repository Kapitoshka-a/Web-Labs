from django.shortcuts import render


def index(request, *args, **kwargs):
    return render(request, 'template/frontend/index.html')