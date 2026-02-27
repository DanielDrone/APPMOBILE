import React, { useState, useEffect } from 'react';

const Chistes = ({ darkMode }) => {
    const [joke, setJoke] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchJoke = async () => {
        setLoading(true);
        try {
            const response = await fetch("https://official-joke-api.appspot.com/jokes/random");
            const data = await response.json();
            setJoke(data);
        } catch (error) {
            console.error("Error fetching joke:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJoke();
    }, []);

    return (
        <div className={`h-full flex flex-col items-center justify-center p-4 transition-colors duration-300 ${darkMode
                ? 'bg-gray-950 text-white'
                : 'bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-white'
            }`}>
            <div className={`backdrop-blur-xl p-8 rounded-3xl shadow-2xl max-w-lg w-full text-center border transition-all duration-300 ${darkMode
                    ? 'bg-gray-900 border-gray-800 shadow-black/50'
                    : 'bg-white/10 border-white/20'
                }`}>
                <div className="mb-2">
                    <span className="text-5xl">🎭</span>
                </div>
                <h2 className="text-3xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 uppercase tracking-tighter">
                    Detector de Risas
                </h2>

                {loading ? (
                    <div className="flex flex-col justify-center items-center h-48">
                        <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-4 text-xs font-black uppercase tracking-widest text-cyan-500 animate-pulse">Buscando algo gracioso...</p>
                    </div>
                ) : (
                    <div className="mb-10 min-h-[140px] flex flex-col justify-center">
                        <p className={`text-2xl font-bold mb-6 leading-tight ${darkMode ? 'text-gray-200' : 'text-cyan-50'}`}>
                            {joke?.setup}
                        </p>
                        <div className={`p-4 rounded-2xl transform transition-all hover:scale-105 ${darkMode ? 'bg-black/40 border border-gray-800' : 'bg-black/20'
                            }`}>
                            <p className="text-xl italic font-black text-cyan-400">
                                "{joke?.punchline}"
                            </p>
                        </div>
                    </div>
                )}

                <button
                    onClick={fetchJoke}
                    className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 transform transition-all duration-200 hover:-translate-y-1 active:scale-95 uppercase tracking-widest text-sm"
                >
                    Siguiente Chiste 🚀
                </button>

                <p className={`mt-6 text-[10px] font-bold uppercase tracking-widest ${darkMode ? 'text-gray-600' : 'text-white/40'}`}>
                    API: official-joke-api
                </p>
            </div>
        </div>
    );
};


export default Chistes;
