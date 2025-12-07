from django.urls import path
from . import views

urlpatterns = [
    path('create-order/', views.create_order, name='create-order'),
    path('verify-payment/', views.verify_payment, name='verify-payment'),
]
