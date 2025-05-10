import CONFIG from "./config.js";
import { setToken } from './token.js';
import { displayError } from './alert.js';

// Función para manejar el envío del formulario
function handleFormSubmit(event) {
  event.preventDefault();  // Evitar comportamiento por defecto del formulario

  const username = document.getElementById('username').value.trim();  // Obtener y limpiar el valor del nombre de usuario
  const password = document.getElementById('password').value.trim();  // Obtener y limpiar el valor de la contraseña

  if (!username || !password) {
    displayError('Por favor, complete todos los campos.');
    return;
  }

  // Hacer la petición POST para iniciar sesión
  loginUser(username, password);
}

// Función para iniciar sesión y manejar la respuesta
function loginUser(username, password) {
  axios.post(`${CONFIG.API_BASE_URL}/token/`, { username, password })
    .then(response => {
      const { access: token } = response.data;  // Desestructurar el token de la respuesta
      setToken(token);  // Guardar el token usando la función de token.js

      // Redirigir a una página protegida tras el inicio de sesión exitoso
      window.location.href = 'dashboard.html';
    })
    .catch(error => {
      console.error('Error en la autenticación:', error);
      displayError('Usuario o contraseña incorrectos');
    });
}

// Configurar el evento de envío del formulario
document.getElementById('form-signin').addEventListener('submit', handleFormSubmit);


// Ojito de ver contraseña
const togglePassword = document.querySelector('.link-secondary');
const passwordInput = document.querySelector('#password');
const eyeOpenIcon = document.querySelector('#eye-open');
const eyeClosedIcon = document.querySelector('#eye-closed');

// Añade el evento de click al ícono
togglePassword.addEventListener('click', function (e) {
    e.preventDefault(); // Evita que el enlace haga scroll a la parte superior de la página

    // Cambia el tipo del input entre 'password' y 'text'
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);

    // Alterna los íconos de ojo
    if (type === 'password') {
        eyeOpenIcon.style.display = 'block';
        eyeClosedIcon.style.display = 'none';
    } else {
        eyeOpenIcon.style.display = 'none';
        eyeClosedIcon.style.display = 'block';
    }
});
