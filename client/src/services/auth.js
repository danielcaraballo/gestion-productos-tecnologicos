// auth.js Maneja la autenticación general del usuario

import CONFIG from "./config.js";

// token.js contiene funciones para gestionar el token de autenticación
import { getToken, isAuthenticated, removeToken } from "./token.js";

// Función para inicializar la página al cargar
function initPage() {
  // Verificar si el usuario está autenticado
  if (!isAuthenticated()) {
    redirectToSignIn();
  } else {
    // console.log('Usuario autenticado');
    // Cargar datos protegidos de la API si es necesario
    fetchProtectedData();
  }
}

// Función para redirigir al usuario a la página de inicio de sesión
function redirectToSignIn() {
  window.location.href = "../pages/sign-in.html";
}

// Función para obtener datos protegidos de la API
function fetchProtectedData() {
  axios
    .get(`${CONFIG.API_BASE_URL}/portafolio/`, {
      headers: {
        Authorization: `Bearer ${getToken()}`, // Incluir el token en el encabezado
      },
    })
    .then((response) => {
      // console.log('Datos protegidos:', response.data);
      // Procesar los datos y actualizar la página si es necesario
      updatePageWithData(response.data);
    })
    .catch((error) => {
      // console.error('Error al acceder a los datos protegidos:', error);
      handleAuthError(error);
    });
}

// Función para manejar errores de autenticación
function handleAuthError(error) {
  // Si el token es inválido o ha expirado, eliminarlo y redirigir al inicio de sesión
  removeToken();
  redirectToSignIn();
}

// Función para actualizar la página con datos protegidos
function updatePageWithData(data) {
  // Aquí puedes implementar la lógica para mostrar los datos en la página
  // console.log('Actualizando la página con datos:', data);
}

// Función para manejar el cierre de sesión
function setupSignOutButton() {
  const signoutButton = document.getElementById("signout-button");
  // console.log('Botón de cerrar sesión encontrado:', signoutButton);

  if (signoutButton) {
    signoutButton.addEventListener("click", (event) => {
      event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
      console.log("Cierre de sesión...");
      removeToken();
      redirectToSignIn();
    });
  } else {
    console.error(
      "No se encontró el botón de cierre de sesión. Verifica el ID."
    );
  }
}

// Inicializar la lógica de la página cuando se carga
document.addEventListener("DOMContentLoaded", () => {
  initPage();
  setupSignOutButton();
});

function UserProfile() {
  if (isAuthenticated()) {
    // Verifica si el token es válido y no ha expirado
    axios
      .get(`${CONFIG.API_BASE_URL}/usuarios/profile-data/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`, // Usa el token válido
        },
      })
      .then((response) => {
        // Imprime los datos para depuración
        // console.log('Profile data:', response.data);
        const profileData = response.data;

        // Concatenar nombre y apellido, con valores por defecto
        const firstName = profileData.first_name || "Usuario";
        const lastName = profileData.last_name || "";
        const fullName = `${firstName} ${lastName}`;

        document.getElementById("full-name").textContent = fullName; // Muestra el nombre completo

        // Mostrar grupo de usuario, con valor por defecto
        const userGroup = profileData.groups || "Usuario estándar";
        document.getElementById("user-group").textContent = userGroup;
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized, redirecting to login");
          // Aquí puedes redirigir al usuario al login si no está autorizado
        }
      });
  } else {
    console.error("Token no válido o expirado");
    // Redirige al usuario al login si el token no es válido o ha expirado
  }
}

UserProfile();
