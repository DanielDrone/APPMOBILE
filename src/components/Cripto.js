import React, { useState, useEffect } from 'react';

const Cripto = ({ darkMode }) => {
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

    const fetchCryptos = React.useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.toLowerCase()}&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
            );

            if (!response.ok) {
                if (response.status === 429) {
                    throw new Error('Demasiadas solicitudes. Por favor, espera un momento.');
                }
                throw new Error('Error al obtener datos de criptomonedas');
            }

            const data = await response.json();
            setCryptos(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [currency]);

    useEffect(() => {
        fetchCryptos();
    }, [fetchCryptos]);

    const formatPrice = (price) => {
        if (price === undefined || price === null) return '0.00';
        if (price >= 1) {
            return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
        return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 8 });
    };

    const formatMarketCap = (marketCap) => {
        if (marketCap === undefined || marketCap === null) return '0';
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
        <div className={`h-full overflow-y-auto p-6 transition-colors duration-300 ${darkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className={`text-4xl font-black mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        💰 <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Criptomonedas</span>
                    </h1>
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Precios en tiempo real vinculados a CoinGecko</p>
                </div>

                {/* Currency Selector */}
                <div className={`mb-8 p-1 inline-flex rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-white shadow-sm border border-gray-200'}`}>
                    {Object.entries(currencies).map(([key, curr]) => (
                        <button
                            key={key}
                            onClick={() => setCurrency(key)}
                            className={`px-6 py-2 rounded-lg font-bold transition-all duration-200 flex items-center gap-2 ${currency === key
                                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
                                : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-yellow-600'
                                }`}
                        >
                            <span className="text-lg">{curr.symbol}</span>
                            <span>{curr.name}</span>
                        </button>
                    ))}
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col justify-center items-center h-64">
                        <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-4 font-bold animate-pulse text-yellow-500">Actualizando mercado...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className={`${darkMode ? 'bg-red-500/10 border-red-500/20' : 'bg-red-50 border-red-200'} border rounded-2xl p-8 text-center max-w-lg mx-auto`}>
                        <div className="text-4xl mb-4">⚠️</div>
                        <h3 className={`font-bold text-xl mb-2 ${darkMode ? 'text-white' : 'text-red-800'}`}>Error de Conexión</h3>
                        <p className={darkMode ? 'text-gray-400' : 'text-red-600'}>{error}</p>
                        <button
                            onClick={fetchCryptos}
                            className="mt-6 px-8 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-all transform hover:scale-105"
                        >
                            Reintentar ahora
                        </button>
                    </div>
                )}

                {/* Crypto List */}
                {!loading && !error && (
                    <div className="grid grid-cols-1 gap-4">
                        {cryptos.map((crypto) => (
                            <div
                                key={crypto.id}
                                className={`group rounded-2xl p-5 border transition-all duration-300 hover:shadow-2xl ${darkMode
                                    ? 'bg-gray-900/50 border-gray-800 hover:bg-gray-800/80 hover:border-yellow-500/30'
                                    : 'bg-white border-gray-100 hover:border-yellow-500/30'
                                    }`}
                            >
                                <div className="flex items-center justify-between flex-wrap gap-6">
                                    {/* Left: Rank, Icon, Name */}
                                    <div className="flex items-center gap-4 min-w-[240px]">
                                        <div className={`text-2xl font-black ${darkMode ? 'text-gray-700' : 'text-gray-200'}`}>
                                            {crypto.market_cap_rank < 10 ? `0${crypto.market_cap_rank}` : crypto.market_cap_rank}
                                        </div>
                                        <div className="relative">
                                            <img
                                                src={crypto.image}
                                                alt={crypto.name}
                                                className="w-14 h-14 rounded-full shadow-lg group-hover:rotate-12 transition-transform duration-300"
                                            />
                                            {crypto.price_change_percentage_24h > 0 && (
                                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className={`font-black text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>{crypto.name}</h3>
                                            <p className="text-sm font-bold text-yellow-500 uppercase tracking-widest">{crypto.symbol}</p>
                                        </div>
                                    </div>

                                    {/* Center: Price */}
                                    <div className="flex-1 min-w-[160px]">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Precio actual</p>
                                        <p className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                            <span className="text-yellow-500 mr-1">{currencies[currency].symbol}</span>
                                            {formatPrice(crypto.current_price)}
                                        </p>
                                    </div>

                                    {/* Right: 24h Change */}
                                    <div className="min-w-[120px] text-right">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Cambio 24h</p>
                                        <div className={`inline-flex items-center px-3 py-1 rounded-full font-bold text-sm ${crypto.price_change_percentage_24h >= 0
                                            ? 'bg-green-500/10 text-green-500'
                                            : 'bg-red-500/10 text-red-500'
                                            }`}>
                                            {crypto.price_change_percentage_24h >= 0 ? '▲' : '▼'}{' '}
                                            {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                                        </div>
                                    </div>

                                    {/* Market Cap & Volume */}
                                    <div className="hidden lg:block min-w-[180px]">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Cap. Mercado</p>
                                        <p className={`font-bold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            {currencies[currency].symbol}{formatMarketCap(crypto.market_cap)}
                                        </p>
                                    </div>
                                </div>

                                {/* Hover Reveal Info */}
                                <div className="mt-4 pt-4 border-t border-dashed border-gray-700/30 flex justify-between items-center text-xs font-bold uppercase tracking-wider text-gray-500">
                                    <div className="flex gap-4">
                                        <span>Alto 24h: <span className="text-green-500">{currencies[currency].symbol}{formatPrice(crypto.high_24h)}</span></span>
                                        <span>Bajo 24h: <span className="text-red-500">{currencies[currency].symbol}{formatPrice(crypto.low_24h)}</span></span>
                                    </div>
                                    <div className={darkMode ? 'text-gray-600' : 'text-gray-400'}>
                                        Vol: {currencies[currency].symbol}{formatMarketCap(crypto.total_volume)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Refresh Button */}
                {!loading && !error && (
                    <div className="mt-12 text-center">
                        <button
                            onClick={fetchCryptos}
                            className={`px-10 py-4 rounded-2xl font-black shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 ${darkMode
                                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-indigo-500/20'
                                : 'bg-gray-900 text-white shadow-gray-900/20'
                                }`}
                        >
                            🔄 ACTUALIZAR MERCADO
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};


export default Cripto;
