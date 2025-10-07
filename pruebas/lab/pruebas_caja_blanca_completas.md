# Pruebas de Caja Blanca Completas

## 1. Cobertura de Sentencias

La cobertura de sentencias asegura que cada línea de código se ejecute al menos una vez durante las pruebas.

```python
def test_cobertura_sentencias():
    # Ejemplo para la función de registro de movimiento
    producto = Producto.objects.get(codigo='LAP001')
    stock_inicial = producto.stock
    
    # Crear movimiento de entrada
    movimiento = Movimiento.objects.create(
        producto=producto,
        cantidad=5,
        tipo='entrada',
        usuario=self.usuario,
        observacion='Prueba cobertura'
    )
    
    # Verificar que todas las sentencias se ejecutaron
    self.assertEqual(movimiento.tipo, 'entrada')
    self.assertEqual(movimiento.cantidad, 5)
    producto.refresh_from_db()
    self.assertEqual(producto.stock, stock_inicial + 5)
```

## 2. Cobertura de Decisiones

La cobertura de decisiones verifica que todas las expresiones booleanas en el código se evalúen tanto como verdaderas como falsas.

```python
def test_cobertura_decisiones():
    # Ejemplo para validación de stock suficiente
    producto = Producto.objects.get(codigo='LAP001')
    stock_inicial = producto.stock
    
    # Caso 1: Decisión verdadera (hay suficiente stock)
    if stock_inicial >= 2:
        movimiento = Movimiento.objects.create(
            producto=producto,
            cantidad=2,
            tipo='salida',
            usuario=self.usuario
        )
        self.assertEqual(movimiento.tipo, 'salida')
    
    # Caso 2: Decisión falsa (no hay suficiente stock)
    producto.stock = 1
    producto.save()
    
    with self.assertRaises(ValidationError):
        Movimiento.objects.create(
            producto=producto,
            cantidad=2,
            tipo='salida',
            usuario=self.usuario
        )
```

## 3. Cobertura de Ramas

La cobertura de ramas asegura que cada posible rama en una estructura de control se ejecute al menos una vez.

```python
def test_cobertura_ramas():
    # Ejemplo para la función de actualizar stock
    producto = Producto.objects.get(codigo='LAP001')
    
    # Rama 1: Movimiento de entrada
    movimiento_entrada = Movimiento.objects.create(
        producto=producto,
        cantidad=5,
        tipo='entrada',
        usuario=self.usuario
    )
    stock_despues_entrada = producto.stock
    
    # Rama 2: Movimiento de salida
    movimiento_salida = Movimiento.objects.create(
        producto=producto,
        cantidad=2,
        tipo='salida',
        usuario=self.usuario
    )
    
    # Verificar ambas ramas
    producto.refresh_from_db()
    self.assertEqual(producto.stock, stock_despues_entrada - 2)
```

## 4. Cobertura de Caminos

La cobertura de caminos verifica que se prueben todos los posibles caminos de ejecución a través del código.

```python
def test_cobertura_caminos():
    # Ejemplo para proceso completo de movimiento
    producto = Producto.objects.get(codigo='LAP001')
    stock_inicial = producto.stock
    
    # Camino 1: Entrada con observación
    movimiento1 = Movimiento.objects.create(
        producto=producto,
        cantidad=5,
        tipo='entrada',
        usuario=self.usuario,
        observacion='Prueba camino 1'
    )
    
    # Camino 2: Salida sin observación
    producto.refresh_from_db()
    movimiento2 = Movimiento.objects.create(
        producto=producto,
        cantidad=2,
        tipo='salida',
        usuario=self.usuario
    )
    
    # Camino 3: Salida con stock insuficiente
    producto.stock = 1
    producto.save()
    
    with self.assertRaises(ValidationError):
        Movimiento.objects.create(
            producto=producto,
            cantidad=2,
            tipo='salida',
            usuario=self.usuario
        )
```

## 5. Cobertura de Condiciones y Condiciones Múltiples

La cobertura de condiciones verifica que cada condición booleana simple se evalúe como verdadera y falsa, mientras que la cobertura de condiciones múltiples prueba todas las combinaciones posibles.

```python
def test_cobertura_condiciones():
    # Ejemplo para validación de producto
    producto = Producto.objects.get(codigo='LAP001')
    
    # Condición simple: precio > 0
    self.assertTrue(producto.precio > 0)
    
    # Condición múltiple: precio > 0 AND stock >= 0
    self.assertTrue(producto.precio > 0 and producto.stock >= 0)
    
    # Probar diferentes combinaciones
    producto_original = copy.copy(producto)
    
    # Caso 1: precio > 0, stock >= 0 (Verdadero, Verdadero)
    self.assertTrue(validar_producto(producto))
    
    # Caso 2: precio <= 0, stock >= 0 (Falso, Verdadero)
    producto.precio = 0
    self.assertFalse(validar_producto(producto))
    
    # Caso 3: precio > 0, stock < 0 (Verdadero, Falso)
    producto = copy.copy(producto_original)
    producto.stock = -1
    self.assertFalse(validar_producto(producto))
    
    # Caso 4: precio <= 0, stock < 0 (Falso, Falso)
    producto.precio = 0
    self.assertFalse(validar_producto(producto))
```

## 6. Cobertura de Bucles

La cobertura de bucles verifica que los bucles se ejecuten correctamente para diferentes números de iteraciones.

```python
def test_cobertura_bucles():
    # Ejemplo para función que procesa múltiples movimientos
    productos = Producto.objects.all()
    
    # Caso 1: Bucle con 0 iteraciones (lista vacía)
    resultado_vacio = procesar_movimientos([])
    self.assertEqual(resultado_vacio, 0)
    
    # Caso 2: Bucle con 1 iteración
    movimiento_unico = {
        'producto_id': productos[0].id,
        'cantidad': 5,
        'tipo': 'entrada'
    }
    resultado_unico = procesar_movimientos([movimiento_unico])
    self.assertEqual(resultado_unico, 1)
    
    # Caso 3: Bucle con múltiples iteraciones
    movimientos_multiples = [
        {'producto_id': p.id, 'cantidad': 2, 'tipo': 'entrada'}
        for p in productos[:3]
    ]
    resultado_multiple = procesar_movimientos(movimientos_multiples)
    self.assertEqual(resultado_multiple, len(movimientos_multiples))
```

## 7. Pruebas de Flujo de Datos

Las pruebas de flujo de datos verifican las secuencias de definición y uso de variables en el código.

```python
def test_flujo_datos():
    # Ejemplo para seguimiento de variable stock
    producto = Producto.objects.get(codigo='LAP001')
    
    # Definición inicial de stock
    stock_inicial = producto.stock
    
    # Uso 1: Crear movimiento de entrada
    movimiento = Movimiento.objects.create(
        producto=producto,
        cantidad=5,
        tipo='entrada',
        usuario=self.usuario
    )
    
    # Redefinición de stock
    producto.refresh_from_db()
    stock_actualizado = producto.stock
    
    # Uso 2: Verificar que el stock se actualizó correctamente
    self.assertEqual(stock_actualizado, stock_inicial + 5)
    
    # Uso 3: Crear movimiento de salida
    movimiento = Movimiento.objects.create(
        producto=producto,
        cantidad=2,
        tipo='salida',
        usuario=self.usuario
    )
    
    # Redefinición final de stock
    producto.refresh_from_db()
    stock_final = producto.stock
    
    # Uso 4: Verificar stock final
    self.assertEqual(stock_final, stock_actualizado - 2)
```

## 8. Pruebas de Mutación

Las pruebas de mutación introducen cambios (mutaciones) en el código para verificar si las pruebas existentes detectan estos cambios.

```python
def test_mutacion():
    # Este es un ejemplo conceptual, ya que las pruebas de mutación
    # generalmente se realizan con herramientas especializadas
    
    # Función original
    def actualizar_stock_original(producto, cantidad, tipo):
        if tipo == 'entrada':
            producto.stock += cantidad
        elif tipo == 'salida':
            if producto.stock >= cantidad:
                producto.stock -= cantidad
            else:
                raise ValidationError("Stock insuficiente")
        producto.save()
        return producto.stock
    
    # Mutación 1: Cambiar += por -=
    def actualizar_stock_mutacion1(producto, cantidad, tipo):
        if tipo == 'entrada':
            producto.stock -= cantidad  # Mutación
        elif tipo == 'salida':
            if producto.stock >= cantidad:
                producto.stock -= cantidad
            else:
                raise ValidationError("Stock insuficiente")
        producto.save()
        return producto.stock
    
    # Mutación 2: Cambiar >= por >
    def actualizar_stock_mutacion2(producto, cantidad, tipo):
        if tipo == 'entrada':
            producto.stock += cantidad
        elif tipo == 'salida':
            if producto.stock > cantidad:  # Mutación
                producto.stock -= cantidad
            else:
                raise ValidationError("Stock insuficiente")
        producto.save()
        return producto.stock
    
    # Prueba que detectaría la mutación 1
    producto = Producto.objects.get(codigo='LAP001')
    stock_inicial = producto.stock
    
    # La prueba fallaría con la mutación 1
    nuevo_stock = actualizar_stock_original(producto, 5, 'entrada')
    self.assertEqual(nuevo_stock, stock_inicial + 5)
    
    # La prueba fallaría con la mutación 2 en caso límite
    producto.stock = 5
    producto.save()
    nuevo_stock = actualizar_stock_original(producto, 5, 'salida')
    self.assertEqual(nuevo_stock, 0)
```