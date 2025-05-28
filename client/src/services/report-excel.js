import CONFIG from "./config.js";

document.addEventListener("DOMContentLoaded", () => {
  const btnGenerarReporte = document.getElementById("btn-generar-reporte");

  if (btnGenerarReporte) {
    btnGenerarReporte.addEventListener("click", function (e) {
      e.preventDefault(); // Prevenir el comportamiento por defecto del enlace
      generarReporteExcel.call(this); // Pasar el contexto correcto (this)
    });
  }
});

async function generarReporteExcel() {
  const btn = this;
  try {
    // Deshabilitar botón y mostrar feedback
    btn.disabled = true;
    const originalHTML = btn.innerHTML; // Guardar el contenido original
    btn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-loader-2 animate-spin">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 3a9 9 0 1 0 9 9" />
      </svg>
      Generando Reporte
    `;

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
    btn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-report">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M8 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h5.697" />
        <path d="M18 14v4h4" />
        <path d="M18 11v-4a2 2 0 0 0 -2 -2h-2" />
        <path d="M8 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
        <path d="M18 18m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
        <path d="M8 11h4" />
        <path d="M8 15h3" />
      </svg>
      Generar Reporte
    `;
  }
}

// Función auxiliar para notificaciones
function mostrarNotificacion(mensaje, tipo = "success") {
  if (typeof Swal !== "undefined") {
    Swal.fire({
      icon: tipo,
      title: mensaje,
      showConfirmButton: false,
      timer: 5000,
      toast: true,
      position: "top-start",
    });
  } else {
    alert(mensaje);
  }
}
