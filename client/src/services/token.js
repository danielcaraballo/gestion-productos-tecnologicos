// token.js Gestiona las operaciones específicas del token de autenticación

// Función para guardar el token en localStorage
export function setToken(token) {
  if (token) {
    localStorage.setItem('authToken', token);
  } else {
    console.error('Token no proporcionado para guardar.');
  }
}

// Función para obtener el token de localStorage
export function getToken() {
  return localStorage.getItem('authToken');
}

// Función para eliminar el token de localStorage
export function removeToken() {
  localStorage.removeItem('authToken');
}

// Función para verificar si el usuario está autenticado
export function isAuthenticated() {
  const token = getToken();
  // Puedes añadir más validaciones del token aquí, como verificar su estructura
  return token && !isTokenExpired(token);
}

// Función para verificar si el token ha expirado
function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));  // Decodificar el payload del token
    const currentTime = Date.now() / 1000;  // Obtener el tiempo actual en segundos
    return payload.exp < currentTime;  // Comparar el tiempo de expiración con el actual
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return true;  // Si hay algún error, asumir que el token es inválido
  }
}

// Función para configurar el token en los encabezados por defecto de Axios
export function setAxiosDefaults() {
  const token = getToken();
  if (token && !isTokenExpired(token)) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    console.warn('No se pudo establecer el encabezado de autorización. Token inválido o expirado.');
  }
}
