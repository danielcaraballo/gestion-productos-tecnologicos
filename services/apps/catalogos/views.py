from rest_framework import viewsets
from .models import (Estatus, Categoria, EnfoqueTecnologia, LenguajeProgramacion, Tecnologia,
                     SubDependencia, Dependencia, RolResponsable)
from .serializers import (EstatusSerializer, CategoriaSerializer, EnfoqueTecnologiaSerializer, LenguajeProgramacionSerializer,
                          TecnologiaSerializer, SubDependenciaSerializer, DependenciaSerializer, RolResponsableSerializer)

# Create your views here.


class EstatusViewSet(viewsets.ModelViewSet):
    queryset = Estatus.objects.all()
    serializer_class = EstatusSerializer


class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer


class EnfoqueTecnologiaViewSet(viewsets.ModelViewSet):
    queryset = EnfoqueTecnologia.objects.all()
    serializer_class = EnfoqueTecnologiaSerializer


class LenguajeProgramacionViewSet(viewsets.ModelViewSet):
    queryset = LenguajeProgramacion.objects.all()
    serializer_class = LenguajeProgramacionSerializer


class TecnologiaViewSet(viewsets.ModelViewSet):
    queryset = Tecnologia.objects.all()
    serializer_class = TecnologiaSerializer


class SubDependenciaViewSet(viewsets.ModelViewSet):
    queryset = SubDependencia.objects.all()
    serializer_class = SubDependenciaSerializer


class DependenciaViewSet(viewsets.ModelViewSet):
    queryset = Dependencia.objects.all()
    serializer_class = DependenciaSerializer


class RolResponsableViewSet(viewsets.ModelViewSet):
    queryset = RolResponsable.objects.all()
    serializer_class = RolResponsableSerializer
