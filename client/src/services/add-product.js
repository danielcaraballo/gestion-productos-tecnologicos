// import { fetchStatusOptions, addProduct } from "./api.js";
import { displayError } from "./alert.js";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-add-product");
  let currentStep = 1;

  // Función para mostrar el paso actual
  const showStep = (step) => {
    document.querySelectorAll(".step").forEach((stepDiv) => {
      stepDiv.style.display = "none"; // Ocultar todos los pasos
    });
    document.getElementById(`step-${step}`).style.display = "block"; // Mostrar solo el paso actual

    // Ocultar botones del paso anterior
    if (step === 1) {
      document.getElementById("prevStep2").style.display = "none";
      document.getElementById("prevStep3").style.display = "none";
    } else if (step === 2) {
      document.getElementById("prevStep2").style.display = "block";
      document.getElementById("prevStep3").style.display = "none";
    } else if (step === 3) {
      document.getElementById("prevStep3").style.display = "block";
    }
  };

  const initializeForm = () => {
    showStep(currentStep);
    document.getElementById("prevStep2").style.display = "none";
    document.getElementById("prevStep3").style.display = "none";
  };

  initializeForm(); // Llama a la función de inicialización aquí

  // Validaciones del primer paso
  const validateStep1 = () => {
    const nombre = document.getElementById("nombre").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();
    const url = document.getElementById("url").value.trim();
    const fechaLanzamiento = document.getElementById("fecha_lanzamiento").value;

    const errors = [];
    if (!nombre) errors.push("El nombre es obligatorio.");
    if (!descripcion) errors.push("La descripción es obligatoria.");
    if (!url) errors.push("La dirección URL es obligatoria.");
    if (!fechaLanzamiento)
      errors.push("La fecha de lanzamiento es obligatoria.");

    if (errors.length) {
      displayError(errors.join(" ")); // Mostrar todos los errores
      return { valid: false, errors };
    }
    return {
      valid: true,
      data: { nombre, descripcion, url, fecha_lanzamiento: fechaLanzamiento },
    };
  };

  // Manejar eventos de botones
  document.getElementById("nextStep1").addEventListener("click", function () {
    console.log("Botón Siguiente clickeado");
    const validationResult = validateStep1();
    if (validationResult.valid) {
      currentStep = 2; // Cambiar al siguiente paso
      showStep(currentStep); // Mostrar el paso 2
    }
  });

  // Resto de eventos para manejar pasos adicionales
  document.getElementById("nextStep2").addEventListener("click", function () {
    currentStep = 3;
    showStep(currentStep);
  });

  document.getElementById("prevStep2").addEventListener("click", function () {
    currentStep = 1;
    showStep(currentStep);
  });

  document.getElementById("prevStep3").addEventListener("click", function () {
    currentStep = 2;
    showStep(currentStep);
  });

  // Mostrar el primer paso al cargar el modal
  showStep(currentStep = 2);
});

// Cargar los estatus desde la API
// const loadStatusOptions = async () => {
//   try {
//     const estatusSelect = document.getElementById("estatus");
//     displayError("Cargando opciones...");

//     const statusOptions = await fetchStatusOptions();
//     estatusSelect.innerHTML = "";
//     statusOptions.forEach((status) => {
//       const option = document.createElement("option");
//       option.value = status.id;
//       option.textContent = status.nombre;
//       estatusSelect.appendChild(option);
//     });
//   } catch (error) {
//     console.error("Error al cargar los estatus:", error); // Log para depuración
//     displayError("Error al cargar los estatus. Intenta de nuevo.");
// }
// };

// loadStatusOptions(); // Llamada para cargar los estatus al iniciar
