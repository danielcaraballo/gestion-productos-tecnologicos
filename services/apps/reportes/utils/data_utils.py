from django.db.models import Count, Prefetch
from apps.portafolio.models import Producto, Componente


def get_report_data():
    # Optimización de consultas con prefetch y select_related
    componentes_prefetch = Prefetch(
        'componentes',
        queryset=Componente.objects.select_related('tipo')
    )

    productos = Producto.objects.select_related(
        'categoria',
        'dependencia_usuaria',
        'subdependencia_usuaria',
        'estatus'
    ).prefetch_related(
        componentes_prefetch
    ).all()

    # Estadísticas ordenadas por cantidad (descendente)
    stats = {
        'total_productos': productos.count(),
        'por_estatus': productos.values(
            'estatus__nombre'
        ).annotate(
            total=Count('id')
        ).order_by('-total'),
        'por_categoria': productos.values(
            'categoria__nombre'
        ).annotate(
            total=Count('id')
        ).order_by('-total'),
        'por_dependencia_usuaria': productos.values(
            'dependencia_usuaria__nombre'
        ).annotate(
            total=Count('id')
        ).order_by('-total'),
    }

    return {
        'stats': stats,
        'productos': productos
    }
