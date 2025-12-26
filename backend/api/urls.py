from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ExpenseViewSet, UserCreate, CustomAuthToken

router = DefaultRouter()
router.register(r'expenses', ExpenseViewSet, basename='expense')
router.register(r'signup', UserCreate, basename='signup')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', CustomAuthToken.as_view(), name='api_token_auth'),
]
