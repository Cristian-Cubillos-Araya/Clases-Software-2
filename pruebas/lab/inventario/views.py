from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.db.models import Sum
from .models import Producto, Categoria, Movimiento
from usuarios.models import Usuario

@login_required
def lista_productos(request):
    productos = Producto.objects.all()
    return render(request, 'inventario/lista_productos.html', {'productos': productos})

@login_required
def detalle_producto(request, pk):
    producto = get_object_or_404(Producto, pk=pk)
    movimientos = producto.movimientos.all().order_by('-fecha')[:10]
    return render(request, 'inventario/detalle_producto.html', {
        'producto': producto,
        'movimientos': movimientos
    })

@login_required
def nuevo_producto(request):
    if request.method == 'POST':
        nombre = request.POST.get('nombre')
        codigo = request.POST.get('codigo')
        descripcion = request.POST.get('descripcion')
        precio = request.POST.get('precio')
        stock = request.POST.get('stock', 0)
        categoria_id = request.POST.get('categoria')
        
        categoria = get_object_or_404(Categoria, pk=categoria_id)
        
        producto = Producto.objects.create(
            nombre=nombre,
            codigo=codigo,
            descripcion=descripcion,
            precio=precio,
            stock=stock,
            categoria=categoria
        )
        
        messages.success(request, f'Producto {producto.nombre} creado correctamente')
        return redirect('lista_productos')
    
    categorias = Categoria.objects.all()
    return render(request, 'inventario/nuevo_producto.html', {'categorias': categorias})

@login_required
def registrar_movimiento(request):
    if request.method == 'POST':
        producto_id = request.POST.get('producto')
        cantidad = int(request.POST.get('cantidad'))
        tipo = request.POST.get('tipo')
        observacion = request.POST.get('observacion')
        
        producto = get_object_or_404(Producto, pk=producto_id)
        
        # Validar que haya suficiente stock para salidas
        if tipo == 'salida' and cantidad > producto.stock:
            messages.error(request, f'No hay suficiente stock de {producto.nombre}')
            return redirect('registrar_movimiento')
        
        Movimiento.objects.create(
            producto=producto,
            cantidad=cantidad,
            tipo=tipo,
            observacion=observacion,
            usuario=request.user
        )
        
        messages.success(request, f'Movimiento de {producto.nombre} registrado correctamente')
        return redirect('lista_productos')
    
    productos = Producto.objects.all()
    return render(request, 'inventario/registrar_movimiento.html', {'productos': productos})

@login_required
def dashboard_inventario(request):
    total_productos = Producto.objects.count()
    total_categorias = Categoria.objects.count()
    productos_sin_stock = Producto.objects.filter(stock=0).count()
    
    # Productos con más movimientos
    productos_populares = Producto.objects.annotate(
        total_movimientos=Sum('movimientos__cantidad')
    ).order_by('-total_movimientos')[:5]
    
    return render(request, 'inventario/dashboard.html', {
        'total_productos': total_productos,
        'total_categorias': total_categorias,
        'productos_sin_stock': productos_sin_stock,
        'productos_populares': productos_populares
    })
