from django.urls import path
from .views import (
    RegisterView, 
    CurrentUserView, 
    UserListView, 
    UserDetailView,
)

urlpatterns = [

    path(
        'register/',
        RegisterView.as_view()
    ),

    path(
        'me/',
        CurrentUserView.as_view()
    ),

    path(
        'users/',
        UserListView.as_view(),
        name='user-list'
    ),

    path(
        'users/<int:pk>/',
        UserDetailView.as_view(),
        name='user-detail'
    ),
]