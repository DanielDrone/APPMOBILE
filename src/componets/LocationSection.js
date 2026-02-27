import React from 'react';

const LocationSection = ({ data, darkMode }) => {
    if (!data || !data.coord) return null;

    const { coord, name, sys, main, weather } = data;
    const { lat, lon } = coord;

    return (
        <div className="w-full max-w-4xl mt-12 mb-8 animate-fade-in">
            <h3 className={`text-2xl font-black mb-6 drop-shadow-md border-l-4 border-yellow-400 pl-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                📍 Ubicación en el Mapa
            </h3>

            <div className={`backdrop-blur-lg rounded-3xl p-6 shadow-2xl border transition-all duration-300 flex flex-col lg:flex-row gap-8 ${darkMode
                    ? 'bg-gray-900 border-gray-800 shadow-black/50'
                    : 'bg-white/30 border-white/40 shadow-indigo-500/10'
                }`}>

                {/* Info Column */}
                <div className="flex-1 flex flex-col justify-center">
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-3xl">🏙️</span>
                            <h4 className={`text-3xl font-black ${darkMode ? 'text-white' : 'text-gray-800'}`}>{name}</h4>
                        </div>
                        <p className={`text-xl font-bold opacity-80 ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>{sys.country}</p>
                        <div className="flex gap-4 mt-3">
                            <div className={`px-3 py-1 rounded-lg text-xs font-mono font-bold ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-white/50 text-gray-600'}`}>
                                LAT: {lat.toFixed(4)}
                            </div>
                            <div className={`px-3 py-1 rounded-lg text-xs font-mono font-bold ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-white/50 text-gray-600'}`}>
                                LON: {lon.toFixed(4)}
                            </div>
                        </div>
                    </div>

                    <div className={`rounded-2xl p-6 backdrop-blur-sm border transition-transform hover:scale-105 duration-300 ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white/60 border-indigo-100 shadow-sm'
                        }`}>
                        <div className="flex items-center gap-6">
                            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-2 rounded-2xl shadow-lg">
                                <img
                                    src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
                                    alt={weather[0].description}
                                    className="w-16 h-16"
                                />
                            </div>
                            <div>
                                <p className={`text-4xl font-black ${darkMode ? 'text-white' : 'text-gray-800'}`}>{Math.round(main.temp)}°C</p>
                                <p className={`capitalize font-bold tracking-wide ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{weather[0].description}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map Column */}
                <div className={`flex-[1.5] h-80 lg:h-[400px] rounded-2xl overflow-hidden shadow-inner border-2 transition-all duration-500 group relative ${darkMode ? 'border-gray-800' : 'border-white/50 ring-4 ring-indigo-500/5'
                    }`}>
                    {/* Tooltip hint */}
                    <div className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                        Mapa Interactivo
                    </div>

                    <iframe
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        scrolling="no"
                        marginHeight="0"
                        marginWidth="0"
                        title="City Location Map"
                        src={`https://www.openstreetmap.org/export/embed.html?bbox=${lon - 0.05},${lat - 0.05},${lon + 0.05},${lat + 0.05}&layer=mapnik&marker=${lat},${lon}`}
                        className="w-full h-full grayscale brightness-90 contrast-125 dark:grayscale-0 dark:brightness-100 transition-all hover:grayscale-0"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};


export default LocationSection;
