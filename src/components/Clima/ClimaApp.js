import React, { useState, useEffect, useCallback } from 'react';
import { fetchWeatherData, fetchForecastData } from '../../api/weatherApi';
import Header from '../../componets/header';
import WeatherCard from '../../componets/WeatherCard';
import Forecast from '../../componets/Forecast';
import LocationSection from '../../componets/LocationSection';

const DEFAULT_CITY = 'Madrid';

function ClimaApp() {
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [city, setCity] = useState(DEFAULT_CITY);

    const getWeather = useCallback(async (currentCity) => {
        setLoading(true);
        setError(null);
        setWeatherData(null);
        setForecastData(null);

        try {
            const [weather, forecast] = await Promise.all([
                fetchWeatherData(currentCity),
                fetchForecastData(currentCity)
            ]);

            setWeatherData(weather);
            setForecastData(forecast);
        } catch (err) {
            setError(err.message || 'Ocurrió un error al buscar el clima.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getWeather(city);
    }, [city, getWeather]);

    const handleCityChange = (newCity) => {
        if (newCity && newCity.trim() !== '') {
            setCity(newCity.trim());
        }
    };

    return (
        <div className="h-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 font-sans text-white overflow-y-auto">

            <Header onCityChange={handleCityChange} />

            <main className="container mx-auto p-4 flex flex-col items-center pb-20">

                {loading && (
                    <div className="mt-20 flex flex-col items-center">
                        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-xl font-medium animate-pulse">Cargando...</p>
                    </div>
                )}

                {error && (
                    <div className="mt-8 p-6 bg-red-500/80 backdrop-blur-md text-white max-w-md w-full rounded-2xl shadow-xl border border-red-400">
                        <h3 className="font-bold text-lg mb-2">⚠️ Error</h3>
                        <p>{error}</p>
                    </div>
                )}

                {!loading && weatherData && (
                    <>
                        <WeatherCard data={weatherData} />
                        {forecastData && <Forecast data={forecastData} />}
                        <LocationSection data={weatherData} />
                    </>
                )}
            </main>
        </div>
    );
}

export default ClimaApp;
