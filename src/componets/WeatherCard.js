import React from 'react';

const WeatherCard = ({ data, darkMode }) => {
  if (!data || !data.main) return null;

  const { name, main, weather, wind, sys } = data;
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;

  return (
    <div className={`w-full max-w-md backdrop-blur-lg rounded-3xl p-8 shadow-2xl transition-all duration-300 relative overflow-hidden border ${darkMode
        ? 'bg-gray-900/40 border-gray-800 text-white shadow-black/50'
        : 'bg-white/40 border-white/50 text-gray-800 shadow-indigo-500/10'
      }`}>
      {/* Decorative circle */}
      <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full mix-blend-overlay filter blur-xl opacity-70 animate-pulse ${darkMode ? 'bg-indigo-500' : 'bg-yellow-400'
        }`}></div>
      <div className={`absolute -bottom-10 -left-10 w-32 h-32 rounded-full mix-blend-overlay filter blur-xl opacity-70 animate-pulse delay-1000 ${darkMode ? 'bg-blue-600' : 'bg-purple-400'
        }`}></div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="text-center mb-4">
          <h2 className={`text-4xl font-black tracking-tight drop-shadow-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{name}, {sys.country}</h2>
          <p className={`text-lg font-bold capitalize mt-1 ${darkMode ? 'text-blue-400' : 'text-indigo-600'}`}>{weather[0].description}</p>
        </div>

        <div className="flex flex-col items-center mb-6">
          <img src={iconUrl} alt={weather[0].description} className="w-32 h-32 drop-shadow-2xl transform hover:scale-110 transition-transform duration-500" />
          <h1 className={`text-8xl font-black drop-shadow-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>{Math.round(main.temp)}°</h1>
        </div>

        <div className="w-full grid grid-cols-2 gap-4 mt-4">
          <div className={`rounded-2xl p-4 text-center backdrop-blur-sm transition-all hover:scale-105 ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-white/60 border border-indigo-50 shadow-sm'
            }`}>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Sensación</p>
            <p className="text-2xl font-black">{Math.round(main.feels_like)}°</p>
          </div>
          <div className={`rounded-2xl p-4 text-center backdrop-blur-sm transition-all hover:scale-105 ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-white/60 border border-indigo-50 shadow-sm'
            }`}>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Humedad</p>
            <p className="text-2xl font-black">{main.humidity}%</p>
          </div>
          <div className={`rounded-2xl p-4 text-center backdrop-blur-sm transition-all hover:scale-105 ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-white/60 border border-indigo-50 shadow-sm'
            }`}>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Viento</p>
            <p className="text-2xl font-black">{wind.speed} <span className="text-xs">m/s</span></p>
          </div>
          <div className={`rounded-2xl p-4 text-center backdrop-blur-sm transition-all hover:scale-105 ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-white/60 border border-indigo-50 shadow-sm'
            }`}>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Presión</p>
            <p className="text-lg font-black">{main.pressure} <span className="text-[10px]">hPa</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default WeatherCard;