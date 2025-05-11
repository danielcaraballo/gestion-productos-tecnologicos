import CONFIG from "./config.js";

axios
  .get(`${CONFIG.API_BASE_URL}/portafolio/productos-dependencias-count/`)
  .then((response) => {
    const dependencias = response.data;
    const tbody = document.getElementById("dependencias-tbody");

    dependencias.forEach((dependencia) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
                <td>${dependencia.nombre}</td>
                <td style="text-align: center;">${dependencia.total_productos.toLocaleString()}</td>
            `;

      tbody.appendChild(tr);
    });
  })
  .catch((error) => console.error("Error:", error));
