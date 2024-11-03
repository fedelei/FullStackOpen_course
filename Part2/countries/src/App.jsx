import React, { useState, useEffect } from "react";
import countriesServices from "./services/countriesServices";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  // Cargar todos los países al montar el componente
  useEffect(() => {
    countriesServices
      .getAll()
      .then(response => setCountries(response.data))
      .catch(error => console.error("Error fetching countries:", error));
  }, []);

  // Filtrar países en función de la búsqueda
  useEffect(() => {
    if (search.trim()) {
      const matchingCountries = countries.filter(country =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredCountries(matchingCountries);
      setSelectedCountry(null); // Resetear el país seleccionado al cambiar la búsqueda
    } else {
      setFilteredCountries([]);
    }
  }, [search, countries]);

  // Solicitar el clima cuando se selecciona un país
  useEffect(() => {
    if (selectedCountry && selectedCountry.capital) {
      const capital = selectedCountry.capital[0]; // Usar la primera ciudad capital si hay varias
      console.log(`Selected country: ${selectedCountry.name.common}, capital: ${capital}`); // Confirmar país seleccionado
  
      countriesServices
        .getWeatherByCityName(capital)
        .then(response => {
          console.log("Weather response:", response.data); // Ver el contenido de la respuesta
          setWeather(response.data);
        })
        .catch(error => {
          console.error("Error fetching weather:", error);
          setWeather(null);
        });
    }
  }, [selectedCountry]);
  

  const handleSearchChange = (event) => setSearch(event.target.value);
  const handleShowCountry = (country) => setSelectedCountry(country);

  return (
    <div>
      <h2>Country Search</h2>
      <input
        type="text"
        placeholder="Enter country name"
        value={search}
        onChange={handleSearchChange}
      />

      {filteredCountries.length > 10 ? (
        <p>Too many matches, please specify another filter.</p>
      ) : filteredCountries.length > 1 ? (
        filteredCountries.map(country => (
          <div key={country.cca3}>
            {country.name.common}{" "}
            <button onClick={() => handleShowCountry(country)}>show</button>
          </div>
        ))
      ) : filteredCountries.length === 1 ? (
        <CountryDetails country={filteredCountries[0]} weather={weather} />
      ) : (
        search && <p>No country found with the name: {search}</p>
      )}

      {/* Mostrar los detalles del país seleccionado */}
      {selectedCountry && filteredCountries.length > 1 && (
        <CountryDetails country={selectedCountry} weather={weather} />
      )}
    </div>
  );
};

// Componente para mostrar detalles de un país
const CountryDetails = ({ country, weather }) => (
  <div>
    <h3>{country.name.common}</h3>
    <p><strong>Capital:</strong> {country.capital ? country.capital[0] : "N/A"}</p>
    <p><strong>Area:</strong> {country.area} km²</p>
    <p><strong>Languages:</strong> {Object.values(country.languages).join(", ")}</p>
    <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" />
    
    {weather && (
      <div>
        <h4>Weather in {country.capital[0]}</h4>
        <p><strong>Temperature:</strong> {weather.main.temp} °C</p>
        <p><strong>Weather:</strong> {weather.weather[0].description}</p>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
        />
        <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
      </div>
    )}
  </div>
);

export default App;
