# Pruebas de Caja Blanca

## 1. Pruebas de Cobertura de Sentencias

### Test para la vista de perfil
```python
from django.test import TestCase, Client
from django.urls import reverse
from usuarios.models import Usuario

class PerfilViewTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.usuario = Usuario.objects.create_user(
            username='empleado1',
            password='password123',
            email='empleado1@example.com',
            first_name='Empleado',
            last_name='Uno',
            rol='empleado'
        )
        self.perfil_url = reverse('perfil')
        
    def test_perfil_view_sin_autenticar(self):
        # Verificar redirección a login si no está autenticado
        response = self.client.get(self.perfil_url)
        self.assertEqual(response.status_code, 302)
        
    def test_perfil_view_autenticado(self):
        # Iniciar sesión
        self.client.login(username='empleado1', password='password123')
        # Acceder a la vista de perfil
        response = self.client.get(self.perfil_url)
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'usuarios/perfil.html')
        # Verificar que el contexto contiene el usuario correcto
        self.assertEqual(response.context['user'], self.usuario)
```

### Test para el modelo Usuario
```python
from django.test import TestCase
from usuarios.models import Usuario

class UsuarioModelTest(TestCase):
    def test_crear_usuario(self):
        usuario = Usuario.objects.create_user(
            username='empleado1',
            password='password123',
            email='empleado1@example.com',
            first_name='Empleado',
            last_name='Uno',
            rol='empleado'
        )
        self.assertEqual(usuario.username, 'empleado1')
        self.assertEqual(usuario.email, 'empleado1@example.com')
        self.assertEqual(usuario.rol, 'empleado')
        self.assertTrue(usuario.check_password('password123'))
```

### Test para el modelo Producto
```python
from django.test import TestCase
from inventario.models import Categoria, Producto

class ProductoModelTest(TestCase):
    def setUp(self):
        self.categoria = Categoria.objects.create(
            nombre='Electrónicos',
            descripcion='Productos electrónicos'
        )
    
    def test_crear_producto(self):
        producto = Producto.objects.create(
            nombre='Laptop',
            codigo='LAP001',
            descripcion='Laptop de prueba',
            precio=1000.00,
            stock=10,
            categoria=self.categoria
        )
        self.assertEqual(producto.nombre, 'Laptop')
        self.assertEqual(producto.codigo, 'LAP001')
        self.assertEqual(producto.stock, 10)
        self.assertEqual(producto.categoria, self.categoria)
```

### Test para el modelo Movimiento
```python
from django.test import TestCase
from inventario.models import Categoria, Producto, Movimiento
from usuarios.models import Usuario

class MovimientoModelTest(TestCase):
    def setUp(self):
        self.categoria = Categoria.objects.create(nombre='Electrónicos')
        self.producto = Producto.objects.create(
            nombre='Laptop',
            codigo='LAP001',
            precio=1000.00,
            stock=10,
            categoria=self.categoria
        )
        self.usuario = Usuario.objects.create_user(
            username='empleado1',
            password='password123',
            rol='empleado'
        )
    
    def test_movimiento_entrada(self):
        # Verificar stock inicial
        self.assertEqual(self.producto.stock, 10)
        
        # Crear movimiento de entrada
        movimiento = Movimiento.objects.create(
            producto=self.producto,
            cantidad=5,
            tipo='entrada',
            usuario=self.usuario,
            observacion='Entrada de prueba'
        )
        
        # Refrescar producto desde la base de datos
        self.producto.refresh_from_db()
        
        # Verificar que el stock se actualizó correctamente
        self.assertEqual(self.producto.stock, 15)
        self.assertEqual(movimiento.tipo, 'entrada')
    
    def test_movimiento_salida(self):
        # Verificar stock inicial
        self.assertEqual(self.producto.stock, 10)
        
        # Crear movimiento de salida
        movimiento = Movimiento.objects.create(
            producto=self.producto,
            cantidad=3,
            tipo='salida',
            usuario=self.usuario,
            observacion='Salida de prueba'
        )
        
        # Refrescar producto desde la base de datos
        self.producto.refresh_from_db()
        
        # Verificar que el stock se actualizó correctamente
        self.assertEqual(self.producto.stock, 7)
        self.assertEqual(movimiento.tipo, 'salida')
```

## 2. Pruebas de Cobertura de Ramas

### Test para la vista de registro de movimientos
```python
from django.test import TestCase, Client
from django.urls import reverse
from inventario.models import Categoria, Producto, Movimiento
from usuarios.models import Usuario

class RegistrarMovimientoViewTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.categoria = Categoria.objects.create(nombre='Electrónicos')
        self.producto = Producto.objects.create(
            nombre='Laptop',
            codigo='LAP001',
            precio=1000.00,
            stock=10,
            categoria=self.categoria
        )
        self.usuario = Usuario.objects.create_user(
            username='empleado1',
            password='password123',
            rol='empleado'
        )
        self.client.login(username='empleado1', password='password123')
        self.url = reverse('registrar_movimiento')
    
    def test_movimiento_salida_exitoso(self):
        # Caso: Stock suficiente para la salida
        response = self.client.post(self.url, {
            'producto': self.producto.id,
            'cantidad': 5,
            'tipo': 'salida',
            'observacion': 'Salida de prueba'
        })
        
        # Verificar redirección después de éxito
        self.assertRedirects(response, reverse('lista_productos'))
        
        # Verificar que el stock se actualizó
        self.producto.refresh_from_db()
        self.assertEqual(self.producto.stock, 5)
    
    def test_movimiento_salida_stock_insuficiente(self):
        # Caso: Stock insuficiente para la salida
        response = self.client.post(self.url, {
            'producto': self.producto.id,
            'cantidad': 15,  # Más que el stock disponible
            'tipo': 'salida',
            'observacion': 'Salida de prueba'
        })
        
        # Verificar que permanece en la misma página
        self.assertEqual(response.status_code, 302)
        self.assertEqual(response.url, reverse('registrar_movimiento'))
        
        # Verificar que el stock no cambió
        self.producto.refresh_from_db()
        self.assertEqual(self.producto.stock, 10)
```

## 3. Pruebas de Cobertura de Caminos

### Test para el flujo completo de creación y movimiento de productos
```python
from django.test import TestCase, Client
from django.urls import reverse
from inventario.models import Categoria, Producto, Movimiento
from usuarios.models import Usuario

class FlujoInventarioTest(TestCase):
    def setUp(self):
        self.client = Client()
        # Crear usuario administrador
        self.admin = Usuario.objects.create_user(
            username='admin1',
            password='admin123',
            rol='admin'
        )
        # Crear usuario empleado
        self.empleado = Usuario.objects.create_user(
            username='empleado1',
            password='empleado123',
            rol='empleado'
        )
        # Crear categoría
        self.categoria = Categoria.objects.create(
            nombre='Electrónicos',
            descripcion='Productos electrónicos'
        )
        
        # Login como admin
        self.client.login(username='admin1', password='admin123')
    
    def test_flujo_completo_inventario(self):
        # 1. Crear un nuevo producto
        response = self.client.post(reverse('nuevo_producto'), {
            'nombre': 'Smartphone',
            'codigo': 'PHONE001',
            'descripcion': 'Smartphone de prueba',
            'precio': 500.00,
            'stock': 0,  # Iniciar sin stock
            'categoria': self.categoria.id
        })
        
        # Verificar redirección después de crear producto
        self.assertRedirects(response, reverse('lista_productos'))
        
        # Obtener el producto creado
        producto = Producto.objects.get(codigo='PHONE001')
        self.assertEqual(producto.stock, 0)
        
        # 2. Registrar entrada de inventario
        response = self.client.post(reverse('registrar_movimiento'), {
            'producto': producto.id,
            'cantidad': 20,
            'tipo': 'entrada',
            'observacion': 'Entrada inicial'
        })
        
        # Verificar que el stock se actualizó
        producto.refresh_from_db()
        self.assertEqual(producto.stock, 20)
        
        # 3. Cambiar a usuario empleado
        self.client.logout()
        self.client.login(username='empleado1', password='empleado123')
        
        # 4. Registrar salida de inventario
        response = self.client.post(reverse('registrar_movimiento'), {
            'producto': producto.id,
            'cantidad': 5,
            'tipo': 'salida',
            'observacion': 'Venta a cliente'
        })
        
        # Verificar que el stock se actualizó
        producto.refresh_from_db()
        self.assertEqual(producto.stock, 15)
        
        # 5. Intentar una salida mayor al stock disponible
        response = self.client.post(reverse('registrar_movimiento'), {
            'producto': producto.id,
            'cantidad': 20,
            'tipo': 'salida',
            'observacion': 'Intento de salida excesiva'
        })
        
        # Verificar que el stock no cambió
        producto.refresh_from_db()
        self.assertEqual(producto.stock, 15)
```

## 4. Pruebas de Cobertura de Condiciones

### Test para validaciones en el modelo Usuario
```python
from django.test import TestCase
from django.core.exceptions import ValidationError
from usuarios.models import Usuario

class UsuarioValidacionTest(TestCase):
    def test_validacion_rol(self):
        # Caso: Rol válido
        usuario = Usuario(
            username='usuario1',
            email='usuario1@example.com',
            rol='admin'
        )
        # No debería lanzar excepción
        usuario.full_clean()
        
        # Caso: Rol inválido
        usuario = Usuario(
            username='usuario2',
            email='usuario2@example.com',
            rol='rol_invalido'  # No está en las opciones
        )
        
        # Debería lanzar ValidationError
        with self.assertRaises(ValidationError):
            usuario.full_clean()
```