import AppLayout from '@/layouts/AppLayout';
import { Head, useForm } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

export default function ProfileEdit() {
    const { auth } = usePage().props;
    const user = auth.user;

    const { data, setData, put, processing, errors, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        rol: user.rol,
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const handleUpdate = (e) => {
        e.preventDefault();
        put('/profile');
    };

    return (
        <AppLayout>
            <Head title="Mi perfil" />

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Mi perfil</h1>
                <p className="text-gray-500 text-sm mt-1">Actualiza tus datos personales</p>
            </div>

            {/* Datos personales */}
            <div className="bg-white rounded-lg shadow-sm p-6 max-w-lg mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Información personal</h2>

                <form onSubmit={handleUpdate} className="space-y-4">
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

                    <div className="flex items-center gap-3 pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                        >
                            {processing ? 'Guardando...' : 'Guardar cambios'}
                        </button>

                        {recentlySuccessful && (
                            <span className="text-sm text-green-600">Guardado.</span>
                        )}
                    </div>
                </form>
            </div>

            {/* Cambiar contraseña */}
            <div className="bg-white rounded-lg shadow-sm p-6 max-w-lg">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Cambiar contraseña</h2>

                <form onSubmit={(e) => { e.preventDefault(); put('/profile'); }} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña actual</label>
                        <input
                            type="password"
                            value={data.current_password}
                            onChange={(e) => setData('current_password', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                        {errors.current_password && <p className="mt-1 text-xs text-red-600">{errors.current_password}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nueva contraseña</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                        {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar contraseña</label>
                        <input
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                        {errors.password_confirmation && <p className="mt-1 text-xs text-red-600">{errors.password_confirmation}</p>}
                    </div>

                    <div className="flex items-center gap-3 pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                        >
                            {processing ? 'Actualizando...' : 'Actualizar contraseña'}
                        </button>

                        {recentlySuccessful && (
                            <span className="text-sm text-green-600">Guardado.</span>
                        )}
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
