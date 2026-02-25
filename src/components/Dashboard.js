import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClimaApp from './Clima/ClimaApp';
import Cripto from './Cripto';
import Users from './Users';
import Chistes from './Chistes';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('clima');
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'clima':
                return <ClimaApp />;
            case 'cripto':
                return <Cripto />;
            case 'usuarios':
                return <Users />;
            case 'chistes':
                return <Chistes />;
            default:
                return <ClimaApp />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-white flex flex-col">
                <div className="p-4 text-2xl font-bold border-b border-gray-700">Dashboard</div>
                <div className="p-4 border-b border-gray-700">
                    <p className="text-sm text-gray-400">Bienvenido,</p>
                    <p className="font-semibold truncate">{user.username || user.email || 'Usuario'}</p>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <button
                        onClick={() => setActiveTab('clima')}
                        className={`w-full text-left px-4 py-2 rounded transition-colors ${activeTab === 'clima' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                    >
                        🌤️ Clima
                    </button>
                    <button
                        onClick={() => setActiveTab('cripto')}
                        className={`w-full text-left px-4 py-2 rounded transition-colors ${activeTab === 'cripto' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                    >
                        💰 Cryptomonedas
                    </button>
                    <button
                        onClick={() => setActiveTab('usuarios')}
                        className={`w-full text-left px-4 py-2 rounded transition-colors ${activeTab === 'usuarios' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                    >
                        👥 Usuarios
                    </button>
                    <button
                        onClick={() => setActiveTab('chistes')}
                        className={`w-full text-left px-4 py-2 rounded transition-colors ${activeTab === 'chistes' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                    >
                        😂 Chistes
                    </button>
                </nav>
                <div className="p-4 border-t border-gray-700">
                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition-colors"
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </div>
            {/* Main Content */}
            <div className="flex-1 overflow-hidden relative">
                {renderContent()}
            </div>
        </div>
    );
};

export default Dashboard;
