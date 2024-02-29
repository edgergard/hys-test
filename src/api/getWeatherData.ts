import axios from 'axios';

const openweatherApiKey = '101c1c8cd72fb8827bba87bfb0bd9c99';

export const getWeatherData = async (
  lon: number,
  lat: number,
  units: string,
) => {
  const weatherData = await axios.get(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=${units}&appid=${openweatherApiKey}`,
  );

  return weatherData;
};
