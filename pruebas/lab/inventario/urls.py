from django.urls import path
from . import views

urlpatterns = [
    path('', views.dashboard_inventario, name='dashboard_inventario'),
    path('productos/', views.lista_productos, name='lista_productos'),
    path('productos/nuevo/', views.nuevo_producto, name='nuevo_producto'),
    path('productos/<int:pk>/', views.detalle_producto, name='detalle_producto'),
    path('movimientos/nuevo/', views.registrar_movimiento, name='registrar_movimiento'),
]