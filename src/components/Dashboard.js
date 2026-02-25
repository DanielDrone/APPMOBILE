import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClimaApp from './Clima/ClimaApp';
import Cripto from './Cripto';
import Users from './Users';
import Chistes from './Chistes';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('clima');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

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

    const NavButton = ({ tab, icon, label }) => (
        <button
            onClick={() => {
                setActiveTab(tab);
                setIsSidebarOpen(false); // Close sidebar on mobile after clicking
            }}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center space-x-3 ${activeTab === tab
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
        >
            <span className="text-xl">{icon}</span>
            <span className="font-medium">{label}</span>
        </button>
    );

    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden font-sans">
            {/* Sidebar Overlay (Mobile only) */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 md:hidden transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed inset-y-0 left-0 z-30 w-72 bg-gray-900 shadow-2xl transition-transform duration-300 transform 
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                md:relative md:translate-x-0 flex flex-col border-r border-gray-800
            `}>
                <div className="p-6 text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent border-b border-gray-800 flex justify-between items-center">
                    <span>Clima App</span>
                    <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-400">
                        ✕
                    </button>
                </div>

                <div className="p-6 border-b border-gray-800">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-lg font-bold">
                            {(user.username || user.email || 'U').charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Bienvenido</p>
                            <p className="font-semibold text-white truncate text-sm">
                                {user.username || user.email || 'Usuario'}
                            </p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <NavButton tab="clima" icon="🌤️" label="Clima" />
                    <NavButton tab="cripto" icon="💰" label="Cryptomonedas" />
                    <NavButton tab="usuarios" icon="👥" label="Usuarios" />
                    <NavButton tab="chistes" icon="😂" label="Chistes" />
                </nav>

                <div className="p-6 border-t border-gray-800 space-y-4">
                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-500/10 hover:bg-red-500 text-red-500 py-3 px-4 rounded-xl transition-all duration-200 font-semibold border border-red-500/20 flex items-center justify-center space-x-2"
                    >
                        <span>🚪</span>
                        <span>Cerrar Sesión</span>
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-full relative overflow-hidden">
                {/* Mobile Top Bar */}
                <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200 z-10 shadow-sm">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <span className="font-bold text-gray-800 text-lg uppercase tracking-tight">
                        {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                    </span>
                    <div className="w-10"></div> {/* Spacer for symmetry */}
                </header>

                <main className="flex-1 overflow-auto relative bg-gray-50">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
