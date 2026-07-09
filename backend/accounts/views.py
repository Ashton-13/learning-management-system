from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated 
from .serializers import (RegisterSerializer, UserSerializer, AdminUserSerializer)
from .models import User
from courses.permissions import IsAdmin


# Create your views here.
class RegisterView(generics.CreateAPIView):

    serializer_class = RegisterSerializer 

class CurrentUserView(generics.RetrieveAPIView):

    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
    
class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = AdminUserSerializer
    permission_classes = [IsAuthenticated,IsAdmin]

class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = AdminUserSerializer
    permission_classes = [IsAuthenticated, IsAdmin]

    def destroy(self, request, *args, **kwargs):

        user = self.get_object()

        if user == request.user:
            return Response(
                {
                    "detail": "You cannot delete your own admin account."
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        
        admin_count = User.objects.filter(role='admin').count()

        if user.role == 'admin' and admin_count <= 1:
            return Response(
                {
                    "detail": "You cannot delete the last admin account."
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if user.is_superuser:
            return Response(
                {
                    "detail": "You cannot delete a superuser account through this API."
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        
        return super().destroy(request, *args, **kwargs)