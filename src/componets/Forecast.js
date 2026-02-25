import React from 'react';

const Forecast = ({ data }) => {
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
        <div className="mt-8 w-full max-w-4xl">
            <h3 className="text-2xl font-bold text-white mb-6 drop-shadow-md">Pronóstico de 5 Días</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {forecastList.map((day) => {
                    const date = new Date(day.dt * 1000);
                    const dayName = date.toLocaleDateString('es-ES', { weekday: 'short' });
                    const dayDate = date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });

                    return (
                        <div key={day.dt} className="bg-white/20 backdrop-blur-md rounded-xl p-4 flex flex-col items-center text-white shadow-lg border border-white/10 hover:bg-white/30 transition-all duration-300">
                            <p className="font-semibold text-lg capitalize">{dayName}</p>
                            <p className="text-xs opacity-80 mb-2">{dayDate}</p>
                            <img
                                src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                                alt={day.weather[0].description}
                                className="w-12 h-12 my-1 drop-shadow-sm"
                            />
                            <p className="text-xl font-bold">{Math.round(day.main.temp)}°C</p>
                            <p className="text-xs capitalize opacity-90 text-center mt-1">{day.weather[0].description}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Forecast;
