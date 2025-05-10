from rest_framework import serializers
from .models import (Estatus, Categoria, EnfoqueTecnologia, LenguajeProgramacion,  Tecnologia,
                     SubDependencia, Dependencia, CargoSolicitante, Solicitante, RolResponsable, Responsable,
                     Producto, TecnologiaProducto, ResponsableProducto)


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


class SolicitanteSerializer(serializers.ModelSerializer):
    dependencia = DependenciaSerializer()
    cargo = CargoSolicitanteSerializer()

    class Meta:
        model = Solicitante
        fields = '__all__'


class RolResponsableSerializer(serializers.ModelSerializer):
    class Meta:
        model = RolResponsable
        fields = '__all__'


class ResponsableSerializer(serializers.ModelSerializer):
    rol = RolResponsableSerializer()

    class Meta:
        model = Responsable
        fields = '__all__'


class ProductoSerializer(serializers.ModelSerializer):
    estatus = EstatusSerializer()
    categoria = CategoriaSerializer()
    tecnologias = serializers.SerializerMethodField()

    class Meta:
        model = Producto
        fields = '__all__'

    def get_tecnologias(self, obj):
        tecnologias_productos = TecnologiaProducto.objects.filter(producto=obj)
        tecnologias = [tp.tecnologia for tp in tecnologias_productos]
        serializer = TecnologiaSerializer(tecnologias, many=True)
        return serializer.data


class ProductoDetailSerializer(serializers.ModelSerializer):
    estatus = EstatusSerializer()
    categoria = CategoriaSerializer()
    tecnologias = serializers.SerializerMethodField()
    solicitante = serializers.SerializerMethodField()
    responsables = serializers.SerializerMethodField()
    fecha_lanzamiento = serializers.SerializerMethodField()

    class Meta:
        model = Producto
        fields = '__all__'

    def get_tecnologias(self, obj):
        tecnologias_productos = TecnologiaProducto.objects.filter(producto=obj)
        tecnologias = [tp.tecnologia for tp in tecnologias_productos]
        serializer = TecnologiaSerializer(tecnologias, many=True)
        return serializer.data

    def get_solicitante(self, obj):
        if obj.solicitante:
            return {
                "nombre": obj.solicitante.nombre,
                "apellido": obj.solicitante.apellido,
                "cargo": obj.solicitante.cargo.nombre,
                "dependencia": {
                    "nombre": obj.solicitante.dependencia.nombre
                }
            }
        return None

    def get_responsables(self, obj):
        responsables = ResponsableProducto.objects.filter(producto=obj)
        return [
            {
                "nombre": responsable.responsable.nombre,
                "apellido": responsable.responsable.apellido,
                "rol": responsable.responsable.rol.nombre if responsable.responsable.rol else None
            }
            for responsable in responsables
        ]

    def get_fecha_lanzamiento(self, obj):
        return obj.fecha_lanzamiento.strftime('%d-%m-%Y')


# Definicion de tablas intermedias


class TecnologiaProductoSerializer(serializers.ModelSerializer):
    producto = ProductoSerializer(read_only=True)
    producto_id = serializers.PrimaryKeyRelatedField(
        queryset=Producto.objects.all(), source='producto', write_only=True)
    tecnologia = TecnologiaSerializer(read_only=True)
    tecnologia_id = serializers.PrimaryKeyRelatedField(
        queryset=Tecnologia.objects.all(), source='tecnologia', write_only=True)

    class Meta:
        model = TecnologiaProducto
        fields = '__all__'


class ResponsableProductoSerializer(serializers.ModelSerializer):
    producto = ProductoSerializer(read_only=True)
    producto_id = serializers.PrimaryKeyRelatedField(
        queryset=Producto.objects.all(), source='producto', write_only=True)
    responsable = ResponsableSerializer(read_only=True)
    responsable_id = serializers.PrimaryKeyRelatedField(
        queryset=Responsable.objects.all(), source='responsable', write_only=True)

    class Meta:
        model = ResponsableProducto
        fields = '__all__'
