# Demostración de Técnicas de Prueba de Caja Blanca

Este proyecto contiene un programa simple en Python que demuestra diferentes técnicas de prueba de caja blanca. El objetivo es proporcionar ejemplos claros de cómo se aplican estas técnicas en el desarrollo de software.

## Contenido del Proyecto

- `caja_blanca_demo.py`: Programa principal con funciones que demuestran diferentes estructuras de control.
- `test_caja_blanca.py`: Pruebas unitarias que ilustran cómo aplicar las técnicas de prueba de caja blanca.
- `README.md`: Este archivo con explicaciones detalladas.

## Técnicas de Prueba de Caja Blanca Demostradas

### 1. Cobertura de Sentencias

**Definición**: Asegura que cada línea de código se ejecute al menos una vez durante las pruebas.

**Ejemplo en el código**: La función `calcular_descuento()` tiene diferentes caminos de ejecución dependiendo de si el cliente es frecuente y si el precio es mayor a 1000.

**Aplicación en pruebas**: En `TestCoberturaSentencias` se crean casos de prueba que garantizan que todas las líneas de código se ejecuten al menos una vez.

### 2. Cobertura de Decisiones

**Definición**: Asegura que cada decisión (condición) tome tanto el valor verdadero como falso durante las pruebas.

**Ejemplo en el código**: La función `calificar_examen()` contiene múltiples decisiones basadas en la puntuación del examen.

**Aplicación en pruebas**: En `TestCoberturaDecisionesRamas` se crean casos de prueba que hacen que cada condición se evalúe como verdadera y falsa.

### 3. Cobertura de Ramas

**Definición**: Asegura que cada rama (camino desde una decisión) se ejecute al menos una vez durante las pruebas.

**Ejemplo en el código**: La función `calificar_examen()` tiene múltiples ramas dependiendo de la puntuación.

**Aplicación en pruebas**: En `TestCoberturaDecisionesRamas` se crean casos de prueba que cubren todas las posibles ramas de ejecución.

### 4. Cobertura de Caminos

**Definición**: Asegura que cada posible camino de ejecución a través de la función se ejecute al menos una vez durante las pruebas.

**Ejemplo en el código**: La función `procesar_pago()` tiene diferentes caminos dependiendo del método de pago y si tiene cupón.

**Aplicación en pruebas**: En `TestCoberturaCaminos` se crean casos de prueba que cubren todas las combinaciones posibles de caminos de ejecución.

### 5. Cobertura de Condiciones

**Definición**: Asegura que cada condición atómica (no compuesta) tome tanto el valor verdadero como falso durante las pruebas.

**Ejemplo en el código**: La función `verificar_elegibilidad_prestamo()` tiene una condición compuesta con tres condiciones atómicas.

**Aplicación en pruebas**: En `TestCoberturaCondiciones` se crean casos de prueba que hacen que cada condición atómica se evalúe como verdadera y falsa.

### 6. Cobertura de Condiciones Múltiples

**Definición**: Asegura que todas las posibles combinaciones de valores de verdad para las condiciones se prueben.

**Ejemplo en el código**: La función `categorizar_cliente()` tiene condiciones compuestas con operadores lógicos AND y OR.

**Aplicación en pruebas**: En `TestCoberturaCondicionesMultiples` se crean casos de prueba que cubren diferentes combinaciones de valores de verdad para las condiciones.

### 7. Cobertura de Bucles

**Definición**: Asegura que los bucles se prueben en diferentes escenarios: 0 iteraciones, 1 iteración, múltiples iteraciones, etc.

**Ejemplo en el código**: La función `calcular_factorial()` contiene un bucle que itera n veces.

**Aplicación en pruebas**: En `TestCoberturaBucles` se crean casos de prueba que prueban el bucle con diferentes números de iteraciones.

### 8. Pruebas de Flujo de Datos

**Definición**: Sigue la definición y uso de variables para asegurar que todas las posibles secuencias def-uso se prueben.

**Ejemplo en el código**: La función `calcular_promedio()` define y usa varias variables en diferentes puntos.

**Aplicación en pruebas**: En `TestFlujoDatos` se crean casos de prueba que siguen diferentes caminos de definición y uso de variables.

### 9. Pruebas de Mutación

**Definición**: Introduce cambios pequeños (mutantes) en el código y verifica si las pruebas detectan estos cambios.

**Ejemplo en el código**: La función `es_primo()` contiene lógica compleja que podría ser susceptible a pequeños cambios.

**Aplicación en pruebas**: En `TestMutacion` se crean casos de prueba exhaustivos que deberían detectar cualquier cambio pequeño en la lógica de la función.

## Cómo Ejecutar el Programa

1. Ejecutar el programa principal:
   ```
   python caja_blanca_demo.py
   ```

2. Ejecutar las pruebas:
   ```
   python test_caja_blanca.py
   ```

## Beneficios de las Pruebas de Caja Blanca

1. **Detección temprana de errores**: Ayuda a encontrar errores en la lógica del programa antes de que lleguen a producción.

2. **Mejora de la calidad del código**: Fomenta un diseño más limpio y modular.

3. **Documentación viva**: Las pruebas sirven como documentación ejecutable del comportamiento esperado del código.

4. **Facilita el mantenimiento**: Permite realizar cambios con confianza, sabiendo que las pruebas detectarán regresiones.

5. **Cobertura completa**: Asegura que todas las partes del código se prueben adecuadamente.

## Limitaciones de las Pruebas de Caja Blanca

1. **No garantiza la corrección funcional**: Aunque el código se ejecute correctamente, puede no cumplir con los requisitos del usuario.

2. **Requiere conocimiento del código**: El diseñador de las pruebas debe entender la implementación interna.

3. **Puede ser costoso**: Diseñar y mantener pruebas para todas las partes del código puede requerir mucho tiempo.

4. **No detecta errores de omisión**: No puede detectar funcionalidades que faltan pero que deberían estar presentes.

## Conclusión

Las técnicas de prueba de caja blanca son fundamentales para garantizar la calidad del software desde una perspectiva estructural. Este proyecto demuestra cómo aplicar estas técnicas en un contexto práctico, proporcionando ejemplos claros y explicaciones detalladas de cada enfoque.