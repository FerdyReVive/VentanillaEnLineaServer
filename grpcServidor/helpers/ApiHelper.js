const axios = require('axios');

async function fetchDataFromServiciosNode() {
  try {
    const response = await axios.get('http://servicios-node:8080/api/method'); // Cambia la ruta según tu API
    return response.data;
  } catch (error) {
    console.error('Error al comunicarse con servicios-node:', error);
    throw error;
  }
}

module.exports = { fetchDataFromServiciosNode };
