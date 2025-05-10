// Función para mostrar mensajes de error en la interfaz

/**
 * Muestra un mensaje de error en una alerta.
 * @param {string} message - El mensaje de error a mostrar.
 */

function displayError(message) {
  const alertElement = document.getElementById('error-alert');
  const messageElement = document.getElementById('error-message');

  if (alertElement && messageElement) {
    messageElement.innerText = message;  // Insertar el mensaje en el contenedor de mensaje
    alertElement.classList.remove('hidden');  // Mostrar la alerta

    // Ocultar la alerta después de unos segundos (opcional)
    setTimeout(() => {
      alertElement.classList.add('hidden');
    }, 5000);  // 5 segundos
  } else {
    console.warn('Elemento de alerta o mensaje de error no encontrado.');
  }
}

// Exportar la función para que pueda ser utilizada en otros archivos
export { displayError };
