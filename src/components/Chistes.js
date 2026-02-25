import React, { useState, useEffect } from 'react';

const Chistes = () => {
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
        <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-white p-4">
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl max-w-lg w-full text-center border border-white/20">
                <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
                    Random Joke Generator
                </h2>

                {loading ? (
                    <div className="flex justify-center items-center h-32">
                        <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="mb-8 min-h-[120px] flex flex-col justify-center">
                        <p className="text-xl font-semibold mb-4 text-cyan-100">
                            {joke?.setup}
                        </p>
                        <p className="text-lg italic text-gray-200 bg-black/20 p-3 rounded-lg">
                            "{joke?.punchline}"
                        </p>
                    </div>
                )}

                <button
                    onClick={fetchJoke}
                    className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold rounded-xl shadow-lg transform transition-all duration-200 hover:-translate-y-1 hover:shadow-cyan-500/50 active:scale-95"
                >
                    Give Me Another
                </button>
            </div>
        </div>
    );
};

export default Chistes;
