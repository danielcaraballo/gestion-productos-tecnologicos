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
        .get(`${CONFIG.API_BASE_URL}/productos/productos/${productId}/detail/`)
        .then((response) => {
          const productData = response.data;
          console.log(response.data); // Inspecciona la estructura de los datos

          // Llenar el modal con los datos del producto
          modalTitle.textContent = productData.nombre;
          modalDescription.textContent = productData.descripcion;
          modalReleaseDate.textContent = productData.fecha_lanzamiento;
          modalCategory.textContent = productData.categoria.nombre;

          // Formato del solicitante
          const requesterName =
            productData.solicitante.nombre || "Solicitante no asignado";
          const requesterLastName = productData.solicitante.apellido || "";
          const requesterDepartment =
            productData.solicitante.dependencia.nombre ||
            "Dependencia no asignada";
          modalRequester.textContent = `${requesterName} ${requesterLastName} - ${requesterDepartment}`;

          // Obtener la clase para el estatus
          const statusClass = getStatusClass(productData.estatus.nombre);
          modalStatus.innerHTML = `
            <span class="tag">
              <span class="${statusClass}"></span>${productData.estatus.nombre}
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

          // modalTechnologies.textContent = productData.tecnologias
          //   .map((t) => t.nombre)
          //   .join(", ");

          // Obtener los tags de las tecnologías
          const tecnologiaTags = productData.tecnologias
            .map(
              (tecnologia) => `
              <span class="tag">${tecnologia.nombre}</span>`
            )
            .join("");

          // Insertar los tags de tecnologías en el modal
          modalTechnologies.innerHTML = tecnologiaTags;

          // Limpiar la lista de responsables antes de agregar nuevos elementos
          modalResponsiblesList.innerHTML = "";

          // Manejar la relación con responsables desde la tabla intermedia
          if (
            Array.isArray(productData.responsables) &&
            productData.responsables.length > 0
          ) {
            productData.responsables.forEach((responsable) => {
              const listItem = document.createElement("li");
              listItem.textContent = `${responsable.nombre} ${responsable.apellido} - ${responsable.rol}`;
              modalResponsiblesList.appendChild(listItem);
            });
          } else {
            const listItem = document.createElement("li");
            listItem.textContent = "No responsables asignados";
            modalResponsiblesList.appendChild(listItem);
          }

          // Configurar el enlace del botón
          modalUrlButton.href = productData.direccion_url;
        })
        .catch((error) => {
          console.error("Error al obtener los detalles del producto:", error);
        });
    }
  });
});
