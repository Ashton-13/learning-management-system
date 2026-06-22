from rest_framework.permissions import BasePermission

class IsTeacher(BasePermission):
    """
    Only teachers can perform this action
    """

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and request.user.role == "teacher"
        )
    
class IsStudent(BasePermission):
    """
    Only students can perform this action
    """

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and request.user.role == "student"
        )