from django.shortcuts import render, redirect
from django.contrib.auth.views import LoginView, LogoutView
from django.contrib.auth.decorators import login_required
from django.views.generic import CreateView
from django.urls import reverse_lazy
from .forms import LoginForm, UsuarioCreationForm
from .models import Usuario

class CustomLoginView(LoginView):
    template_name = 'usuarios/login.html'
    form_class = LoginForm
    redirect_authenticated_user = True

class CustomLogoutView(LogoutView):
    next_page = 'login'

class RegistroUsuarioView(CreateView):
    model = Usuario
    form_class = UsuarioCreationForm
    template_name = 'usuarios/registro.html'
    success_url = reverse_lazy('login')

@login_required
def dashboard(request):
    return render(request, 'usuarios/dashboard.html')

@login_required
def perfil(request):
    return render(request, 'usuarios/perfil.html')
