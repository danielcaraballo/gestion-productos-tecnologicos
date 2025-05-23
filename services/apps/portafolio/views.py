from django.db.models import Count
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import (Estatus, Dependencia, Solicitante, Responsable,
                     Producto,  TecnologiaProducto, ResponsableProducto)
from .serializers import (DependenciaSerializer, SolicitanteSerializer, ResponsableSerializer,
                          ProductoSerializer, TecnologiaProductoSerializer, ResponsableProductoSerializer, ProductoDetailSerializer)

# Create your views here.


class SolicitanteViewSet(viewsets.ModelViewSet):
    queryset = Solicitante.objects.all()
    serializer_class = SolicitanteSerializer


class ResponsableViewSet(viewsets.ModelViewSet):
    queryset = Responsable.objects.all()
    serializer_class = ResponsableSerializer


class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer


# Views personalizados

class ProductoDetailView(APIView):
    def get(self, request, pk):
        try:
            producto = Producto.objects.get(pk=pk)
            serializer = ProductoDetailSerializer(producto)
            return Response(serializer.data)
        except Producto.DoesNotExist:
            return Response({"error": "Producto no encontrado"}, status=status.HTTP_404_NOT_FOUND)


class ProductoEstatusView(APIView):
    def get(self, request):
        estatus = Estatus.objects.all().values('id', 'nombre')
        return Response(estatus)


class ProductoEstatusCountView(APIView):
    def get(self, request):
        try:
            total_productos = Producto.objects.count()

            data = {
                "total": total_productos,
                "operativo": Producto.objects.filter(estatus__nombre="Operativo").count(),
                "mantenimiento": Producto.objects.filter(estatus__nombre="Mantenimiento").count(),
                "inactivo": Producto.objects.filter(estatus__nombre="Inactivo").count(),
                "retirado": Producto.objects.filter(estatus__nombre="Retirado").count(),
            }
            return Response(data)
        except Exception as e:
            return Response({"error": str(e)}, status=500)


class ProductosDependenciasCountView(APIView):
    def get(self, request):
        try:
            dependencias = Dependencia.objects.annotate(
                total_productos=Count('productos_asignados')
            ).filter(total_productos__gt=0)
            dependencias = dependencias.order_by('-total_productos')

            serializer = DependenciaSerializer(dependencias, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ProductosTecnologiasCountView(APIView):
    def get(self, request):
        try:
            data = (
                TecnologiaProducto.objects
                .select_related('tecnologia')
                .values('tecnologia__nombre')
                .annotate(count=Count('producto'))
            )
            response_data = [
                {
                    'tecnologia': item['tecnologia__nombre'],
                    'count': item['count']
                }
                for item in data
            ]
            return Response(response_data)
        except Exception as e:
            return Response({"error": str(e)}, status=500)


# ViewSets para tablas intermedias


class TecnologiaProductoViewSet(viewsets.ModelViewSet):
    queryset = TecnologiaProducto.objects.all()
    serializer_class = TecnologiaProductoSerializer


class ResponsableProductoViewSet(viewsets.ModelViewSet):
    queryset = ResponsableProducto.objects.all()
    serializer_class = ResponsableProductoSerializer
