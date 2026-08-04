import AppLayout from '@/layouts/AppLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function UsersEdit({ user }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        rol: user.rol,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/users/${user.id}`);
    };

    return (
        <AppLayout>
            <Head title="Editar usuario" />

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Editar usuario</h1>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 max-w-lg">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Contraseña (dejar vacío para no cambiar)
                        </label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                        {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
                        <select
                            value={data.rol}
                            onChange={(e) => setData('rol', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        >
                            <option value="practicante">Practicante</option>
                            <option value="medico">Médico</option>
                            <option value="enfermero">Enfermero</option>
                            <option value="admin">Administrador</option>
                        </select>
                        {errors.rol && <p className="mt-1 text-xs text-red-600">{errors.rol}</p>}
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                        >
                            {processing ? 'Actualizando...' : 'Actualizar usuario'}
                        </button>
                        <Link
                            href="/users"
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300"
                        >
                            Cancelar
                        </Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
