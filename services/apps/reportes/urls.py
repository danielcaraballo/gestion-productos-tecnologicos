from django.urls import path
from .views import reporte_general_excel

urlpatterns = [
    path('general/excel/', reporte_general_excel,
         name='reporte_general_excel'),
]
