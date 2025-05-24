import CONFIG from "./config.js";

document.addEventListener("DOMContentLoaded", () => {
  const btnGenerarReporte = document.getElementById("btn-generar-reporte");

  if (btnGenerarReporte) {
    btnGenerarReporte.addEventListener("click", generarReporteExcel);
  }
});

async function generarReporteExcel() {
  const btn = this;
  try {
    // Deshabilitar botón y mostrar feedback
    btn.disabled = true;
    btn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Generando...';

    // 2. Llamar al endpoint usando Axios
    const response = await axios({
      method: "GET",
      url: `${CONFIG.API_BASE_URL}/reportes/general/excel/`,
      responseType: "blob",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': 'Bearer tu_token' // Si tu API requiere autenticación
      },
    });

    // Descarga del archivo
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement("a");
    a.href = url;
    a.download = `reporte_general_${
      new Date().toISOString().split("T")[0]
    }.xlsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    // Notificación de éxito
    mostrarNotificacion("Reporte generado con éxito", "success");
  } catch (error) {
    console.error("Error generando reporte:", error);

    // Manejo de errores según el tipo
    const mensaje =
      error.response?.data?.message ||
      error.message ||
      "Error al generar el reporte";

    mostrarNotificacion(mensaje, "error");
  } finally {
    // 5. Restaurar botón
    btn.disabled = false;
    btn.innerHTML = "Generar Reporte";
  }
}

// Función auxiliar para notificaciones
function mostrarNotificacion(mensaje, tipo = "success") {
  if (typeof Swal !== "undefined") {
    Swal.fire({
      icon: tipo,
      title: mensaje,
      timer: 5000,
    });
  } else {
    alert(mensaje);
  }
}
