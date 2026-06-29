from django.urls import path
from .views import (CourseListCreateView, 
                    CourseDetailView, 
                    EnrollmentCreateView,
                    MyEnrollmentsView,
                    MyTeacherCoursesView,
                    ToggleCourseCompletionView,
                )

urlpatterns = [

    path(
        'courses/',
        CourseListCreateView.as_view(),
        name='course-list'
    ),

    path(
        'courses/<int:pk>/',
        CourseDetailView.as_view(),
        name='course-detail'
    ),

    path('enroll/', 
         EnrollmentCreateView.as_view(),
         name='enroll-course'
    ),

    path(
        'my-courses/',
        MyEnrollmentsView.as_view(),
        name='my-courses'
    ),

    path("teacher/courses/",
         MyTeacherCoursesView.as_view(),
         name="teacher-courses"
    ),

    path(
        "courses/<int:pk>/toggle-complete/",
        ToggleCourseCompletionView.as_view(),
        name='toggle-complete',
    ),
]