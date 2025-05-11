from rest_framework import serializers
from .models import (Estatus, Categoria, EnfoqueTecnologia, LenguajeProgramacion,  Tecnologia,
                     SubDependencia, Dependencia, CargoSolicitante, RolResponsable)


class EstatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estatus
        fields = '__all__'


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'


class EnfoqueTecnologiaSerializer(serializers.ModelSerializer):
    class Meta:
        model = EnfoqueTecnologia
        fields = '__all__'


class LenguajeProgramacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = LenguajeProgramacion
        fields = '__all__'


class TecnologiaSerializer(serializers.ModelSerializer):
    enfoque = EnfoqueTecnologiaSerializer()
    lenguaje = LenguajeProgramacionSerializer()

    class Meta:
        model = Tecnologia
        fields = '__all__'


class SubDependenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubDependencia
        fields = '__all__'


class DependenciaSerializer(serializers.ModelSerializer):
    total_productos = serializers.IntegerField(read_only=True)

    class Meta:
        model = Dependencia
        fields = '__all__'


class CargoSolicitanteSerializer(serializers.ModelSerializer):
    class Meta:
        model = CargoSolicitante
        fields = '__all__'


class RolResponsableSerializer(serializers.ModelSerializer):
    class Meta:
        model = RolResponsable
        fields = '__all__'
