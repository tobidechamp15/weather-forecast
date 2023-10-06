import React, { useState, useEffect } from "react";

const apiKey = "3e300be3558d50948cd69d2514d50a1a";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

function WeatherApp() {
  const [weatherData, setWeatherData] = useState(null);
  const [cityInput, setCityInput] = useState("");
  const [error, setError] = useState("");

  const handleSearch = () => {
    fetch(apiUrl + cityInput + `&appid=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("lastCity", JSON.stringify(data));
        setWeatherData(data);
      })
      .catch((error) => {
        setError("City not found");
        setWeatherData(null);
      });
  };

  useEffect(() => {
    const lastCityData = localStorage.getItem("lastCity");
    if (lastCityData) {
      const lastCityWeather = JSON.parse(lastCityData);
      setWeatherData(lastCityWeather);
    }
  }, []);

  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        value={cityInput}
        onChange={(e) => setCityInput(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={handleSearch}>Search</button>

      {weatherData && (
        <div>
          <h2 className="city">{weatherData.name}</h2>
          <p className="temp">{Math.round(weatherData.main.temp)}°C</p>
          <p className="humidity">{weatherData.main.humidity}% humidity</p>
          <p className="wind">{weatherData.wind.speed}km/h wind speed</p>
          {/* Add your weather icons here */}
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default WeatherApp;
