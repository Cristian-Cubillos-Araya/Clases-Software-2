from django.db import models
from django.conf import settings

class Categoria(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return self.nombre
    
    class Meta:
        verbose_name = 'Categoría'
        verbose_name_plural = 'Categorías'

class Producto(models.Model):
    nombre = models.CharField(max_length=200)
    codigo = models.CharField(max_length=50, unique=True)
    descripcion = models.TextField(blank=True, null=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, related_name='productos')
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.codigo} - {self.nombre}"
    
    class Meta:
        verbose_name = 'Producto'
        verbose_name_plural = 'Productos'

class Movimiento(models.Model):
    TIPO_MOVIMIENTO = (
        ('entrada', 'Entrada'),
        ('salida', 'Salida'),
    )
    
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name='movimientos')
    cantidad = models.PositiveIntegerField()
    tipo = models.CharField(max_length=10, choices=TIPO_MOVIMIENTO)
    fecha = models.DateTimeField(auto_now_add=True)
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='movimientos')
    observacion = models.TextField(blank=True, null=True)
    
    def save(self, *args, **kwargs):
        # Actualizar el stock del producto
        if self.tipo == 'entrada':
            self.producto.stock += self.cantidad
        elif self.tipo == 'salida':
            self.producto.stock -= self.cantidad
        
        self.producto.save()
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.tipo} - {self.producto.nombre} - {self.cantidad}"
    
    class Meta:
        verbose_name = 'Movimiento'
        verbose_name_plural = 'Movimientos'
