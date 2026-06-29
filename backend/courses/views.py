from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Course, Enrollment
from .serializers import CourseSerializer, EnrollmentSerializer
from .permissions import IsTeacher, IsStudent
from .permissions import IsCourseOwner
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
# Create your views here.

# Completed Courses
class ToggleCourseCompletionView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        try:
            enrollment = Enrollment.objects.get(
                course_id=pk,
                student=request.user
            )
        except Enrollment.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        enrollment.is_completed = not enrollment.is_completed
        enrollment.save()

        return Response({
            "is_completed": enrollment.is_completed
        })

# Courses

class CourseListCreateView(generics.ListCreateAPIView):
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Course.objects.all()
    
    def perform_create(self, serializer):
        serializer.save(teacher=self.request.user)

    def get_permissions(self):
        if self.request.method == "POST":
            return [IsAuthenticated(),IsTeacher()]
        return []

class CourseDetailView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated, 
                          IsTeacher,
                          IsCourseOwner,
                          ]

# Enrollments

class EnrollmentCreateView(generics.CreateAPIView):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    permission_classes = [IsStudent]

    def perform_create(self, serializer):
        serializer.save(student=self.request.user)

class MyEnrollmentsView(generics.ListAPIView):

    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Course.objects.filter(
            enrollments__student=self.request.user
        )

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context
# Teacher Courses

class MyTeacherCoursesView(generics.ListAPIView):
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated, IsTeacher]

    def get_queryset(self):
        return Course.objects.filter(teacher=self.request.user)