from django.contrib import admin
from simple_history.admin import SimpleHistoryAdmin
from .models import (Solicitante, Responsable, Producto, Componente, TrabajoOperativo,
                     TecnologiaProducto, ResponsableProducto,)

# Register your models here.


class TecnologiaInline(admin.TabularInline):
    model = TecnologiaProducto
    extra = 0


class ResponsableInline(admin.TabularInline):
    model = ResponsableProducto
    extra = 0


class ComponenteInline(admin.TabularInline):
    model = Componente
    extra = 0


class ProductoAdmin(SimpleHistoryAdmin):
    list_display = ('nombre', 'categoria', 'estatus')
    search_fields = ('nombre', 'descripcion')
    list_filter = ('estatus', 'categoria')
    inlines = [TecnologiaInline, ResponsableInline, ComponenteInline]


class TrabajoOperativoAdmin(admin.ModelAdmin):
    list_display = ('producto', 'frecuencia', 'activo')
    search_fields = ('descripcion',)
    list_filter = ('frecuencia', 'activo', 'producto')
    filter_horizontal = ('responsables',)


admin.site.register(Producto, ProductoAdmin)
admin.site.register(Componente)
admin.site.register(TrabajoOperativo, TrabajoOperativoAdmin)
admin.site.register(Solicitante)
admin.site.register(Responsable)
# admin.site.register(TecnologiaProducto)
# admin.site.register(ResponsableProducto)
