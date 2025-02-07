import React from 'react';
import StatBox from './StatBox';

const WeatherDisplay = ({ city, icon, temperature, description, humidity, windSpeed }) => (
  <div className="text-center">
    <h2 className="text-2xl font-semibold">{city}</h2>
    <img src={icon} alt="Weather icon" className="mx-auto h-24" />
    <p className="text-4xl font-bold">{temperature}°C</p>
    <p className="capitalize text-gray-300">{description}</p>
    <div className="mt-4 flex justify-center gap-6">
      <StatBox label="Humidity" value={`${humidity}%`} />
      <StatBox label="Wind" value={`${windSpeed} km/h`} />
    </div>
  </div>
);

export default WeatherDisplay;
