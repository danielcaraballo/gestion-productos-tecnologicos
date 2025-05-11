import CONFIG from "./config.js";

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(`${CONFIG.API_BASE_URL}/portafolio/producto-estatus-count/`)
    .then((response) => {
      const data = response.data;

      // Verifica que los elementos existan antes de acceder a ellos
      const contadorOperativos = document.getElementById("contador-operativos");
      const contadorMantenimiento = document.getElementById(
        "contador-mantenimiento"
      );
      const contadorInactivos = document.getElementById("contador-inactivos");
      const contadorRetirados = document.getElementById("contador-retirados");

      if (contadorOperativos) {
        contadorOperativos.textContent = `${data.operativo} Productos`;
      }
      if (contadorMantenimiento) {
        contadorMantenimiento.textContent = `${data.mantenimiento} Productos`;
      }
      if (contadorInactivos) {
        contadorInactivos.textContent = `${data.inactivo} Productos`;
      }
      if (contadorRetirados) {
        contadorRetirados.textContent = `${data.retirado} Productos`;
      }
    })
    .catch((error) => {
      console.error(
        "Error al obtener los datos de estatus de productos:",
        error
      );
    });
});
