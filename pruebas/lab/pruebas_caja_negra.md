# Pruebas de Caja Negra

## 1. Pruebas de Partición de Equivalencia

### Prueba de Login

| ID | Clase de Equivalencia | Valores | Resultado Esperado |
|----|----------------------|---------|-------------------|
| 1  | Usuario válido, contraseña válida | usuario: admin1, contraseña: admin123 | Acceso concedido, redirección a dashboard |
| 2  | Usuario válido, contraseña inválida | usuario: admin1, contraseña: incorrecta | Acceso denegado, mensaje de error |
| 3  | Usuario inválido | usuario: noexiste, contraseña: cualquiera | Acceso denegado, mensaje de error |
| 4  | Campos vacíos | usuario: "", contraseña: "" | Validación de formulario, mensaje de error |

### Prueba de Registro de Productos

| ID | Clase de Equivalencia | Valores | Resultado Esperado |
|----|----------------------|---------|-------------------|
| 1  | Datos completos y válidos | nombre: "Laptop", código: "LAP001", precio: 1000, stock: 10 | Producto creado correctamente |
| 2  | Código duplicado | nombre: "Mouse", código: "LAP001" (ya existe), precio: 20, stock: 50 | Error de validación, mensaje de código duplicado |
| 3  | Precio negativo | nombre: "Teclado", código: "TEC001", precio: -100, stock: 5 | Error de validación, mensaje de precio inválido |
| 4  | Campos obligatorios vacíos | nombre: "", código: "", precio: null | Validación de formulario, mensaje de error |

### Prueba de Movimientos de Inventario

| ID | Clase de Equivalencia | Valores | Resultado Esperado |
|----|----------------------|---------|-------------------|
| 1  | Entrada de inventario válida | producto: "Laptop", cantidad: 5, tipo: "entrada" | Stock incrementado a 15 |
| 2  | Salida de inventario válida | producto: "Laptop", cantidad: 3, tipo: "salida" | Stock reducido a 12 |
| 3  | Salida mayor que stock disponible | producto: "Laptop", cantidad: 20, tipo: "salida" | Error, mensaje de stock insuficiente |
| 4  | Cantidad negativa o cero | producto: "Laptop", cantidad: 0, tipo: "entrada" | Error de validación, mensaje de cantidad inválida |

## 2. Pruebas de Valores Límite

### Prueba de Límites en Cantidad de Movimientos

| ID | Valor | Resultado Esperado |
|----|-------|-------------------|
| 1  | Cantidad = 1 (mínimo válido) | Movimiento registrado correctamente |
| 2  | Cantidad = 0 (límite inferior inválido) | Error de validación |
| 3  | Cantidad = 9999 (valor grande válido) | Movimiento registrado correctamente |
| 4  | Cantidad = -1 (valor negativo inválido) | Error de validación |

### Prueba de Límites en Precio de Productos

| ID | Valor | Resultado Esperado |
|----|-------|-------------------|
| 1  | Precio = 0.01 (mínimo válido) | Producto creado correctamente |
| 2  | Precio = 0 (límite inferior válido) | Producto creado correctamente |
| 3  | Precio = -0.01 (valor negativo inválido) | Error de validación |
| 4  | Precio = 9999999.99 (valor máximo válido) | Producto creado correctamente |

## 3. Pruebas de Casos de Uso

### Caso de Uso: Gestión Completa de Inventario

**Escenario**: Un administrador crea un producto, registra entradas y salidas, y verifica el stock final.

**Pasos**:
1. Login como administrador
2. Crear un nuevo producto "Monitor" con código "MON001", precio 200, stock inicial 0
3. Registrar entrada de 10 unidades
4. Registrar salida de 3 unidades
5. Verificar que el stock final sea 7
6. Intentar registrar salida de 10 unidades (más que el stock disponible)
7. Verificar que el sistema muestre error y el stock siga siendo 7

**Resultado Esperado**: El sistema debe mantener la integridad del inventario, permitiendo movimientos válidos y rechazando los inválidos.

### Caso de Uso: Control de Acceso por Roles

**Escenario**: Verificar que diferentes roles tengan acceso adecuado a las funcionalidades.

**Pasos**:
1. Login como empleado
2. Intentar acceder a funciones administrativas (crear usuarios, eliminar productos)
3. Verificar que se deniegue el acceso
4. Login como administrador
5. Verificar que se permita el acceso a todas las funcionalidades

**Resultado Esperado**: El sistema debe restringir el acceso según el rol del usuario, mostrando solo las opciones permitidas.

## 4. Pruebas de Interfaz de Usuario

### Prueba de Perfil de Usuario

| ID | Acción | Resultado Esperado |
|----|--------|-------------------|
| 1  | Acceder a la página de perfil | Visualización correcta de datos del usuario actual |
| 2  | Acceder a perfil sin autenticación | Redirección a página de login |
| 3  | Verificar datos mostrados | Nombre, email, rol y fechas correctas |
| 4  | Clic en "Volver al Dashboard" | Redirección a dashboard |

### Prueba de Responsividad

| ID | Dispositivo/Resolución | Elementos a Verificar | Resultado Esperado |
|----|------------------------|----------------------|-------------------|
| 1  | Escritorio (1920x1080) | Menú, tablas, formularios | Visualización correcta, sin scroll horizontal |
| 2  | Tablet (768x1024) | Menú, tablas, formularios | Adaptación correcta, elementos redimensionados |
| 3  | Móvil (375x667) | Menú, tablas, formularios | Menú colapsado, tablas con scroll horizontal, formularios adaptados |

### Prueba de Navegación

| ID | Acción | Resultado Esperado |
|----|--------|-------------------|
| 1  | Clic en logo/nombre de la aplicación | Redirección a dashboard |
| 2  | Clic en "Productos" en el menú | Mostrar lista de productos |
| 3  | Clic en "Cerrar Sesión" | Finalizar sesión y redireccionar a login |
| 4  | Clic en botón "Atrás" del navegador | Mantener estado consistente, sin errores |

## 5. Pruebas de Seguridad

### Prueba de Autenticación

| ID | Escenario | Resultado Esperado |
|----|-----------|-------------------|
| 1  | Acceder a URL protegida sin autenticación | Redirección a página de login |
| 2  | Intentar acceder con credenciales incorrectas 5 veces | Bloqueo temporal o captcha |
| 3  | Cerrar sesión y usar botón "atrás" | No permitir acceso a contenido protegido |

### Prueba de Autorización

| ID | Escenario | Resultado Esperado |
|----|-----------|-------------------|
| 1  | Usuario empleado intenta acceder a URL de administración | Error 403 o redirección |
| 2  | Modificar ID en URL para acceder a recursos de otro usuario | Error 403 o redirección |
| 3  | Intentar operaciones no permitidas mediante manipulación de formularios | Validación en servidor, operación rechazada |

## 6. Pruebas de Rendimiento

### Prueba de Carga

| ID | Escenario | Resultado Esperado |
|----|-----------|-------------------|
| 1  | 10 usuarios simultáneos realizando operaciones CRUD | Tiempo de respuesta < 2 segundos |
| 2  | Base de datos con 1000 productos | Búsqueda y filtrado < 3 segundos |
| 3  | Generación de reportes con 500 movimientos | Tiempo de generación < 5 segundos |

## 7. Instrucciones para Ejecutar las Pruebas

1. **Preparación del Entorno**:
   - Iniciar la aplicación con Docker: `docker-compose up`
   - Crear superusuario: `docker-compose exec web python manage.py createsuperuser`
   - Cargar datos de prueba: `docker-compose exec web python manage.py loaddata test_data.json`

2. **Ejecución de Pruebas Automatizadas**:
   - Pruebas unitarias: `docker-compose exec web python manage.py test`
   - Pruebas de integración: `docker-compose exec web python manage.py test --tag=integration`

3. **Ejecución de Pruebas Manuales**:
   - Seguir los casos de prueba documentados en este archivo
   - Registrar resultados en la plantilla proporcionada
   - Reportar cualquier error encontrado con capturas de pantalla