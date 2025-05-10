from django.contrib import admin
from .models import (Estatus, Categoria, EnfoqueTecnologia, LenguajeProgramacion, Tecnologia,
                     SubDependencia, Dependencia, CargoSolicitante, Solicitante, RolResponsable, Responsable,
                     Producto, TrabajoOperativo, TecnologiaProducto, ResponsableProducto)


class TecnologiaInline(admin.TabularInline):
    model = TecnologiaProducto
    extra = 0


class ResponsableInline(admin.TabularInline):
    model = ResponsableProducto
    extra = 0


class ProductoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'categoria', 'estatus', 'direccion_url')
    search_fields = ('nombre', 'descripcion')
    list_filter = ('estatus', 'categoria')
    inlines = [TecnologiaInline, ResponsableInline]


class TrabajoOperativoAdmin(admin.ModelAdmin):
    list_display = ('producto', 'frecuencia', 'activo')
    search_fields = ('descripcion',)
    list_filter = ('frecuencia', 'activo', 'producto')
    filter_horizontal = ('responsables',)


admin.site.register(Producto, ProductoAdmin)
admin.site.register(TrabajoOperativo, TrabajoOperativoAdmin)

# Register your models here.
admin.site.register(Estatus)
admin.site.register(Categoria)
admin.site.register(EnfoqueTecnologia)
admin.site.register(LenguajeProgramacion)
admin.site.register(Tecnologia)
admin.site.register(SubDependencia)
admin.site.register(Dependencia)
admin.site.register(CargoSolicitante)
admin.site.register(Solicitante)
admin.site.register(RolResponsable)
admin.site.register(Responsable)
admin.site.register(TecnologiaProducto)
admin.site.register(ResponsableProducto)
