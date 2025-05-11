import CONFIG from "./config.js";
import "./detail-product-services.js";

let currentPage = 1; // Página inicial
const productsPerPage = 10; // Número de productos por página
let totalPages = 0; // Número total de páginas
let allProducts = []; // Todos los productos cargados

document.addEventListener("DOMContentLoaded", function () {
  fetchProducts();
});

// Función para obtener los productos desde la API
function fetchProducts() {
  axios
    .get(`${CONFIG.API_BASE_URL}/portafolio/productos/`)
    .then((response) => {
      allProducts = response.data;
      if (allProducts.length > 0) {
        totalPages = Math.ceil(allProducts.length / productsPerPage);
        populateTable();
        updatePaginationNumbers(); // Separa el control de números
        updatePaginationButtons(); // Separa el control de botones
      } else {
        showEmptyMessage();
      }
    })
    .catch((error) => {
      console.error("Error al cargar los productos:", error);
      showErrorMessage();
    });
}

// Mostrar mensaje si no hay productos
function showEmptyMessage() {
  const tableBody = document.querySelector(".table-tbody");
  tableBody.innerHTML =
    '<tr><td colspan="5">No hay productos disponibles.</td></tr>';
}

// Mostrar mensaje de error en la UI
function showErrorMessage() {
  const tableBody = document.querySelector(".table-tbody");
  tableBody.innerHTML =
    '<tr><td colspan="5">Error al cargar los productos. Inténtalo de nuevo más tarde.</td></tr>';
}

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

function generateRowHTML(product) {
  const tecnologiaTags = product.tecnologias
    .map(
      (tecnologia) => `
        <span class="tag">${tecnologia.nombre}</span>`
    )
    .join("");

  const statusClass = getStatusClass(product.estatus.nombre);

  return `
      <tr>
        <td class="sort-nombre">
          <a class="open-modal" data-bs-toggle="modal" data-bs-target="#modal-simple" data-product-id="${product.id}" style="cursor: pointer;"> <strong>${product.nombre}</strong>
          </a>
        </td>
        <td class="sort-categoria">${product.categoria.nombre}</td>
        <td class="sort-tecnologias">
            <div class="tags-list">${tecnologiaTags}</div>
        </td>
        <td class="sort-estatus">
            <span class="tag">
                <span class="${statusClass}"></span>${product.estatus.nombre}
            </span>
        </td>
        <td><a href="${product.direccion_url}" target="_blank">${product.direccion_url}</a></td>
      </tr>
    `;
}

// Función para popular la tabla en función de la página actual
function populateTable() {
  const tableBody = document.querySelector(".table-tbody");
  tableBody.innerHTML = ""; // Limpiar la tabla

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = Math.min(startIndex + productsPerPage, allProducts.length);
  const currentProducts = allProducts.slice(startIndex, endIndex);

  const fragment = document.createDocumentFragment();
  currentProducts.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = generateRowHTML(product);
    fragment.appendChild(row);
  });

  tableBody.appendChild(fragment);

  // Actualizar el rango de productos mostrados
  document.getElementById("start-entry").textContent = startIndex + 1;
  document.getElementById("end-entry").textContent = endIndex;
  document.getElementById("total-entries").textContent = allProducts.length;
}

// Función para actualizar los controles de botones de paginación
function updatePaginationButtons() {
  // Desactivar el botón "Anterior" si estamos en la primera página
  document
    .getElementById("prev-page")
    .classList.toggle("disabled", currentPage === 1);
  // Desactivar el botón "Siguiente" si estamos en la última página
  document
    .getElementById("next-page")
    .classList.toggle("disabled", currentPage === totalPages);
}

// Función para actualizar los números de paginación
function updatePaginationNumbers() {
  const paginationContainer = document.querySelector(".pagination-numbers");
  paginationContainer.innerHTML = ""; // Limpiar los números de página previos

  // Crear botones de paginación según el número total de páginas
  for (let i = 1; i <= totalPages; i++) {
    const pageItem = document.createElement("li");
    pageItem.classList.add("page-item");

    if (i === currentPage) {
      pageItem.classList.add("active"); // Resaltar la página actual
    }

    const pageLink = document.createElement("a");
    pageLink.classList.add("page-link");
    pageLink.href = "#";
    pageLink.textContent = i;

    // Añadir un evento al hacer clic en cada número de página
    pageLink.addEventListener("click", function (event) {
      event.preventDefault();
      currentPage = i;
      populateTable(); // Llenar la tabla con los datos de la página seleccionada
      updatePaginationButtons(); // Actualizar estado de los botones de paginación
      updatePaginationNumbers(); // Actualizar números de paginación
    });

    // Agregar el enlace a la lista de paginación
    pageItem.appendChild(pageLink);
    paginationContainer.appendChild(pageItem);
  }
}

// Manejadores de eventos para los botones "Anterior" y "Siguiente"
document
  .getElementById("prev-page")
  .addEventListener("click", function (event) {
    event.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      populateTable();
      updatePaginationButtons();
      updatePaginationNumbers();
    }
  });

document
  .getElementById("next-page")
  .addEventListener("click", function (event) {
    event.preventDefault();
    if (currentPage < totalPages) {
      currentPage++;
      populateTable();
      updatePaginationButtons();
      updatePaginationNumbers();
    }
  });
