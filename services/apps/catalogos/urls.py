from rest_framework.routers import DefaultRouter
from .views import (EstatusViewSet, CategoriaViewSet, EnfoqueTecnologiaViewSet, LenguajeProgramacionViewSet, TecnologiaViewSet,
                    SubDependenciaViewSet, DependenciaViewSet, RolResponsableViewSet)

router = DefaultRouter()
router.register(r'estatus', EstatusViewSet)
router.register(r'categorias', CategoriaViewSet)
router.register(r'enfoques-tecnologia', EnfoqueTecnologiaViewSet)
router.register(r'lenguajes-programacion', LenguajeProgramacionViewSet)
router.register(r'tecnologias', TecnologiaViewSet)
router.register(r'sub-dependencias', SubDependenciaViewSet)
router.register(r'dependencias', DependenciaViewSet)
router.register(r'roles-responsables', RolResponsableViewSet)

urlpatterns = router.urls
