# Sistema de Inventario de Laboratorio

Sistema de gestión de inventario para laboratorios desarrollado con Django, que permite administrar productos, categorías, movimientos de inventario y usuarios con diferentes roles.

## Características

- **Autenticación y Autorización**:
  - Roles de usuario: Administrador, Gerente y Empleado
  - Permisos diferenciados según el rol
  - Registro y login de usuarios

- **Gestión de Inventario**:
  - Catálogo de productos con categorías
  - Registro de entradas y salidas de inventario
  - Control automático de stock
  - Dashboard con estadísticas

- **Interfaz Responsiva**:
  - Diseño adaptable a diferentes dispositivos
  - Interfaz intuitiva con Bootstrap

## Requisitos

- Docker y Docker Compose
- O alternativamente:
  - Python 3.8+
  - PostgreSQL

## Instalación con Docker

1. Clonar el repositorio:
   ```
   git clone <url-del-repositorio>
   cd inventario_lab
   ```

2. Iniciar los contenedores:
   ```
   docker-compose up -d
   ```

3. Crear un superusuario:
   ```
   docker-compose exec web python manage.py createsuperuser
   ```

4. Acceder a la aplicación:
   - Abrir en el navegador: http://localhost:8000

## Instalación sin Docker

1. Clonar el repositorio:
   ```
   git clone <url-del-repositorio>
   cd inventario_lab
   ```

2. Crear y activar entorno virtual:
   ```
   python -m venv venv
   # En Windows
   venv\Scripts\activate
   # En Linux/Mac
   source venv/bin/activate
   ```

3. Instalar dependencias:
   ```
   pip install -r requirements.txt
   ```

4. Configurar base de datos en `settings.py`

5. Aplicar migraciones:
   ```
   python manage.py migrate
   ```

6. Crear superusuario:
   ```
   python manage.py createsuperuser
   ```

7. Iniciar servidor de desarrollo:
   ```
   python manage.py runserver
   ```

8. Acceder a la aplicación:
   - Abrir en el navegador: http://localhost:8000

## Estructura del Proyecto

```
inventario_lab/
├── inventario/            # App de gestión de inventario
│   ├── models.py          # Modelos de productos y movimientos
│   ├── views.py           # Vistas para gestión de inventario
│   └── urls.py            # URLs de la app de inventario
├── usuarios/              # App de gestión de usuarios
│   ├── models.py          # Modelo personalizado de Usuario
│   ├── views.py           # Vistas para autenticación y dashboard
│   └── urls.py            # URLs de la app de usuarios
├── templates/             # Plantillas HTML
│   ├── base.html          # Plantilla base
│   ├── usuarios/          # Plantillas para usuarios
│   └── inventario/        # Plantillas para inventario
├── static/                # Archivos estáticos
├── inventario_lab/        # Configuración del proyecto
│   ├── settings.py        # Configuración de Django
│   └── urls.py            # URLs principales
├── Dockerfile             # Configuración de Docker
├── docker-compose.yml     # Configuración de Docker Compose
└── requirements.txt       # Dependencias del proyecto
```

## Pruebas

El proyecto incluye pruebas de caja blanca y caja negra:

- **Pruebas de Caja Blanca**: Verifican la lógica interna y el flujo de control
  ```
  python manage.py test
  ```

- **Pruebas de Caja Negra**: Verifican la funcionalidad desde la perspectiva del usuario
  - Documentadas en `pruebas_caja_negra.md`

## Roles y Permisos

- **Administrador**:
  - Acceso completo al sistema
  - Gestión de usuarios
  - Gestión completa de inventario

- **Gerente**:
  - Gestión de productos y categorías
  - Registro de movimientos
  - Visualización de reportes

- **Empleado**:
  - Visualización de productos
  - Registro de movimientos básicos
  - Acceso limitado al dashboard

## Contribución

1. Hacer fork del repositorio
2. Crear una rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`)
3. Hacer commit de tus cambios (`git commit -am 'Añadir nueva funcionalidad'`)
4. Hacer push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear un Pull Request

## Licencia

Este proyecto está licenciado bajo [MIT License](LICENSE).