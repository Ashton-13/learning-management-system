from django.test import TestCase
from accounts.models import User
from courses.models import Course, Enrollment

# Create your tests here.

class CourseModelTest(TestCase):
    def test_course_creation(self):
        """
        Ensure a course can be created.
        """
        teacher = User.objects.create_user(
            username="teacher_test",
            password="password123",
            role="teacher"
        )

        course = Course.objects.create(
            title="Physics",
            description="Physics course",
            teacher=teacher
        )
        
        self.assertEqual(course.title, "Physics")

class EnrollmentModelTest(TestCase):
    def test_enrollment_creation(self):

        teacher = User.objects.create_user(
            username="teacher_test",
            password="password123",
            role="teacher"
        )

        student = User.objects.create_user(
            username="student_test",
            password="password123",
            role="student"
        )

        course = Course.objects.create(
            title="Physics",
            description="Physics course",
            teacher=teacher
        )

        enrollment = Enrollment.objects.create(
            student=student,
            course=course
        )

        self.assertEqual(
            enrollment.student.username,
            "student_test"
        )