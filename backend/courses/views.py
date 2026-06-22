from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Course, Enrollment
from .serializers import CourseSerializer, EnrollmentSerializer
from .permissions import IsTeacher, IsStudent
# Create your views here.

class CourseListCreateView(generics.ListCreateAPIView):
    """
    GET: Return all courses.

    POST: Create a new course.
    """

    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    def get_permissions(self):
        if self.request.method == "POST":
            return [IsTeacher()]
        return []

class CourseDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET: Return one course.

    PUT: Updates a course.

    DELETE: Delete a course.
    """

    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class EnrollmentCreateView(generics.CreateAPIView):
    """
    Allows a student to enrol in a course
    """

    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    permission_classes = [IsStudent]

class MyEnrollmentsView(generics.ListAPIView):
    """
    Shows enrolled courses for currently logged in student
    """

    serializer_class = EnrollmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Enrollment.objects.filter(
            student=self.request.user
        )
