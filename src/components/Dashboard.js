import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClimaApp from './Clima/ClimaApp';
import Cripto from './Cripto';
import Users from './Users';
import Chistes from './Chistes';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('clima');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false); // Collapsed state for desktop
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    const toggleSidebar = () => {
        if (window.innerWidth >= 768) {
            setIsCollapsed(!isCollapsed);
        } else {
            setIsSidebarOpen(!isSidebarOpen);
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'clima': return <ClimaApp />;
            case 'cripto': return <Cripto />;
            case 'usuarios': return <Users />;
            case 'chistes': return <Chistes />;
            default: return <ClimaApp />;
        }
    };

    const NavButton = ({ tab, icon, label }) => (
        <button
            onClick={() => {
                setActiveTab(tab);
                if (window.innerWidth < 768) setIsSidebarOpen(false);
            }}
            className={`w-full flex items-center transition-all duration-200 ${activeTab === tab
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                } ${isCollapsed ? 'justify-center p-3 rounded-xl' : 'px-4 py-3 rounded-lg space-x-3'}`}
            title={isCollapsed ? label : ''}
        >
            <span className="text-xl shrink-0">{icon}</span>
            {!isCollapsed && <span className="font-medium truncate">{label}</span>}
        </button>
    );

    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden font-sans">
            {/* Sidebar Overlay (Mobile only) */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 bg-gray-900 text-white shadow-2xl transition-all duration-300 transform 
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                ${isCollapsed ? 'md:w-20' : 'md:w-72'}
                md:relative md:translate-x-0 flex flex-col border-r border-gray-800
            `}>
                <div className={`p-6 border-b border-gray-800 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
                    {!isCollapsed && (
                        <span className="text-xl font-black bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                            CLIMA APP
                        </span>
                    )}
                    <button onClick={toggleSidebar} className="hidden md:block text-gray-500 hover:text-white">
                        {isCollapsed ? '▶' : '◀'}
                    </button>
                    <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-500 hover:text-white">
                        ✕
                    </button>
                </div>

                <div className={`p-4 border-b border-gray-800 ${isCollapsed ? 'flex justify-center' : ''}`}>
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-lg font-bold shadow-lg shrink-0">
                            {(user.username || user.email || 'U').charAt(0).toUpperCase()}
                        </div>
                        {!isCollapsed && (
                            <div className="flex-1 min-w-0">
                                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Bienvenido</p>
                                <p className="font-bold text-white truncate text-sm">
                                    {user.username || user.email || 'Usuario'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <nav className="flex-1 p-3 space-y-2 overflow-y-auto">
                    <NavButton tab="clima" icon="🌤️" label="Clima" />
                    <NavButton tab="cripto" icon="💰" label="Cripto" />
                    <NavButton tab="usuarios" icon="👥" label="Usuarios" />
                    <NavButton tab="chistes" icon="😂" label="Chistes" />
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <button
                        onClick={handleLogout}
                        className={`w-full flex items-center transition-all duration-200 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 ${isCollapsed ? 'justify-center p-3 rounded-xl' : 'px-4 py-3 rounded-lg space-x-3'
                            }`}
                        title={isCollapsed ? 'Cerrar Sesión' : ''}
                    >
                        <span className="text-xl shrink-0">🚪</span>
                        {!isCollapsed && <span className="font-bold">Salir</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-full relative overflow-hidden bg-white">
                {/* Top Bar for both desktop and mobile */}
                <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200 z-30 shadow-sm">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleSidebar}
                            className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-xl"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <span className="font-black text-gray-800 text-lg uppercase tracking-widest">
                            {activeTab}
                        </span>
                    </div>
                    <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-[10px] font-black text-green-700 uppercase">En Línea</span>
                    </div>
                </header>

                <main className="flex-1 overflow-auto relative bg-gray-50/50">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
