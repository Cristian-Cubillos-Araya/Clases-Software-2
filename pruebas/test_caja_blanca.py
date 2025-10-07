# Pruebas para el programa de demostración de técnicas de caja blanca

import unittest
from caja_blanca_demo import (
    calcular_descuento,
    calificar_examen,
    procesar_pago,
    verificar_elegibilidad_prestamo,
    categorizar_cliente,
    calcular_factorial,
    calcular_promedio,
    es_primo
)


class TestCoberturaSentencias(unittest.TestCase):
    """
    Pruebas para demostrar la Cobertura de Sentencias.
    
    Objetivo: Ejecutar cada línea de código al menos una vez.
    """
    
    def test_calcular_descuento(self):
        # Caso 1: Cliente no frecuente, precio bajo (cubre líneas 1, 2, 5, 6)
        self.assertEqual(calcular_descuento(500, False), 500)
        
        # Caso 2: Cliente frecuente, precio alto (cubre líneas 1, 2, 3, 4, 5, 6)
        self.assertEqual(calcular_descuento(1200, True), 1020)  # 1200 - 120 - 60 = 1020


class TestCoberturaDecisionesRamas(unittest.TestCase):
    """
    Pruebas para demostrar la Cobertura de Decisiones y Ramas.
    
    Objetivo para Decisiones: Cada condición debe evaluarse como verdadera y falsa.
    Objetivo para Ramas: Cada rama desde una decisión debe ejecutarse al menos una vez.
    """
    
    def test_calificar_examen(self):
        # Prueba para puntuación inválida (negativa)
        self.assertEqual(calificar_examen(-10), "Puntuación inválida")
        
        # Prueba para puntuación inválida (mayor a 100)
        self.assertEqual(calificar_examen(110), "Puntuación inválida")
        
        # Prueba para calificación A
        self.assertEqual(calificar_examen(95), "A")
        
        # Prueba para calificación B
        self.assertEqual(calificar_examen(85), "B")
        
        # Prueba para calificación C
        self.assertEqual(calificar_examen(75), "C")
        
        # Prueba para calificación D
        self.assertEqual(calificar_examen(65), "D")
        
        # Prueba para calificación F
        self.assertEqual(calificar_examen(55), "F")


class TestCoberturaCaminos(unittest.TestCase):
    """
    Pruebas para demostrar la Cobertura de Caminos.
    
    Objetivo: Ejecutar cada posible camino de ejecución al menos una vez.
    """
    
    def test_procesar_pago(self):
        # Camino 1: Tarjeta de crédito sin cupón
        self.assertEqual(procesar_pago(100, "tarjeta_credito", False), 103)  # 100 + 3 = 103
        
        # Camino 2: Tarjeta de crédito con cupón
        self.assertEqual(procesar_pago(100, "tarjeta_credito", True), 98)  # 100 + 3 - 5 = 98
        
        # Camino 3: Transferencia sin cupón
        self.assertEqual(procesar_pago(100, "transferencia", False), 101)  # 100 + 1 = 101
        
        # Camino 4: Transferencia con cupón
        self.assertEqual(procesar_pago(100, "transferencia", True), 96)  # 100 + 1 - 5 = 96
        
        # Camino 5: Efectivo sin cupón
        self.assertEqual(procesar_pago(100, "efectivo", False), 100)  # 100 + 0 = 100
        
        # Camino 6: Efectivo con cupón
        self.assertEqual(procesar_pago(100, "efectivo", True), 95)  # 100 + 0 - 5 = 95


class TestCoberturaCondiciones(unittest.TestCase):
    """
    Pruebas para demostrar la Cobertura de Condiciones.
    
    Objetivo: Cada condición atómica debe evaluarse como verdadera y falsa.
    """
    
    def test_verificar_elegibilidad_prestamo(self):
        # Todas las condiciones son verdaderas
        self.assertEqual(verificar_elegibilidad_prestamo(25, 40000, 750), "Aprobado")
        
        # Condición 1 (edad) es falsa, las demás verdaderas
        self.assertEqual(verificar_elegibilidad_prestamo(17, 40000, 750), "Rechazado")
        
        # Condición 2 (ingreso) es falsa, las demás verdaderas
        self.assertEqual(verificar_elegibilidad_prestamo(25, 25000, 750), "Rechazado")
        
        # Condición 3 (historial) es falsa, las demás verdaderas
        self.assertEqual(verificar_elegibilidad_prestamo(25, 40000, 650), "Rechazado")


class TestCoberturaCondicionesMultiples(unittest.TestCase):
    """
    Pruebas para demostrar la Cobertura de Condiciones Múltiples.
    
    Objetivo: Probar todas las posibles combinaciones de valores de verdad para las condiciones.
    """
    
    def test_categorizar_cliente(self):
        # Caso 1: es_mayor=True, es_comprador_frecuente=True, es_cliente_antiguo=False
        self.assertEqual(categorizar_cliente(30, 6000, 2), "Cliente Premium")
        
        # Caso 2: es_mayor=True, es_comprador_frecuente=False, es_cliente_antiguo=True
        self.assertEqual(categorizar_cliente(30, 3000, 6), "Cliente Premium")
        
        # Caso 3: es_mayor=True, es_comprador_frecuente=False, es_cliente_antiguo=False
        self.assertEqual(categorizar_cliente(30, 3000, 2), "Cliente Regular")
        
        # Caso 4: es_mayor=False, es_comprador_frecuente=True, es_cliente_antiguo=True
        self.assertEqual(categorizar_cliente(16, 6000, 6), "Cliente Juvenil")
        
        # Caso 5: es_mayor=False, es_comprador_frecuente=False, es_cliente_antiguo=False
        self.assertEqual(categorizar_cliente(16, 3000, 2), "Cliente Juvenil")


class TestCoberturaBucles(unittest.TestCase):
    """
    Pruebas para demostrar la Cobertura de Bucles.
    
    Objetivo: Probar diferentes escenarios del bucle (0, 1, m, n-1, n iteraciones).
    """
    
    def test_calcular_factorial(self):
        # Caso 1: 0 iteraciones (n < 0)
        self.assertIsNone(calcular_factorial(-1))
        
        # Caso 2: 0 iteraciones (n = 0)
        self.assertEqual(calcular_factorial(0), 1)
        
        # Caso 3: 1 iteración (n = 1)
        self.assertEqual(calcular_factorial(1), 1)
        
        # Caso 4: m iteraciones (n = 5)
        self.assertEqual(calcular_factorial(5), 120)


class TestFlujoDatos(unittest.TestCase):
    """
    Pruebas para demostrar las Pruebas de Flujo de Datos.
    
    Objetivo: Seguir la definición y uso de variables para asegurar que todas
    las posibles secuencias def-uso se prueben.
    """
    
    def test_calcular_promedio(self):
        # Caso normal: lista con elementos
        self.assertEqual(calcular_promedio([10, 20, 30, 40, 50]), 30)
        
        # Caso borde: lista vacía
        self.assertIsNone(calcular_promedio([]))


class TestMutacion(unittest.TestCase):
    """
    Pruebas para demostrar las Pruebas de Mutación.
    
    Objetivo: Detectar cambios pequeños (mutantes) en el código.
    
    Nota: En un entorno real, se utilizaría una herramienta de mutación para
    introducir automáticamente cambios en el código y verificar si las pruebas
    los detectan.
    """
    
    def test_es_primo(self):
        # Números primos
        self.assertTrue(es_primo(2))
        self.assertTrue(es_primo(3))
        self.assertTrue(es_primo(5))
        self.assertTrue(es_primo(7))
        self.assertTrue(es_primo(11))
        self.assertTrue(es_primo(13))
        self.assertTrue(es_primo(17))
        self.assertTrue(es_primo(19))
        self.assertTrue(es_primo(23))
        self.assertTrue(es_primo(29))
        
        # Números no primos
        self.assertFalse(es_primo(-1))
        self.assertFalse(es_primo(0))
        self.assertFalse(es_primo(1))
        self.assertFalse(es_primo(4))
        self.assertFalse(es_primo(6))
        self.assertFalse(es_primo(8))
        self.assertFalse(es_primo(9))
        self.assertFalse(es_primo(10))
        self.assertFalse(es_primo(12))
        self.assertFalse(es_primo(15))


if __name__ == "__main__":
    unittest.main()