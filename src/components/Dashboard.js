import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ClimaApp from './Clima/ClimaApp';
import Cripto from './Cripto';
import Users from './Users';
import Chistes from './Chistes';

const Dashboard = ({ darkMode, toggleTheme, showWelcome, setShowWelcome }) => {
    const [activeTab, setActiveTab] = useState('clima');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false); // Collapsed state for desktop
    const [showPopOut, setShowPopOut] = useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    useEffect(() => {
        // Show welcome if triggered from login OR if it's a new session arrival
        const sessionShown = sessionStorage.getItem('welcomeShown');

        if (showWelcome || !sessionShown) {
            setShowPopOut(true);
            sessionStorage.setItem('welcomeShown', 'true');
            if (showWelcome) setShowWelcome(false);

            // Auto close after 5 seconds
            const timer = setTimeout(() => {
                setShowPopOut(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [showWelcome, setShowWelcome]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        sessionStorage.removeItem('welcomeShown');
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
            case 'clima': return <ClimaApp darkMode={darkMode} />;
            case 'cripto': return <Cripto darkMode={darkMode} />;
            case 'usuarios': return <Users darkMode={darkMode} />;
            case 'chistes': return <Chistes darkMode={darkMode} />;
            default: return <ClimaApp darkMode={darkMode} />;
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
                : darkMode ? 'text-gray-400 hover:bg-gray-800 hover:text-white' : 'text-gray-600 hover:bg-gray-200 hover:text-blue-600'
                } ${isCollapsed ? 'justify-center p-3 rounded-xl' : 'px-4 py-3 rounded-lg space-x-3'}`}
            title={isCollapsed ? label : ''}
        >
            <span className="text-xl shrink-0">{icon}</span>
            {!isCollapsed && <span className="font-medium truncate">{label}</span>}
        </button>
    );

    return (
        <div className={`flex h-screen overflow-hidden font-sans ${darkMode ? 'bg-gray-950 text-white' : 'bg-gray-100 text-gray-900'}`}>
            {/* Sidebar Overlay (Mobile only) */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 shadow-2xl transition-all duration-300 transform 
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                ${isCollapsed ? 'md:w-20' : 'md:w-72'}
                ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}
                md:relative md:translate-x-0 flex flex-col border-r
            `}>
                <div className={`p-6 border-b flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                    {!isCollapsed && (
                        <span className="text-xl font-black bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                            CLIMA APP
                        </span>
                    )}
                    <button onClick={toggleSidebar} className="hidden md:block text-gray-500 hover:text-blue-500">
                        {isCollapsed ? '▶' : '◀'}
                    </button>
                    <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-500 hover:text-blue-500">
                        ✕
                    </button>
                </div>

                <div className={`p-4 border-b ${isCollapsed ? 'flex justify-center' : ''} ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-lg font-bold shadow-lg shrink-0 text-white">
                            {(user.username || user.email || 'U').charAt(0).toUpperCase()}
                        </div>
                        {!isCollapsed && (
                            <div className="flex-1 min-w-0">
                                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Bienvenido</p>
                                <p className={`font-bold truncate text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>
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

                <div className={`p-4 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
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
            <div className={`flex-1 flex flex-col h-full relative overflow-hidden ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
                {/* Welcome Pop-out Notification */}
                {showPopOut && (
                    <div className="fixed top-6 right-6 z-[100] animate-bounce-in">
                        <div className={`flex items-center space-x-4 p-5 rounded-2xl shadow-2xl border backdrop-blur-md transition-all ${darkMode
                                ? 'bg-gray-900/90 border-blue-500/30 text-white shadow-blue-500/10'
                                : 'bg-white/95 border-indigo-100 text-gray-900 shadow-indigo-500/10'
                            }`}>
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                                👋
                            </div>
                            <div>
                                <h4 className="font-black text-lg">¡Qué bueno verte!</h4>
                                <p className="text-sm opacity-80 font-bold">Bienvenido de nuevo, <span className="text-blue-500">{user.username || user.email || 'Usuario'}</span></p>
                            </div>
                            <button
                                onClick={() => setShowPopOut(false)}
                                className="p-1 hover:bg-gray-500/10 rounded-lg transition-colors"
                            >
                                <svg className="w-5 h-5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}

                {/* Top Bar for both desktop and mobile */}
                <header className={`flex items-center justify-between p-4 z-30 shadow-sm border-b ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleSidebar}
                            className={`p-2 -ml-2 rounded-xl transition-colors ${darkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <span className={`font-black text-lg uppercase tracking-widest ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                            {activeTab}
                        </span>
                    </div>

                    <div className="flex items-center space-x-4">
                        {/* Theme Toggle Button */}
                        <button
                            onClick={toggleTheme}
                            className={`p-2 rounded-full transition-all duration-300 ${darkMode ? 'bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400/20' : 'bg-indigo-600/10 text-indigo-600 hover:bg-indigo-600/20'}`}
                            title={darkMode ? 'Modo Claro' : 'Modo Oscuro'}
                        >
                            {darkMode ? '☀️' : '🌙'}
                        </button>

                        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${darkMode ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-green-50 border-green-100 text-green-700'}`}>
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="text-[10px] font-black uppercase tracking-tighter">En Línea</span>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-auto relative">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};


export default Dashboard;
