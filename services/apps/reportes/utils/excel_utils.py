from openpyxl import Workbook
from openpyxl.styles import Font, Alignment, PatternFill
from openpyxl.utils import get_column_letter


def generate_excel_report(data):
    wb = Workbook()

    # --- Configuración de estilos ---
    header_fill = PatternFill(start_color="D9E1F2",
                              end_color="D9E1F2", fill_type="solid")
    header_font = Font(bold=True)
    title_font = Font(bold=True, size=16)

    # --- HOJA RESUMEN ---
    ws_summary = wb.active
    ws_summary.title = "Resumen"

    # Mapeo de títulos para secciones
    title_map = {
        'estatus': 'Estatus',
        'categoria': 'Categoría',
        'dependencia_usuaria': 'Dependencia Usuaria'
    }

    # Título principal
    ws_summary.append(["REPORTE DE PRODUCTOS TECNOLÓGICOS"])
    ws_summary['A1'].font = title_font

    # Estadísticas generales
    ws_summary.append(
        ["Total de productos:", data['stats']['total_productos']])
    ws_summary.append([])

    # Tablas de resumen
    for key in ['por_estatus', 'por_categoria', 'por_dependencia_usuaria']:
        section_name = title_map.get(
            key.split('_')[-1], key.split('_')[-1].title())
        ws_summary.append([f"Distribución por {section_name}"] + [""] * 3)

        # Encabezados de tabla
        ws_summary.append(["Nombre", "Total"])

        # Aplicar estilo a los encabezados
        for cell in ws_summary[ws_summary.max_row]:
            cell.fill = header_fill
            cell.font = header_font

        # Datos
        for item in data['stats'][key]:
            nombre_key = f"{key.split('_')[-1]}__nombre" if key != 'por_dependencia_usuaria' else 'dependencia_usuaria__nombre'
            ws_summary.append([
                item.get(nombre_key, 'No especificado'),
                item['total']
            ])

        ws_summary.append([])

    # --- HOJA DETALLE ---
    ws_all = wb.create_sheet("Detalle de Productos")

    # Encabezados
    headers = [
        "Nombre", "Descripción", "Categoría",
        "Dependencia Usuaria", "Subdependencia Usuaria",
        "Componentes (Tipo)", "URLs Componentes", "Estatus"
    ]
    ws_all.append(headers)

    # Aplicar estilo a los encabezados
    for cell in ws_all[1]:
        cell.fill = header_fill
        cell.font = header_font

    # Datos
    for prod in data['productos']:
        # Formatear componentes
        componentes_info = "\n".join(
            [f"{c.nombre} ({c.tipo.nombre})" for c in prod.componentes.all()]
        ) if prod.componentes.exists() else "N/A"

        urls_componentes = "\n".join(
            [c.direccion_url for c in prod.componentes.all()]
        ) if prod.componentes.exists() else "N/A"

        ws_all.append([
            prod.nombre,
            prod.descripcion,
            prod.categoria.nombre if prod.categoria else "No especificado",
            prod.dependencia_usuaria.nombre if prod.dependencia_usuaria else "No especificado",
            prod.subdependencia_usuaria.nombre if prod.subdependencia_usuaria else "No especificado",
            componentes_info,
            urls_componentes,
            prod.estatus.nombre if prod.estatus else "No especificado"
        ])

    # --- AJUSTES DE FORMATEO ---
    for sheet in wb:
        # Ajustar ancho de columnas
        for col in sheet.columns:
            col_letter = get_column_letter(col[0].column)

            # Determinar ancho basado en contenido
            max_length = 0
            for cell in col:
                try:
                    if len(str(cell.value)) > max_length:
                        max_length = len(cell.value)
                except:
                    pass
            adjusted_width = (max_length + 2) * 1.2
            sheet.column_dimensions[col_letter].width = min(adjusted_width, 30)

            # Aplicar wrap text
            for cell in col:
                cell.alignment = Alignment(
                    wrap_text=True,
                    vertical='top',
                    horizontal='left'
                )

    return wb
