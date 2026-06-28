from rest_framework import serializers
from .models import Course, Enrollment

class CourseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Course
        fields = '__all__'

class EnrollmentSerializer(serializers.ModelSerializer):

    course = CourseSerializer(read_only=True)
    course_id = serializers.PrimaryKeyRelatedField(
        queryset=Course.objects.all(),
        source="course",
        write_only=True
    )

    class Meta:
        model = Enrollment
        fields = [
            "id",
            "student",
            "course",
            "course_id",
            "enrolled_at",
        ]
        
        read_only_fields = ['student']