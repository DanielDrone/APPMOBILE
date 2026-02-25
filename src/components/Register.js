import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('https://server-tlnp.onrender.com/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                navigate('/'); // Redirect to login
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            setError('Error connecting to server');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-800 p-4 sm:p-6 lg:p-8">
            <div className="bg-white/95 backdrop-blur-sm p-6 sm:p-10 rounded-2xl shadow-2xl w-full max-w-md border border-white/20 transform transition-all">
                <div className="text-center mb-10">
                    <div className="inline-block p-3 bg-emerald-100 rounded-2xl mb-4">
                        <span className="text-4xl">📝</span>
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Únete a nosotros</h2>
                    <p className="text-gray-500 mt-2 font-medium">Crea tu cuenta en segundos</p>
                </div>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm font-bold flex items-center space-x-2">
                        <span>⚠️</span>
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 text-xs font-black uppercase tracking-widest mb-2" htmlFor="username">
                            Nombre de Usuario
                        </label>
                        <input
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all font-medium"
                            id="username"
                            type="text"
                            placeholder="Daniel_123"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-xs font-black uppercase tracking-widest mb-2" htmlFor="email">
                            Correo Electrónico
                        </label>
                        <input
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all font-medium"
                            id="email"
                            type="email"
                            placeholder="tu@correo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-xs font-black uppercase tracking-widest mb-2" htmlFor="password">
                            Contraseña
                        </label>
                        <input
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all font-medium"
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black py-4 rounded-xl shadow-lg shadow-emerald-500/30 transform transition-all active:scale-95 text-lg mt-4"
                        type="submit"
                    >
                        Crear Cuenta
                    </button>

                    <div className="pt-4 text-center border-t border-gray-100 mt-6">
                        <p className="text-sm text-gray-600 font-medium">
                            ¿Ya tienes cuenta? <Link to="/" className="text-emerald-600 font-bold hover:underline">Inicia Sesión</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
