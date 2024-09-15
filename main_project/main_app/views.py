from rest_framework import generics, status
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, LoginSerializer
from django.http import JsonResponse
from django.views import View
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


class RegisterUserView(generics.CreateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer


class CreateWebsiteView(View):
    def post(self, request, *args, **kwargs):
        iam_user = request.data.get('iam_user')
        iam_password = request.data.get('iam_password')
        # Simulate infrastructure creation
        website_url = f"http://{iam_user}.aws-website.com"
        return JsonResponse({'website_url': website_url})

class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        # Create JWT token for the authenticated user
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_200_OK)


class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)  # Ensure user is authenticated

    def post(self, request):
        try:
            refresh_token = request.data['refresh_token']
            token = RefreshToken(refresh_token)
            token.blacklist()  # Blacklist the token (optional)

            return Response({"message": "Logout successful"}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

