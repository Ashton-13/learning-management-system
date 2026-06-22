from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from accounts.models import User
# Create your tests here.
class RegisterUserTest(APITestCase):
    
    def test_register_student(self):

        data = {
            "username": "newstudent",
            "email": "student@test.com",
            "password": "password123",
            "role": "student"
        }

        response = self.client.post(
            "/api/register/",
            data,
            format="json"
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED
        )

        self.assertEqual(
            User.objects.count(),
            1
        )