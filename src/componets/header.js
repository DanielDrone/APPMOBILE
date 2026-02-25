import React, { useState } from 'react';

const Header = ({ onCityChange }) => {
  const [inputCity, setInputCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputCity.trim()) {
      onCityChange(inputCity.trim());
      setInputCity('');
    }
  };

  return (
    <header className="w-full p-6 flex justify-center items-center z-50 relative">
      <form onSubmit={handleSubmit} className="relative w-full max-w-md group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
          placeholder="Buscar ciudad..."
          className="block w-full pl-10 pr-4 py-3 border-none rounded-full leading-5 bg-white/80 backdrop-blur-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white shadow-lg transition-all duration-300"
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 px-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
        >
          Buscar
        </button>
      </form>
    </header>
  );
};

export default Header;