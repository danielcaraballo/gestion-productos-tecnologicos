from django.contrib import admin
from .models import (Estatus, Categoria, EnfoqueTecnologia, LenguajeProgramacion, Tecnologia,
                     SubDependencia, Dependencia, CargoSolicitante, RolResponsable)

# Register your models here.

admin.site.register(Estatus)
admin.site.register(Categoria)
admin.site.register(EnfoqueTecnologia)
admin.site.register(LenguajeProgramacion)
admin.site.register(Tecnologia)
admin.site.register(SubDependencia)
admin.site.register(Dependencia)
admin.site.register(CargoSolicitante)
admin.site.register(RolResponsable)
