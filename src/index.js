// src/index.js
import React from 'react';
// 1. Importaciones al inicio (Soluciona el error 'import/first')
import { createRoot } from 'react-dom/client'; 
import App from './App'; // <--- DEBE ESTAR AQUÍ para que App esté definida (Soluciona 'no-undef')
import './index.css'; 

// Localizar el contenedor DOM
const container = document.getElementById('root'); 

// 2. Lógica para crear y renderizar la aplicación
if (container) {
  const root = createRoot(container); 

  root.render(
    <React.StrictMode>
      <App /> {/* Ahora App está definida correctamente */}
    </React.StrictMode>
  );
} else {
  console.error("No se encontró el elemento con id 'root'. Asegúrate de que tu index.html lo contenga.");
}