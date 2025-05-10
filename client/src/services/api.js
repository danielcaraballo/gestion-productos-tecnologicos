import CONFIG from "../assets/js/config.js";

// Función para obtener los estatus desde la API
export const fetchStatusOptions = async () => {
  try {
    const response = await axios.get(
      `${CONFIG.API_BASE_URL}/productos/producto-estatus/`
    );
    return response.data; // Devuelve los datos de la API (array de objetos {id, nombre})
  } catch (error) {
    console.error("Error al cargar los estatus:", error);
    throw error; // Lanza el error para que sea manejado en el código que la llame
  }
};

// Función para agregar un producto (POST)
export const addProduct = async (newProduct) => {
  try {
    const response = await axios.post(
      `${CONFIG.API_BASE_URL}/productos/productos/`,
      newProduct
    );
    return response.data; // Devuelve la respuesta del servidor
  } catch (error) {
    console.error("Error al agregar producto:", error);
    throw error; // Lanza el error para manejarlo
  }
};
