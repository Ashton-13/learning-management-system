from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    """
    Returns info about logged-in user
    """
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'role',
        ]
        
class RegisterSerializer(serializers.ModelSerializer):
    """
    Handles user registration.

    Converts incoming JSON data into a User object.
    """
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'password',
            'role'
        ]

    def create(self, validated_data):
        """
        Uses Django create_user so password is hashed correctly
        """
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            role=validated_data.get('role', 'student')
        )

        return user