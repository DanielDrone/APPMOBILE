import React from 'react';

const WeatherCard = ({ data }) => {
  if (!data || !data.main) return null;

  const { name, main, weather, wind, sys } = data;
  const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;

  return (
    <div className="w-full max-w-md bg-white/20 backdrop-blur-lg rounded-3xl p-8 text-white shadow-2xl border border-white/10 relative overflow-hidden">
      {/* Decorative circle */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="text-center mb-4">
          <h2 className="text-4xl font-bold tracking-wide drop-shadow-md">{name}, {sys.country}</h2>
          <p className="text-lg opacity-90 capitalize mt-1">{weather[0].description}</p>
        </div>

        <div className="flex flex-col items-center mb-6">
          <img src={iconUrl} alt={weather[0].description} className="w-32 h-32 drop-shadow-lg" />
          <h1 className="text-7xl font-bold drop-shadow-lg">{Math.round(main.temp)}°</h1>
        </div>

        <div className="w-full grid grid-cols-2 gap-4 mt-4">
          <div className="bg-white/10 rounded-xl p-3 text-center backdrop-blur-sm hover:bg-white/20 transition">
            <p className="text-xs uppercase tracking-wider opacity-70">Sensación</p>
            <p className="text-xl font-semibold">{Math.round(main.feels_like)}°</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-center backdrop-blur-sm hover:bg-white/20 transition">
            <p className="text-xs uppercase tracking-wider opacity-70">Humedad</p>
            <p className="text-xl font-semibold">{main.humidity}%</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-center backdrop-blur-sm hover:bg-white/20 transition">
            <p className="text-xs uppercase tracking-wider opacity-70">Viento</p>
            <p className="text-xl font-semibold">{wind.speed} m/s</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-center backdrop-blur-sm hover:bg-white/20 transition">
            <p className="text-xs uppercase tracking-wider opacity-70">Presión</p>
            <p className="text-xl font-semibold">{main.pressure} hPa</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;