import React from 'react';

const Forecast = ({ data, darkMode }) => {
    if (!data || !data.list) return null;

    // Filter to get one forecast per day (e.g., around noon)
    const dailyForecasts = data.list.filter((reading) =>
        reading.dt_txt.includes("12:00:00")
    );

    // If we don't have enough data for 5 days (e.g. late at night), take every 8th item
    const forecastList = dailyForecasts.length >= 4
        ? dailyForecasts
        : data.list.filter((_, index) => index % 8 === 0).slice(0, 5);

    return (
        <div className="mt-12 w-full max-w-4xl">
            <h3 className={`text-2xl font-black mb-6 drop-shadow-md border-l-4 border-indigo-400 pl-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                📅 Pronóstico Semanal
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {forecastList.map((day, idx) => {
                    const date = new Date(day.dt * 1000);
                    const dayName = date.toLocaleDateString('es-ES', { weekday: 'long' });
                    const dayDate = date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });

                    return (
                        <div key={day.dt} className={`backdrop-blur-md rounded-2xl p-4 flex flex-col items-center shadow-xl border transition-all duration-500 hover:-translate-y-2 ${darkMode
                                ? 'bg-gray-900/50 border-gray-800 text-white'
                                : 'bg-white/40 border-white/50 text-gray-800'
                            }`}>
                            <p className={`font-black uppercase tracking-tighter text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{dayName}</p>
                            <p className="text-[10px] font-bold opacity-60 mb-3">{dayDate}</p>
                            <div className={`p-1 rounded-full mb-3 shadow-inner ${darkMode ? 'bg-black/20' : 'bg-white/50'}`}>
                                <img
                                    src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                                    alt={day.weather[0].description}
                                    className="w-14 h-14 drop-shadow-md"
                                />
                            </div>
                            <p className="text-3xl font-black">{Math.round(day.main.temp)}°</p>
                            <p className="text-[9px] font-black uppercase tracking-widest text-center mt-2 opacity-60 px-2 line-clamp-1">
                                {day.weather[0].description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};


export default Forecast;
