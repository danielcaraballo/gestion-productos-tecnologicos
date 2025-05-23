from django.urls import path
from .views import reporte_productos_excel

urlpatterns = [
    path('productos/excel/', reporte_productos_excel,
         name='product_report_excel'),
]
