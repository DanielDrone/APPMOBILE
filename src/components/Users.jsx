import React, { useState, useEffect } from 'react';

const Users = ({ darkMode }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State for Modify Password Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUserEmail, setSelectedUserEmail] = useState(null);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [updateMessage, setUpdateMessage] = useState(null);
    const [updateError, setUpdateError] = useState(null);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('https://server-tlnp.onrender.com/users'); // backend runs on port 5000
            if (!response.ok) {
                throw new Error('Error fetching users');
            }
            const data = await response.json();
            setUsers(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleModifyClick = (email) => {
        setSelectedUserEmail(email);
        setIsModalOpen(true);
        setUpdateMessage(null);
        setUpdateError(null);
        setCurrentPassword('');
        setNewPassword('');
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        setUpdateMessage(null);
        setUpdateError(null);

        try {
            const response = await fetch('https://server-tlnp.onrender.com/update-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: selectedUserEmail,
                    currentPassword,
                    newPassword,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error updating password');
            }

            setUpdateMessage('Contraseña actualizada correctamente');
            setTimeout(() => {
                setIsModalOpen(false);
                fetchUsers(); // Refresh list to show new hash if needed (though hash changes every time)
            }, 1500);
        } catch (err) {
            setUpdateError(err.message);
        }
    };

    return (
        <div className={`h-full overflow-y-auto p-6 transition-colors duration-300 ${darkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className={`text-4xl font-black mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        👥 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Usuarios</span> Registrados
                    </h1>
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Gestión de accesos y seguridad de cuenta</p>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center h-64">
                        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className={`${darkMode ? 'bg-red-500/10 border-red-500/20' : 'bg-red-50 border-red-200'} border rounded-xl p-8 text-center`}>
                        <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-red-800'}`}>⚠️ Error</h3>
                        <p className={darkMode ? 'text-gray-400' : 'text-red-600'}>{error}</p>
                        <button
                            onClick={fetchUsers}
                            className="mt-4 px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                        >
                            Reintentar
                        </button>
                    </div>
                )}

                {/* Users Table */}
                {!loading && !error && (
                    <div className={`overflow-x-auto rounded-2xl shadow-xl border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
                        <table className="min-w-full divide-y divide-gray-800">
                            <thead className={darkMode ? 'bg-gray-800/50' : 'bg-gray-50'}>
                                <tr>
                                    <th className={`px-6 py-4 text-left text-xs font-black uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Usuario</th>
                                    <th className={`px-6 py-4 text-left text-xs font-black uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Correo</th>
                                    <th className={`px-6 py-4 text-left text-xs font-black uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Password (hash)</th>
                                    <th className={`px-6 py-4 text-center text-xs font-black uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody className={`divide-y ${darkMode ? 'divide-gray-800' : 'divide-gray-100'}`}>
                                {users.map((u, idx) => (
                                    <tr
                                        key={idx}
                                        className={`transition-colors ${darkMode ? 'hover:bg-gray-800/50' : 'hover:bg-blue-50/30'}`}
                                    >
                                        <td className={`px-6 py-4 whitespace-now font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{u.username}</td>
                                        <td className={`px-6 py-4 whitespace-nowrap ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{u.email}</td>
                                        <td className="px-6 py-4">
                                            <div className={`max-w-xs truncate font-mono text-[10px] px-2 py-1 rounded ${darkMode ? 'bg-black/30 text-green-500' : 'bg-gray-100 text-green-700'}`}>
                                                {u.password}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button
                                                onClick={() => handleModifyClick(u.email)}
                                                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-95 uppercase tracking-tighter"
                                            >
                                                ✏️ Modificar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Refresh Button */}
                {!loading && !error && (
                    <div className="mt-12 text-center">
                        <button
                            onClick={fetchUsers}
                            className={`px-10 py-4 rounded-2xl font-black shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 ${darkMode
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-500/20'
                                : 'bg-gray-900 text-white shadow-gray-900/20'
                                }`}
                        >
                            🔄 ACTUALIZAR LISTA
                        </button>
                    </div>
                )}

                {/* Modify Password Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
                        <div className={`border rounded-2xl p-8 w-full max-w-md shadow-2xl transform transition-all ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
                            <h2 className={`text-3xl font-black mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Nueva Contraseña</h2>
                            <p className="text-gray-500 mb-6 text-sm font-bold">Cuenta: {selectedUserEmail}</p>

                            <form onSubmit={handleUpdatePassword} className="space-y-5">
                                <div>
                                    <label className={`block mb-1.5 text-xs font-black uppercase tracking-widest ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Contraseña Anterior</label>
                                    <input
                                        type="password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        className={`w-full rounded-xl p-3 font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none border transition-all ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                                            }`}
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className={`block mb-1.5 text-xs font-black uppercase tracking-widest ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Nueva Contraseña</label>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className={`w-full rounded-xl p-3 font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none border transition-all ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'
                                            }`}
                                        placeholder="Min. 8 caracteres"
                                        required
                                    />
                                </div>

                                {updateError && (
                                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-bold">
                                        ❌ {updateError}
                                    </div>
                                )}
                                {updateMessage && (
                                    <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-500 text-xs font-bold">
                                        ✅ {updateMessage}
                                    </div>
                                )}

                                <div className="flex gap-4 mt-8">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className={`flex-1 py-3 rounded-xl font-black text-sm transition-colors ${darkMode ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                            }`}
                                    >
                                        CANCELAR
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black text-sm shadow-lg shadow-blue-500/30 transition-all active:scale-95"
                                    >
                                        GUARDAR
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


export default Users;
