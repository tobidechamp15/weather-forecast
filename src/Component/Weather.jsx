import React, { useState, useEffect } from "react";
import axiosInstance from "../axios/axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const handleCity = (e) => {
    setCity(e.target.value);
  };
  useEffect(() => {
    // Make a weather API request using the Axios instance
    if (city.trim() === "") {
      return;
    }
    axiosInstance
      .get("weather", {
        params: {
          q: city, // Replace with the desired city name
        },
      })
      .then((response) => {
        // Handle the response data
        console.log(response.data);
        const temperatureCelsius = response.data.main.temp - 273.15;

        setWeatherData({
          ...response.data,
          main: {
            ...response.data.main,
            temp: temperatureCelsius,
          },
        });
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, [city]);
  return (
    <div>
      <h2>Weather Information</h2>
      <input type="text" onChange={handleCity} value={city} />
      {weatherData && (
        <div>
          <p>City: {weatherData.name}</p>
          <p>Temperature: {weatherData.main.temp.toFixed(2)}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          {/* Add more weather information here */}
        </div>
      )}
    </div>
  );
};

export default Weather;
