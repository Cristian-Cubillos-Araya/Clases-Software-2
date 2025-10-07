from django.urls import path
from . import views

urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('login/', views.CustomLoginView.as_view(), name='login'),
    path('logout/', views.CustomLogoutView.as_view(), name='logout'),
    path('registro/', views.RegistroUsuarioView.as_view(), name='registro'),
    path('perfil/', views.perfil, name='perfil'),
]