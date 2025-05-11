from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import (SolicitanteViewSet, ResponsableViewSet, ProductoViewSet, ProductoEstatusView, ProductoEstatusCountView,
                    ProductosDependenciasCountView, ProductosTecnologiasCountView, TecnologiaProductoViewSet, ResponsableProductoViewSet, ProductoDetailView)

router = DefaultRouter()
router.register(r'solicitantes', SolicitanteViewSet)
router.register(r'responsables', ResponsableViewSet)
router.register(r'productos', ProductoViewSet)
router.register(r'tecnologias-productos', TecnologiaProductoViewSet)
router.register(r'responsables-productos', ResponsableProductoViewSet)

urlpatterns = router.urls + [
    path('productos/<int:pk>/detail/', ProductoDetailView.as_view(),
         name='producto-detail'),
    path('producto-estatus/', ProductoEstatusView.as_view(),
         name='producto-estatus'),
    path('producto-estatus-count/', ProductoEstatusCountView.as_view(),
         name='producto-estatus-count'),
    path('productos-dependencias-count/', ProductosDependenciasCountView.as_view(),
         name='productos-dependencias-count'),
    path('productos-tecnologias-count/', ProductosTecnologiasCountView.as_view(),
         name='productos-tecnologias-count'),
]
