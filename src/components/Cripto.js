import React, { useState, useEffect } from 'react';

const Cripto = () => {
    const [cryptos, setCryptos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currency, setCurrency] = useState('usd');

    const currencies = {
        usd: { symbol: '$', name: 'USD' },
        eur: { symbol: '€', name: 'EUR' },
        mxn: { symbol: '$', name: 'MXN' },
        btc: { symbol: '₿', name: 'BTC' }
    };

    const fetchCryptos = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
            );

            if (!response.ok) {
                throw new Error('Error al obtener datos de criptomonedas');
            }

            const data = await response.json();
            setCryptos(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCryptos();
    }, [currency]);

    const formatPrice = (price) => {
        if (price >= 1) {
            return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
        return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 8 });
    };

    const formatMarketCap = (marketCap) => {
        if (marketCap >= 1e12) {
            return `${(marketCap / 1e12).toFixed(2)}T`;
        } else if (marketCap >= 1e9) {
            return `${(marketCap / 1e9).toFixed(2)}B`;
        } else if (marketCap >= 1e6) {
            return `${(marketCap / 1e6).toFixed(2)}M`;
        }
        return marketCap.toLocaleString();
    };

    return (
        <div className="h-full overflow-y-auto bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                        💰 Criptomonedas
                    </h1>
                    <p className="text-gray-300">Precios en tiempo real de las principales criptomonedas</p>
                </div>

                {/* Currency Selector */}
                <div className="mb-6 flex gap-3 flex-wrap">
                    {Object.entries(currencies).map(([key, curr]) => (
                        <button
                            key={key}
                            onClick={() => setCurrency(key)}
                            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${currency === key
                                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg shadow-yellow-500/50'
                                    : 'bg-white/10 hover:bg-white/20 text-gray-300'
                                }`}
                        >
                            {curr.symbol} {curr.name}
                        </button>
                    ))}
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center h-64">
                        <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-red-500/20 border border-red-500 rounded-xl p-6 text-center">
                        <h3 className="font-bold text-lg mb-2">⚠️ Error</h3>
                        <p>{error}</p>
                        <button
                            onClick={fetchCryptos}
                            className="mt-4 px-6 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                        >
                            Reintentar
                        </button>
                    </div>
                )}

                {/* Crypto List */}
                {!loading && !error && (
                    <div className="space-y-4">
                        {cryptos.map((crypto, index) => (
                            <div
                                key={crypto.id}
                                className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 border border-white/20 hover:bg-white/15 transition-all duration-200 hover:shadow-xl hover:shadow-purple-500/20"
                            >
                                <div className="flex items-center justify-between flex-wrap gap-4">
                                    {/* Left: Rank, Icon, Name */}
                                    <div className="flex items-center gap-4 min-w-[200px]">
                                        <div className="text-2xl font-bold text-gray-400">
                                            #{crypto.market_cap_rank}
                                        </div>
                                        <img
                                            src={crypto.image}
                                            alt={crypto.name}
                                            className="w-12 h-12 rounded-full"
                                        />
                                        <div>
                                            <h3 className="font-bold text-lg">{crypto.name}</h3>
                                            <p className="text-sm text-gray-400 uppercase">{crypto.symbol}</p>
                                        </div>
                                    </div>

                                    {/* Center: Price */}
                                    <div className="text-center min-w-[150px]">
                                        <p className="text-sm text-gray-400 mb-1">Precio</p>
                                        <p className="text-2xl font-bold text-yellow-400">
                                            {currencies[currency].symbol}{formatPrice(crypto.current_price)}
                                        </p>
                                    </div>

                                    {/* Right: 24h Change */}
                                    <div className="text-center min-w-[120px]">
                                        <p className="text-sm text-gray-400 mb-1">24h</p>
                                        <p
                                            className={`text-xl font-bold ${crypto.price_change_percentage_24h >= 0
                                                    ? 'text-green-400'
                                                    : 'text-red-400'
                                                }`}
                                        >
                                            {crypto.price_change_percentage_24h >= 0 ? '▲' : '▼'}{' '}
                                            {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                                        </p>
                                    </div>

                                    {/* Far Right: Market Cap */}
                                    <div className="text-center min-w-[150px]">
                                        <p className="text-sm text-gray-400 mb-1">Cap. de Mercado</p>
                                        <p className="text-lg font-semibold text-purple-300">
                                            {currencies[currency].symbol}{formatMarketCap(crypto.market_cap)}
                                        </p>
                                    </div>

                                    {/* Volume */}
                                    <div className="text-center min-w-[150px]">
                                        <p className="text-sm text-gray-400 mb-1">Volumen 24h</p>
                                        <p className="text-lg font-semibold text-blue-300">
                                            {currencies[currency].symbol}{formatMarketCap(crypto.total_volume)}
                                        </p>
                                    </div>
                                </div>

                                {/* Additional Info Row */}
                                <div className="mt-4 pt-4 border-t border-white/10 flex justify-between flex-wrap gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-400">Máximo 24h: </span>
                                        <span className="text-green-400 font-semibold">
                                            {currencies[currency].symbol}{formatPrice(crypto.high_24h)}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-400">Mínimo 24h: </span>
                                        <span className="text-red-400 font-semibold">
                                            {currencies[currency].symbol}{formatPrice(crypto.low_24h)}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-400">Cambio 24h: </span>
                                        <span className={crypto.price_change_24h >= 0 ? 'text-green-400' : 'text-red-400'}>
                                            {currencies[currency].symbol}{formatPrice(Math.abs(crypto.price_change_24h))}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Refresh Button */}
                {!loading && !error && (
                    <div className="mt-8 text-center">
                        <button
                            onClick={fetchCryptos}
                            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-xl font-bold shadow-lg transform transition-all duration-200 hover:-translate-y-1 hover:shadow-purple-500/50"
                        >
                            🔄 Actualizar Precios
                        </button>
                        <p className="text-xs text-gray-400 mt-2">
                            Datos proporcionados por CoinGecko
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cripto;
