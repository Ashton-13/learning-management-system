from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated 
from .serializers import (RegisterSerializer, UserSerializer)


# Create your views here.
class RegisterView(generics.CreateAPIView):

    serializer_class = RegisterSerializer 

class CurrentUserView(generics.RetrieveAPIView):

    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user