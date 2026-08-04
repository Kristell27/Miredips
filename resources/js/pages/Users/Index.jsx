import AppLayout from '@/layouts/AppLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function UsersIndex({ users, filters }) {
    const { data, setData, get } = useForm({
        search: filters.search || '',
        rol: filters.rol || '',
    });

    const handleSearch = (e) => {
        e.preventDefault();
        get('/users', {
            preserveState: true,
        });
    };

    const handleClear = () => {
        setData({ search: '', rol: '' });
        get('/users');
    };

    const handleDelete = (id) => {
        if (confirm('¿Estás seguro de eliminar este usuario?')) {
            useForm().delete(`/users/${id}`);
        }
    };

    return (
        <AppLayout>
            <Head title="Usuarios" />

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Usuarios</h1>
                <p className="text-gray-500 text-sm mt-1">Gestiona los usuarios del sistema</p>
            </div>

            {/* Barra de búsqueda y filtros */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <form onSubmit={handleSearch} className="flex flex-wrap gap-3">
                    <input
                        type="text"
                        value={data.search}
                        onChange={(e) => setData('search', e.target.value)}
                        placeholder="Buscar por nombre o email..."
                        className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                    <select
                        value={data.rol}
                        onChange={(e) => setData('rol', e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                        <option value="">Todos los roles</option>
                        <option value="admin">Administrador</option>
                        <option value="medico">Médico</option>
                        <option value="enfermero">Enfermero</option>
                        <option value="practicante">Practicante</option>
                    </select>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                    >
                        Buscar
                    </button>
                    <button
                        type="button"
                        onClick={handleClear}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300"
                    >
                        Limpiar
                    </button>
                    <Link
                        href="/users/create"
                        className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 ml-auto"
                    >
                        Nuevo usuario
                    </Link>
                </form>
            </div>

            {/* Tabla de usuarios */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rol</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Creado</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {users.data.length > 0 ? (
                            users.data.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-gray-900">{user.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            user.rol === 'admin' ? 'bg-purple-100 text-purple-800' :
                                            user.rol === 'medico' ? 'bg-blue-100 text-blue-800' :
                                            user.rol === 'enfermero' ? 'bg-green-100 text-green-800' :
                                            'bg-gray-100 text-gray-800'
                                        }`}>
                                            {user.rol}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{user.created_at}</td>
                                    <td className="px-6 py-4 text-right text-sm space-x-2">
                                        <Link
                                            href={`/users/${user.id}`}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            Ver
                                        </Link>
                                        <Link
                                            href={`/users/${user.id}/edit`}
                                            className="text-yellow-600 hover:text-yellow-800"
                                        >
                                            Editar
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                    No se encontraron usuarios.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Paginación */}
                {users.links && users.links.length > 3 && (
                    <div className="flex justify-center py-4 border-t border-gray-200">
                        {users.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || '#'}
                                className={`mx-1 px-3 py-1 rounded text-sm ${
                                    link.active
                                        ? 'bg-blue-600 text-white'
                                        : link.url
                                        ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
