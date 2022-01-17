from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Info
from .serializers import InfoSerializer

class PostViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.AllowAny, )
    queryset = Info.objects.all()
    serializer_class = InfoSerializer