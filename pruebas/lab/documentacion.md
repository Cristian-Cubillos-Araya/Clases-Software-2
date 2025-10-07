# Documentación del Sistema de Inventario de Laboratorio

## 1. Arquitectura del Sistema

El sistema de inventario está desarrollado utilizando el framework Django, siguiendo una arquitectura MVC (Modelo-Vista-Controlador), que en Django se implementa como MTV (Modelo-Template-Vista):

- **Modelos (Models)**: Definen la estructura de datos y la lógica de negocio
- **Plantillas (Templates)**: Definen la presentación de la información
- **Vistas (Views)**: Controlan el flujo de la aplicación y la lógica de presentación

### Estructura de Aplicaciones

El proyecto está dividido en dos aplicaciones principales:

1. **usuarios**: Gestiona la autenticación, autorización y roles de usuario
2. **inventario**: Gestiona los productos, categorías y movimientos de inventario

## 2. Modelos de Datos

### Modelo de Usuario

```python
class Usuario(AbstractUser):
    ROLES = [
        ('admin', 'Administrador'),
        ('gerente', 'Gerente'),
        ('empleado', 'Empleado'),
    ]
    rol = models.CharField(max_length=20, choices=ROLES, default='empleado')
    telefono = models.CharField(max_length=15, blank=True, null=True)
```

El modelo `Usuario` extiende el modelo base de Django `AbstractUser` para incluir roles específicos y campos adicionales como el teléfono.

### Modelos de Inventario

```python
class Categoria(models.Model):
    nombre = models.CharField(max_length=100, unique=True)
    descripcion = models.TextField(blank=True, null=True)

class Producto(models.Model):
    nombre = models.CharField(max_length=200)
    codigo = models.CharField(max_length=50, unique=True)
    descripcion = models.TextField(blank=True, null=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)

class Movimiento(models.Model):
    TIPOS = [
        ('entrada', 'Entrada'),
        ('salida', 'Salida'),
    ]
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField()
    tipo = models.CharField(max_length=10, choices=TIPOS)
    fecha = models.DateTimeField(auto_now_add=True)
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    nota = models.TextField(blank=True, null=True)
```

Estos modelos permiten:
- Organizar productos por categorías
- Mantener un registro detallado de cada producto
- Registrar movimientos de entrada y salida
- Actualizar automáticamente el stock

## 3. Sistema de Autenticación y Autorización

### Autenticación

El sistema utiliza el framework de autenticación de Django con vistas personalizadas:

```python
class CustomLoginView(LoginView):
    form_class = LoginForm
    template_name = 'usuarios/login.html'
    redirect_authenticated_user = True
    
    def get_success_url(self):
        return reverse_lazy('usuarios:dashboard')
```

### Autorización basada en Roles

La autorización se implementa mediante decoradores y mixins de Django:

```python
from django.contrib.auth.mixins import UserPassesTestMixin

class AdminRequiredMixin(UserPassesTestMixin):
    def test_func(self):
        return self.request.user.is_authenticated and self.request.user.rol == 'admin'
```

## 4. Flujos de Trabajo Principales

### Registro de Productos

1. Usuario accede a la vista de nuevo producto
2. Completa el formulario con datos del producto
3. El sistema valida los datos (código único, precio válido, etc.)
4. Se crea el producto con stock inicial

### Movimientos de Inventario

1. Usuario selecciona un producto existente
2. Indica tipo de movimiento (entrada/salida) y cantidad
3. El sistema valida la operación (stock suficiente para salidas)
4. Se registra el movimiento y se actualiza el stock

### Gestión de Usuarios

1. Administrador accede a la sección de usuarios
2. Puede crear, editar o desactivar usuarios
3. Asigna roles según las responsabilidades

## 5. Interfaz de Usuario

La interfaz se ha desarrollado utilizando:
- Bootstrap 5 para el diseño responsivo
- Font Awesome para iconos
- Plantillas base con herencia para mantener consistencia

### Estructura de Plantillas

```
templates/
├── base.html                # Plantilla base con navegación y estructura común
├── usuarios/
│   ├── login.html           # Formulario de inicio de sesión
│   ├── registro.html        # Formulario de registro
│   └── dashboard.html       # Panel principal del usuario
└── inventario/
    ├── lista_productos.html # Lista de productos
    ├── detalle_producto.html # Detalles de un producto
    └── movimiento.html      # Formulario de movimientos
```

## 6. Configuración Docker

El proyecto está configurado para ser desplegado con Docker, lo que facilita su instalación y ejecución en diferentes entornos.

### Dockerfile

```dockerfile
FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
```

### Docker Compose

```yaml
version: '3'

services:
  web:
    build: .
    ports:
      - "8000:8000"
    depends_on:
      - db
    environment:
      - DEBUG=True
      - DATABASE_URL=postgres://postgres:postgres@db:5432/inventario
    volumes:
      - .:/app

  db:
    image: postgres:13
    volumes:
      - postgres_data:/var/lib/postgresql/data/
    environment:
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_USER=postgres
      - POSTGRES_DB=inventario

volumes:
  postgres_data:
```

## 7. Usuarios Predefinidos

Para facilitar las pruebas y el uso del sistema, se han creado los siguientes usuarios predefinidos:

| Rol | Usuario | Contraseña | Nombre | Email |
|-----|---------|------------|--------|-------|
| Administrador | admin1 | admin123 | Admin Principal | admin@example.com |
| Gerente | gerente1 | gerente123 | Gerente Principal | gerente@example.com |
| Empleado | empleado1 | empleado123 | Empleado Principal | empleado@example.com |

## 8. Pruebas

### Pruebas de Caja Blanca

Las pruebas de caja blanca verifican la lógica interna y el flujo de control del código. Se han implementado pruebas para:

- Validación de modelos
- Lógica de negocio (actualización de stock)
- Flujo de control en vistas

### Pruebas de Caja Negra

Las pruebas de caja negra verifican la funcionalidad desde la perspectiva del usuario, incluyendo:

- Pruebas de partición de equivalencia
- Pruebas de valores límite
- Pruebas de casos de uso
- Pruebas de interfaz de usuario
- Pruebas de seguridad

## 8. Seguridad

El sistema implementa varias medidas de seguridad:

- Autenticación segura con Django
- Protección CSRF en formularios
- Validación de datos en servidor
- Control de acceso basado en roles
- Protección de rutas sensibles

## 9. Escalabilidad y Mantenimiento

El proyecto está diseñado para ser escalable y mantenible:

- Separación clara de responsabilidades (apps diferentes)
- Uso de patrones de diseño de Django
- Configuración modular
- Documentación completa
- Pruebas automatizadas

## 10. Instrucciones para Desarrolladores

### Añadir Nuevas Funcionalidades

1. Crear modelos necesarios en la app correspondiente
2. Implementar vistas y formularios
3. Crear plantillas
4. Actualizar archivos de URLs
5. Ejecutar migraciones
6. Añadir pruebas

### Convenciones de Código

- Seguir PEP 8 para código Python
- Nombres de clases en CamelCase
- Nombres de funciones y variables en snake_case
- Documentar funciones y clases con docstrings
- Mantener archivos organizados por funcionalidad