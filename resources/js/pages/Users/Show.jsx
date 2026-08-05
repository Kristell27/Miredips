import AppLayout from '@/layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';

export default function UsersShow({ user }) {
    return (
        <AppLayout>
            <Head title={`Usuario: ${user.name}`} />

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Detalle del usuario</h1>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 max-w-lg">
                <div className="space-y-4">
                    <div>
                        <p className="text-sm text-gray-500">Nombre</p>
                        <p className="text-lg font-medium text-gray-800">{user.name}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="text-lg font-medium text-gray-800">{user.email}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Rol</p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.rol === 'admin' ? 'bg-purple-100 text-purple-800' :
                            user.rol === 'medico' ? 'bg-blue-100 text-blue-800' :
                            user.rol === 'enfermero' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                        }`}>
                            {user.rol}
                        </span>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Creado el</p>
                        <p className="text-lg font-medium text-gray-800">{new Date(user.created_at).toLocaleDateString('es-CO')}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Actualizado el</p>
                        <p className="text-lg font-medium text-gray-800">{new Date(user.updated_at).toLocaleDateString('es-CO')}</p>
                    </div>
                </div>

                <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
                    <Link
                        href={`/users/${user.id}/edit`}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm font-medium hover:bg-yellow-600"
                    >
                        Editar
                    </Link>
                    <Link
                        href="/users"
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300"
                    >
                        Volver
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}
