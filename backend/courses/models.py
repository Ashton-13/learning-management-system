from django.db import models
from accounts.models import User
# Create your models here.
"""
Stores course information for the LMS

One teacher can make many courses
Course created belongs to teacher
"""

class Course(models.Model):
    # Course name displayed
    title = models.CharField(max_length=100)
    # Information about coure
    description = models.TextField()
    # Links each course to teacher who created it
    teacher = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="courses"
    )

    # stores when the course is created
    created_at = models.DateTimeField(auto_now_add=True)
    # Displays title of the course in Django admin
    def __str__(self):
        return self.title
    

class Enrollment(models.Model): 
    """
    Connects student to course

    Note:
    - One student can have many courses
    - One course can have many students 
    """
    # Student who enrolled
    student = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='enrollments'
    )

    # Course 
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name='enrollments'
    )

    # Records when enrolment happened

    enrolled_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        """
        Prevents student enrolling in same course twice
        """
        unique_together = ['student', 'course']

    def __str__(self):
        """
        Display enrolment info in admin panel.
        """
        return f"{self.student.username} enrolled in {self.course.title}"