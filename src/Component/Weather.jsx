import React, { useState, useEffect } from "react";
import axiosInstance from "../axios/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

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
      .get("/cweteather", {
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
  const [isRotated, setIsRotated] = useState(false);
  const handleDropRotate = () => {
    setIsRotated(!isRotated);
  };
  const iconClass = isRotated ? { rotation: "90" } : {};
  return (
    <div className="h-screen bg-yellow-400 p-3 ">
      <div
        className="flex gap-2 items-center p-2 hover:animate-bunce cursor-pointer antialiased bg-slate-100 hover:shadow-xl hover:translate-x-2 ease-in-out duration-500 rounded-2xl w-fit px-4"
        onClick={handleDropRotate}
      >
        <FontAwesomeIcon icon={faLocationDot} />
        <h2 className="text-xl ">Weather Information</h2>
        <FontAwesomeIcon
          icon={faChevronRight}
          className="icon"
          {...iconClass}
        />
      </div>
      <input
        type="text"
        onChange={handleCity}
        value={city}
        placeholder="Enter city name"
        className="form-control w-2/3 m-3 ms-0 shadow-2xl"
      />
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
