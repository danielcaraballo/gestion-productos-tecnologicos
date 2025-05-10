import CONFIG from "./config.js";

window.onload = function () {
  axios
    .get(`${CONFIG.API_BASE_URL}/productos/producto-estatus-count/`)
    .then((response) => {
      const data = response.data;

      // Total de productos
      const total =
        data.operativo + data.mantenimiento + data.inactivo + data.retirado;
      document.getElementById("total-productos").textContent = total;

      // Actualizar barras de progreso
      document.getElementById("barra-operativos").style.width = `${(
        (data.operativo / total) *
        100
      ).toFixed(2)}%`;
      document.getElementById("barra-mantenimiento").style.width = `${(
        (data.mantenimiento / total) *
        100
      ).toFixed(2)}%`;
      document.getElementById("barra-inactivos").style.width = `${(
        (data.inactivo / total) *
        100
      ).toFixed(2)}%`;
      document.getElementById("barra-retirados").style.width = `${(
        (data.retirado / total) *
        100
      ).toFixed(2)}%`;
    })
    .catch((error) => {
      console.error(
        "Error al obtener los datos de estatus de productos:",
        error
      );
    });
};
