import React, { useState } from 'react';

const Header = ({ onCityChange, darkMode }) => {
  const [inputCity, setInputCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputCity.trim()) {
      onCityChange(inputCity.trim());
      setInputCity('');
    }
  };

  return (
    <header className="w-full p-8 flex justify-center items-center z-50 relative">
      <form onSubmit={handleSubmit} className="relative w-full max-w-lg group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className={`h-6 w-6 transition-colors duration-300 ${darkMode ? 'text-gray-500 group-focus-within:text-blue-400' : 'text-gray-400 group-focus-within:text-indigo-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
          placeholder="Busca tu ciudad preferida..."
          className={`block w-full pl-12 pr-24 py-4 border-none rounded-2xl leading-5 font-bold shadow-2xl transition-all duration-300 focus:outline-none focus:ring-4 ${darkMode
              ? 'bg-gray-900/80 text-white placeholder-gray-600 focus:ring-blue-500/20 focus:bg-gray-900'
              : 'bg-white/90 text-gray-900 placeholder-gray-400 focus:ring-indigo-500/10 focus:bg-white'
            }`}
        />
        <button
          type="submit"
          className={`absolute inset-y-2 right-2 px-6 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 shadow-lg active:scale-95 ${darkMode
              ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-500/20'
              : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-500/20'
            }`}
        >
          Explorar
        </button>
      </form>
    </header>
  );
};


export default Header;