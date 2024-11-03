// src/services/countriesServices.jsx
import axios from "axios";

const api_key= import.meta.env.VITE_SOME_KEY

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = "YOUR_API_KEY"; // Asegúrate de reemplazar esto con tu propia API key

const getAll = () => axios.get(baseUrl);

const getWeatherByCityName = (cityName) => {
  console.log(`Fetching weather for city: ${cityName}`); // Verifica que esta línea se imprima en consola
  return axios.get(`${weatherUrl}`, {
    params: {
      q: cityName,
      appid: api_key,
      units: "metric" // Para obtener la temperatura en Celsius
    }
  });
};

export default { getAll, getWeatherByCityName };
