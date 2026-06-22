from django.shortcuts import render
from rest_framework import generics
from .serializers import RegisterSerializer

# Create your views here.
#POST request for creating new users
class RegisterView(generics.CreateAPIView):
    #RegisterSerializer validates and saves data
    serializer_class = RegisterSerializer 