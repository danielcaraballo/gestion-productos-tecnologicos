from openpyxl import Workbook
from openpyxl.utils import get_column_letter


def generate_excel_report(data):
    """Genera reporte Excel con datos proporcionados"""
    wb = Workbook()

    # Creación de hojas
    _create_summary_sheet(wb, data)
    _create_detail_sheet(wb, data)
    _create_status_sheets(wb, data)

    # Ajustes finales
    _apply_final_adjustments(wb)

    return wb


def _create_summary_sheet(wb, data):
    """Configura la hoja de resumen principal"""
    ws = wb.active
    ws.title = "Resumen"

    # Títulos principales
    ws.append(["PORTAFOLIO DE PRODUCTOS TECNOLÓGICOS"])
    ws.merge_cells('A1:B1')

    ws.append(["Oficina de Tecnologías de la Información y la Comunicación"])
    ws.merge_cells('A2:B2')
    ws.append([])

    # Estadísticas básicas
    ws.append(["Total de productos:", data['stats']['total_productos']])
    ws.append([])

    # Secciones de distribución
    distributions = [
        ('por_estatus', 'estatus__nombre', 'Distribución por Estatus'),
        ('por_categoria', 'categoria__nombre', 'Distribución por Categoría'),
        ('por_dependencia_usuaria', 'dependencia_usuaria__nombre',
         'Distribución por Dependencia')
    ]

    for key, field, title in distributions:
        ws.append([title])
        ws.merge_cells(f'A{ws.max_row}:B{ws.max_row}')

        if key in data['stats']:
            for item in data['stats'][key]:
                name = item[field] or "Sin especificar"
                # Ahora ponemos el valor directamente en la columna B
                ws.append([name, item['total']])

        ws.append([])

    # Pie de página
    ws.append(
        ["Reporte generado por la Aplicación de Gestión de Productos Tecnológicos"])
    ws.merge_cells(f'A{ws.max_row}:B{ws.max_row}')

    # Ajuste de columnas
    ws.column_dimensions['A'].width = 50
    ws.column_dimensions['B'].width = 20


def _create_detail_sheet(wb, data):
    """Crea hoja con detalle completo de productos"""
    ws = wb.create_sheet("Detalle")

    # Encabezados
    headers = [
        "Nombre", "Descripción", "Categoría",
        "Dependencia", "Subdependencia",
        "Componentes", "URLs"
    ]
    ws.append(headers)

    # Datos de productos
    for prod in data['productos']:
        components = "\n".join(f"{c.nombre} ({c.tipo.nombre})" for c in prod.componentes.all(
        )) if prod.componentes.exists() else "N/A"
        urls = "\n".join(c.direccion_url for c in prod.componentes.all(
        )) if prod.componentes.exists() else "N/A"

        ws.append([
            prod.nombre,
            prod.descripcion,
            prod.categoria.nombre if prod.categoria else "No especificado",
            prod.dependencia_usuaria.nombre if prod.dependencia_usuaria else "No especificado",
            prod.subdependencia_usuaria.nombre if prod.subdependencia_usuaria else "No especificado",
            components,
            urls
        ])


def _create_status_sheets(wb, data):
    """Crea hojas separadas por estatus de producto"""
    # Agrupación por estatus
    status_groups = {}
    for prod in data['productos']:
        status = prod.estatus.nombre if prod.estatus else "Sin Estatus"
        status_groups.setdefault(status, []).append(prod)

    # Crear hoja por cada grupo
    for status, products in status_groups.items():
        ws = wb.create_sheet(_clean_sheet_name(status))

        # Mismos headers que hoja detalle
        headers = [
            "Nombre", "Descripción", "Categoría",
            "Dependencia", "Subdependencia",
            "Componentes", "URLs"
        ]
        ws.append(headers)

        # Agregar productos
        for prod in products:
            components = "\n".join(f"{c.nombre} ({c.tipo.nombre})" for c in prod.componentes.all(
            )) if prod.componentes.exists() else "N/A"
            urls = "\n".join(c.direccion_url for c in prod.componentes.all(
            )) if prod.componentes.exists() else "N/A"

            ws.append([
                prod.nombre,
                prod.descripcion,
                prod.categoria.nombre if prod.categoria else "No especificado",
                prod.dependencia_usuaria.nombre if prod.dependencia_usuaria else "No especificado",
                prod.subdependencia_usuaria.nombre if prod.subdependencia_usuaria else "No especificado",
                components,
                urls
            ])


def _clean_sheet_name(name):
    """Limpia nombre para hoja Excel (max 31 chars, sin caracteres inválidos)"""
    invalid_chars = [':', '\\', '?', '/']
    for char in invalid_chars:
        name = name.replace(char, '')
    return name[:31]


def _apply_final_adjustments(wb):
    """Aplica ajustes de formato a todas las hojas"""
    for sheet in wb:
        # Autoajuste de columnas
        for col in sheet.columns:
            col_letter = get_column_letter(col[0].column)
            max_len = max(
                (len(str(cell.value)) if cell.value else 0 for cell in col),
                default=0
            )
            sheet.column_dimensions[col_letter].width = min(
                (max_len + 2) * 1.1, 40)

        # Congelar encabezados
        sheet.freeze_panes = "A2"
