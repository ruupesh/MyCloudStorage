from django.urls import path
from .views import RegisterUserView, CreateWebsiteView, LoginView, LogoutView

urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register'),
    path('create/', CreateWebsiteView.as_view(), name='create_website'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
]
