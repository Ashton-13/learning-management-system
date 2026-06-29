from rest_framework import serializers
from .models import Course, Enrollment

class CourseSerializer(serializers.ModelSerializer):
    is_completed = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = '__all__'
        read_only_fields = ["teacher", "created_at"]

    def get_is_completed(self, obj):
        request = self.context.get("request")

        if request and request.user.is_authenticated:
            enrollment = Enrollment.objects.filter(
                course=obj,
                student=request.user
            ).first()

            if enrollment:
                return enrollment.is_completed
            
            return False

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