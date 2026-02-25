import React, { useState, useEffect } from 'react';

const Users = () => {
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
            const response = await fetch('http://localhost:5000/update-password', {
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
        <div className="h-full overflow-y-auto bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                        👥 Usuarios Registrados
                    </h1>
                    <p className="text-gray-300">Lista de usuarios con contraseñas hasheadas</p>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center h-64">
                        <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-red-500/20 border border-red-500 rounded-xl p-6 text-center">
                        <h3 className="font-bold text-lg mb-2">⚠️ Error</h3>
                        <p>{error}</p>
                        <button
                            onClick={fetchUsers}
                            className="mt-4 px-6 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                        >
                            Reintentar
                        </button>
                    </div>
                )}

                {/* Users Table */}
                {!loading && !error && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white/5 backdrop-blur-lg rounded-lg border border-white/20">
                            <thead>
                                <tr className="bg-white/10">
                                    <th className="px-4 py-2 text-left text-gray-300">Usuario</th>
                                    <th className="px-4 py-2 text-left text-gray-300">Correo</th>
                                    <th className="px-4 py-2 text-left text-gray-300">Password (hash)</th>
                                    <th className="px-4 py-2 text-left text-gray-300">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((u, idx) => (
                                    <tr
                                        key={idx}
                                        className="border-b border-white/10 hover:bg-white/15 transition-colors"
                                    >
                                        <td className="px-4 py-2 text-gray-200">{u.username}</td>
                                        <td className="px-4 py-2 text-gray-200">{u.email}</td>
                                        <td className="px-4 py-2 text-gray-200 break-all font-mono text-xs">{u.password}</td>
                                        <td className="px-4 py-2">
                                            <button
                                                onClick={() => handleModifyClick(u.email)}
                                                className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded text-sm transition-colors"
                                            >
                                                Modificar
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
                    <div className="mt-8 text-center">
                        <button
                            onClick={fetchUsers}
                            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-xl font-bold shadow-lg transform transition-all duration-200 hover:-translate-y-1 hover:shadow-purple-500/50"
                        >
                            🔄 Actualizar Lista
                        </button>
                    </div>
                )}

                {/* Modify Password Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4">
                        <div className="bg-gray-800 border border-white/10 rounded-xl p-6 w-full max-w-md shadow-2xl">
                            <h2 className="text-2xl font-bold mb-4 text-white">Modificar Contraseña</h2>
                            <p className="text-gray-400 mb-4 text-sm">Usuario: {selectedUserEmail}</p>

                            <form onSubmit={handleUpdatePassword} className="space-y-4">
                                <div>
                                    <label className="block text-gray-300 mb-1 text-sm">Contraseña Anterior</label>
                                    <input
                                        type="password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white focus:border-blue-500 focus:outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 mb-1 text-sm">Nueva Contraseña</label>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white focus:border-blue-500 focus:outline-none"
                                        required
                                    />
                                </div>

                                {updateError && (
                                    <div className="p-2 bg-red-500/20 border border-red-500 rounded text-red-200 text-sm">
                                        {updateError}
                                    </div>
                                )}
                                {updateMessage && (
                                    <div className="p-2 bg-green-500/20 border border-green-500 rounded text-green-200 text-sm">
                                        {updateMessage}
                                    </div>
                                )}

                                <div className="flex justify-end space-x-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded text-white transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white transition-colors font-bold"
                                    >
                                        Actualizar
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
