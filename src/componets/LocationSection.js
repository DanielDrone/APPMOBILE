import React from 'react';

const LocationSection = ({ data }) => {
    if (!data || !data.coord) return null;

    const { coord, name, sys, main, weather } = data;
    const { lat, lon } = coord;

    return (
        <div className="w-full max-w-4xl mt-12 mb-8">
            <h3 className="text-2xl font-bold text-white mb-6 drop-shadow-md border-l-4 border-yellow-400 pl-4">
                Ubicación en Mapa
            </h3>

            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/10 flex flex-col md:flex-row gap-6">

                {/* Info Column */}
                <div className="flex-1 flex flex-col justify-center text-white">
                    <div className="mb-4">
                        <h4 className="text-3xl font-bold">{name}</h4>
                        <p className="text-lg opacity-80">{sys.country}</p>
                        <p className="text-sm opacity-60 font-mono mt-1">Lat: {lat}, Lon: {lon}</p>
                    </div>

                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                        <div className="flex items-center gap-4">
                            <img
                                src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
                                alt={weather[0].description}
                                className="w-16 h-16"
                            />
                            <div>
                                <p className="text-4xl font-bold">{Math.round(main.temp)}°C</p>
                                <p className="capitalize opacity-90">{weather[0].description}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map Column */}
                <div className="flex-1 h-64 md:h-auto rounded-xl overflow-hidden shadow-inner border-2 border-white/20 relative">
                    <iframe
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        scrolling="no"
                        marginHeight="0"
                        marginWidth="0"
                        title="City Location Map"
                        src={`https://www.openstreetmap.org/export/embed.html?bbox=${lon - 0.1},${lat - 0.1},${lon + 0.1},${lat + 0.1}&layer=mapnik&marker=${lat},${lon}`}
                        className="absolute inset-0 w-full h-full"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default LocationSection;
