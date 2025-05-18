import CONFIG from "./config.js";

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (event) => {
    const target = event.target.closest(".open-modal");

    if (target) {
      const productId = target.getAttribute("data-product-id");

      // Obtener los elementos del modal
      const modalTitle = document.querySelector("#modal-simple .modal-title");
      const modalDescription = document.querySelector("#modal-description");
      const modalReleaseDate = document.querySelector("#modal-release-date");
      const modalCategory = document.querySelector("#modal-category");
      const modalRequester = document.querySelector("#modal-requester");
      const modalStatus = document.querySelector("#modal-status");
      const modalTechnologies = document.querySelector("#modal-technologies");
      const modalResponsiblesList = document.querySelector(
        "#modal-responsibles-list"
      );
      const modalUrlButton = document.querySelector("#modal-url-button");

      if (!modalTitle) {
        console.error("No se encontraron los elementos del modal.");
        return;
      }

      axios
        .get(`${CONFIG.API_BASE_URL}/portafolio/productos/${productId}/detail/`)
        .then((response) => {
          const productData = response.data;

          // Llenar el modal con los datos del producto
          modalTitle.textContent = productData.nombre || "No disponible";
          modalDescription.textContent =
            productData.descripcion || "No disponible";
          modalReleaseDate.textContent =
            productData.fecha_lanzamiento || "No disponible";
          modalCategory.textContent =
            productData.categoria?.nombre || "No disponible";

          // Formato del solicitante
          const requesterName =
            productData.solicitante?.nombre || "Solicitante no asignado";
          const requesterLastName = productData.solicitante?.apellido || "";
          const requesterDepartment =
            productData.solicitante?.dependencia?.nombre ||
            "Dependencia no asignada";
          modalRequester.textContent = `${requesterName} ${requesterLastName} - ${requesterDepartment}`;

          // Estatus con verificación y clase
          const statusName = productData.estatus?.nombre || "Desconocido";
          const statusClass = getStatusClass(statusName);
          modalStatus.innerHTML = `
            <span class="tag">
              <span class="${statusClass}"></span>${statusName}
            </span>
          `;

          // Función para obtener la clase del estatus
          function getStatusClass(status) {
            switch (status) {
              case "Operativo":
                return "badge bg-green text-green-fg tag-status badge-empty";
              case "Mantenimiento":
                return "badge bg-azure text-azure-fg tag-status badge-empty";
              case "Inactivo":
                return "badge bg-red text-red-fg tag-status badge-empty";
              case "Retirado":
                return "badge bg-blue text-blue-fg tag-status badge-empty";
              default:
                return "badge bg-blue text-blue-fg tag-status badge-empty";
            }
          }

          // Tecnologías
          if (
            Array.isArray(productData.tecnologias) &&
            productData.tecnologias.length > 0
          ) {
            const tecnologiaTags = productData.tecnologias
              .map(
                (tecnologia) => `<span class="tag">${tecnologia.nombre}</span>`
              )
              .join("");
            modalTechnologies.innerHTML = tecnologiaTags;
          } else {
            modalTechnologies.innerHTML =
              '<span class="tag">No disponible</span>';
          }

          // Limpiar la lista de responsables
          modalResponsiblesList.innerHTML = "";

          // Responsables con valor por defecto
          if (
            Array.isArray(productData.responsables) &&
            productData.responsables.length > 0
          ) {
            productData.responsables.forEach((responsable) => {
              const listItem = document.createElement("li");
              const nombre = responsable.nombre || "";
              const apellido = responsable.apellido || "";
              const rol = responsable.rol || "Rol no asignado";
              listItem.textContent = `${nombre} ${apellido} - ${rol}`;
              modalResponsiblesList.appendChild(listItem);
            });
          } else {
            const listItem = document.createElement("li");
            listItem.textContent = "No hay responsables asignados";
            modalResponsiblesList.appendChild(listItem);
          }

          // URL del botón con valor por defecto
          modalUrlButton.href = productData.direccion_url || "#";
          if (!productData.direccion_url) {
            modalUrlButton.classList.add("disabled");
            modalUrlButton.textContent = "URL no disponible";
          } else {
            modalUrlButton.classList.remove("disabled");
            modalUrlButton.textContent = "Visitar sitio";
          }
        })
        .catch((error) => {
          console.error("Error al obtener los detalles del producto:", error);
        });
    }
  });
});
