# Programa de demostración para técnicas de prueba de caja blanca

"""
Este programa contiene funciones que demuestran diferentes estructuras de control
para explicar técnicas de prueba de caja blanca como:
- Cobertura de Sentencias
- Cobertura de Decisiones
- Cobertura de Ramas
- Cobertura de Caminos
- Cobertura de Condiciones
- Cobertura de Condiciones Múltiples
- Cobertura de Bucles
- Pruebas de Flujo de Datos
- Pruebas de Mutación
"""


# Función para demostrar Cobertura de Sentencias
def calcular_descuento(precio, es_cliente_frecuente):
    """
    Calcula el descuento aplicable a un producto.
    
    Para Cobertura de Sentencias: Debemos asegurar que cada línea de código
    se ejecute al menos una vez durante las pruebas.
    """
    descuento = 0
    
    if es_cliente_frecuente:
        descuento = precio * 0.1  # 10% de descuento para clientes frecuentes
    
    if precio > 1000:
        descuento += precio * 0.05  # 5% adicional para compras grandes
        
    precio_final = precio - descuento
    return precio_final


# Función para demostrar Cobertura de Decisiones y Ramas
def calificar_examen(puntuacion):
    """
    Califica un examen según la puntuación obtenida.
    
    Para Cobertura de Decisiones: Debemos asegurar que cada decisión (condición)
    tome tanto el valor verdadero como falso durante las pruebas.
    
    Para Cobertura de Ramas: Debemos asegurar que cada rama (camino desde una decisión)
    se ejecute al menos una vez durante las pruebas.
    """
    if puntuacion < 0 or puntuacion > 100:
        return "Puntuación inválida"
    
    if puntuacion >= 90:
        return "A"
    elif puntuacion >= 80:
        return "B"
    elif puntuacion >= 70:
        return "C"
    elif puntuacion >= 60:
        return "D"
    else:
        return "F"


# Función para demostrar Cobertura de Caminos
def procesar_pago(monto, metodo_pago, tiene_cupon):
    """
    Procesa un pago según diferentes condiciones.
    
    Para Cobertura de Caminos: Debemos asegurar que cada posible camino de ejecución
    a través de la función se ejecute al menos una vez durante las pruebas.
    """
    comision = 0
    descuento = 0
    
    # Camino 1: Pago con tarjeta de crédito
    if metodo_pago == "tarjeta_credito":
        comision = monto * 0.03
    # Camino 2: Pago con transferencia bancaria
    elif metodo_pago == "transferencia":
        comision = monto * 0.01
    # Camino 3: Pago en efectivo
    else:  # efectivo
        comision = 0
    
    # Subcamino: Con o sin cupón
    if tiene_cupon:
        descuento = monto * 0.05
    
    total = monto + comision - descuento
    return total


# Función para demostrar Cobertura de Condiciones
def verificar_elegibilidad_prestamo(edad, ingreso_anual, historial_crediticio):
    """
    Verifica si una persona es elegible para un préstamo.
    
    Para Cobertura de Condiciones: Debemos asegurar que cada condición atómica
    (no compuesta) tome tanto el valor verdadero como falso durante las pruebas.
    """
    if edad >= 18 and ingreso_anual >= 30000 and historial_crediticio >= 700:
        return "Aprobado"
    else:
        return "Rechazado"


# Función para demostrar Cobertura de Condiciones Múltiples
def categorizar_cliente(edad, compras_anuales, años_cliente):
    """
    Categoriza a un cliente según múltiples condiciones.
    
    Para Cobertura de Condiciones Múltiples: Debemos asegurar que todas las posibles
    combinaciones de valores de verdad para las condiciones se prueben.
    """
    es_mayor = edad >= 18
    es_comprador_frecuente = compras_anuales > 5000
    es_cliente_antiguo = años_cliente >= 5
    
    if es_mayor and (es_comprador_frecuente or es_cliente_antiguo):
        return "Cliente Premium"
    elif es_mayor and not (es_comprador_frecuente or es_cliente_antiguo):
        return "Cliente Regular"
    else:
        return "Cliente Juvenil"


# Función para demostrar Cobertura de Bucles
def calcular_factorial(n):
    """
    Calcula el factorial de un número.
    
    Para Cobertura de Bucles: Debemos probar diferentes escenarios del bucle:
    - 0 iteraciones (no entrar al bucle)
    - 1 iteración (caso límite)
    - m iteraciones (caso típico)
    - n-1 iteraciones (caso límite superior)
    - n iteraciones (máximo)
    """
    if n < 0:
        return None  # No se puede calcular factorial de números negativos
    
    resultado = 1
    for i in range(1, n + 1):
        resultado *= i
    
    return resultado


# Función para demostrar Pruebas de Flujo de Datos
def calcular_promedio(numeros):
    """
    Calcula el promedio de una lista de números.
    
    Para Pruebas de Flujo de Datos: Debemos seguir la definición y uso de variables
    para asegurar que todas las posibles secuencias def-uso se prueben.
    """
    if not numeros:  # Definición de la variable 'numeros'
        return None
    
    suma = 0  # Definición de 'suma'
    for num in numeros:  # Uso de 'numeros'
        suma += num  # Uso de 'suma'
    
    cantidad = len(numeros)  # Definición de 'cantidad', uso de 'numeros'
    promedio = suma / cantidad  # Definición de 'promedio', uso de 'suma' y 'cantidad'
    
    return promedio  # Uso de 'promedio'


# Función para demostrar Pruebas de Mutación
def es_primo(numero):
    """
    Determina si un número es primo.
    
    Para Pruebas de Mutación: Se introducirían cambios pequeños (mutantes) en el código
    como cambiar '<' por '<=', '+' por '-', etc., y verificar si las pruebas detectan estos cambios.
    """
    if numero <= 1:
        return False
    
    if numero <= 3:
        return True
    
    if numero % 2 == 0 or numero % 3 == 0:
        return False
    
    i = 5
    while i * i <= numero:
        if numero % i == 0 or numero % (i + 2) == 0:
            return False
        i += 6
    
    return True


# Función principal para demostrar el uso de las funciones
def main():
    print("Demostración de técnicas de prueba de caja blanca\n")
    
    # Demostración de Cobertura de Sentencias
    print("1. Cobertura de Sentencias - calcular_descuento()")
    print(f"   Precio: 500, Cliente frecuente: No -> {calcular_descuento(500, False)}")
    print(f"   Precio: 1200, Cliente frecuente: Sí -> {calcular_descuento(1200, True)}\n")
    
    # Demostración de Cobertura de Decisiones y Ramas
    print("2. Cobertura de Decisiones/Ramas - calificar_examen()")
    print(f"   Puntuación: 95 -> {calificar_examen(95)}")
    print(f"   Puntuación: 85 -> {calificar_examen(85)}")
    print(f"   Puntuación: 75 -> {calificar_examen(75)}")
    print(f"   Puntuación: 65 -> {calificar_examen(65)}")
    print(f"   Puntuación: 55 -> {calificar_examen(55)}")
    print(f"   Puntuación: -10 -> {calificar_examen(-10)}\n")
    
    # Demostración de Cobertura de Caminos
    print("3. Cobertura de Caminos - procesar_pago()")
    print(f"   Monto: 100, Método: tarjeta_credito, Cupón: No -> {procesar_pago(100, 'tarjeta_credito', False)}")
    print(f"   Monto: 100, Método: transferencia, Cupón: Sí -> {procesar_pago(100, 'transferencia', True)}")
    print(f"   Monto: 100, Método: efectivo, Cupón: No -> {procesar_pago(100, 'efectivo', False)}\n")
    
    # Demostración de Cobertura de Condiciones
    print("4. Cobertura de Condiciones - verificar_elegibilidad_prestamo()")
    print(f"   Edad: 25, Ingreso: 40000, Crédito: 750 -> {verificar_elegibilidad_prestamo(25, 40000, 750)}")
    print(f"   Edad: 17, Ingreso: 40000, Crédito: 750 -> {verificar_elegibilidad_prestamo(17, 40000, 750)}\n")
    
    # Demostración de Cobertura de Condiciones Múltiples
    print("5. Cobertura de Condiciones Múltiples - categorizar_cliente()")
    print(f"   Edad: 30, Compras: 6000, Años: 2 -> {categorizar_cliente(30, 6000, 2)}")
    print(f"   Edad: 30, Compras: 3000, Años: 6 -> {categorizar_cliente(30, 3000, 6)}")
    print(f"   Edad: 30, Compras: 3000, Años: 2 -> {categorizar_cliente(30, 3000, 2)}")
    print(f"   Edad: 16, Compras: 6000, Años: 6 -> {categorizar_cliente(16, 6000, 6)}\n")
    
    # Demostración de Cobertura de Bucles
    print("6. Cobertura de Bucles - calcular_factorial()")
    print(f"   n = 0 -> {calcular_factorial(0)}")
    print(f"   n = 1 -> {calcular_factorial(1)}")
    print(f"   n = 5 -> {calcular_factorial(5)}\n")
    
    # Demostración de Pruebas de Flujo de Datos
    print("7. Pruebas de Flujo de Datos - calcular_promedio()")
    print(f"   Lista: [10, 20, 30, 40, 50] -> {calcular_promedio([10, 20, 30, 40, 50])}")
    print(f"   Lista: [] -> {calcular_promedio([])}\n")
    
    # Demostración de Pruebas de Mutación
    print("8. Pruebas de Mutación - es_primo()")
    print(f"   Número: 7 -> {es_primo(7)}")
    print(f"   Número: 10 -> {es_primo(10)}")
    print(f"   Número: 1 -> {es_primo(1)}")


if __name__ == "__main__":
    main()