import React, { useEffect, useState } from 'react';
import { WeatherIcons } from './assets/assets';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';

const App = () => {
  const [city, setCity] = useState('Baku');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const tele = window.Telegram.WebApp

  // const API_KEY = import.meta.env.VITE_API_KEY;

  const API_KEY = 'Your Api key'

  const iconMap = {
    '01d': WeatherIcons.ClearDayIcon,
    '01n': WeatherIcons.ClearNightIcon,
    '02d': WeatherIcons.FewCloudsDayIcon,
    '02n': WeatherIcons.FewCloudsNightIcon,
    '03d': WeatherIcons.ScatteredCloudsIcon,
    '03n': WeatherIcons.ScatteredCloudsIcon,
    '04d': WeatherIcons.BrokenCloudsIcon,
    '04n': WeatherIcons.BrokenCloudsIcon,
    '09d': WeatherIcons.ShowerRainIcon,
    '09n': WeatherIcons.ShowerRainIcon,
    '10d': WeatherIcons.RainDayIcon,
    '10n': WeatherIcons.RainNightIcon,
    '11d': WeatherIcons.ThunderstormIcon,
    '11n': WeatherIcons.ThunderstormIcon,
    '13d': WeatherIcons.SnowIcon,
    '13n': WeatherIcons.SnowIcon,
    '50d': WeatherIcons.MistIcon,
    '50n': WeatherIcons.MistIcon,
  };

  const fetchWeather = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData({
        city: data.name,
        icon: iconMap[data.weather[0].icon] || WeatherIcons.NoResultIcon,
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
      });
      setError(null);
    } catch {
      setWeatherData(null);
      setError('Failed to fetch weather data');
    }
  };

  const searchWeather = () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&q=${city}&units=metric`;
    fetchWeather(url);
  };

  const getLocationWeather = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&lat=${coords.latitude}&lon=${coords.longitude}&units=metric`;
        fetchWeather(url);
      },
      () => setError('Failed to fetch location data')
    );
  };

  useEffect(() => {
    getLocationWeather();
    tele.ready();
  }, []);

  return (
    <div className="max-w-md mx-auto bg-gray-800 text-white p-6 rounded-xl shadow-md">
      <SearchBar value={city} onChange={setCity} onSearch={searchWeather} onLocate={getLocationWeather} />
      {weatherData ? <WeatherDisplay {...weatherData} /> : <p className="text-center text-red-400">{error}</p>}
    </div>
  );
};

export default App;
