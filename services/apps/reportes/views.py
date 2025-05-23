from io import BytesIO
from django.http import HttpResponse
from .utils.data_utils import get_report_data
from .utils.excel_utils import generate_excel_report

# Create your views here.


def reporte_general_excel(request):
    try:
        # Obtener datos
        data = get_report_data()

        # Generar Excel
        wb = generate_excel_report(data)

        # Preparar respuesta
        response = HttpResponse(
            content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        )
        response['Content-Disposition'] = 'attachment; filename="reporte_general.xlsx"'

        # Guardar en memoria
        buffer = BytesIO()
        wb.save(buffer)
        buffer.seek(0)
        response.write(buffer.getvalue())

        return response

    except Exception as e:
        return HttpResponse(f"Error al generar el reporte: {str(e)}", status=500)
