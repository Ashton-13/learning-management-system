from rest_framework import serializers
from .models import Course, Enrollment

class CourseSerializer(serializers.ModelSerializer):
    """
    Course objects into JSON format.

    Also validates incoming course data before it is saved to the database.
    """

    class Meta:
        model = Course
        fields = '__all__'

class EnrollmentSerializer(serializers.ModelSerializer):
    """
    Converts Enrollment objects into JSON
    """

    class Meta:
        model = Enrollment
        fields = '__all__'