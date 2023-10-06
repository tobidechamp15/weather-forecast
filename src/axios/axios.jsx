import axios from "axios";

const apiKey = "3e300be3558d50948cd69d2514d50a1a";
const axiosInstance = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/weather?",
});
axiosInstance.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    appid: apiKey,
    // units: "metric",
  };
  return config;
});

export default axiosInstance;
