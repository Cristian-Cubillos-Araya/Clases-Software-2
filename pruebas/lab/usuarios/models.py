from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.utils.translation import gettext_lazy as _

class Usuario(AbstractUser):
    """
    Modelo personalizado de usuario que extiende el modelo base de Django
    para incluir roles específicos para el sistema de inventario.
    """
    ROLES = (
        ('admin', 'Administrador'),
        ('gerente', 'Gerente'),
        ('empleado', 'Empleado'),
    )
    
    rol = models.CharField(max_length=20, choices=ROLES, default='empleado')
    telefono = models.CharField(max_length=15, blank=True, null=True)
    
    # Relaciones personalizadas para compatibilidad con AbstractUser
    groups = models.ManyToManyField(
        Group,
        verbose_name=_('groups'),
        blank=True,
        related_name='usuario_set',
        related_query_name='usuario',
    )
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name=_('user permissions'),
        blank=True,
        related_name='usuario_set',
        related_query_name='usuario',
    )
    
    def __str__(self):
        return self.username
    
    class Meta:
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'
