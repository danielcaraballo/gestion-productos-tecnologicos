from django.http import HttpResponse
from io import BytesIO
from .utils.data_utils import get_report_data
from .utils.excel_utils import generate_excel_report

# Create your views here.


def reporte_productos_excel(request):
    try:
        # Obtener datos
        data = get_report_data()

        # Generar Excel
        wb = generate_excel_report(data)

        # Preparar respuesta
        response = HttpResponse(
            content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        )
        response['Content-Disposition'] = 'attachment; filename="reporte_productos.xlsx"'

        # Guardar en memoria
        buffer = BytesIO()
        wb.save(buffer)
        buffer.seek(0)
        response.write(buffer.getvalue())

        return response

    except Exception as e:
        # Manejo de errores (opcional: registrar en logs)
        return HttpResponse(f"Error al generar el reporte: {str(e)}", status=500)
