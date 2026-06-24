from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated 
from .serializers import (RegisterSerializer, UserSerializer)


# Create your views here.
#POST request for creating new users
class RegisterView(generics.CreateAPIView):
    #RegisterSerializer validates and saves data
    serializer_class = RegisterSerializer 

class CurrentUserView(generics.RetrieveAPIView):

    # Details of currently logged in user
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user