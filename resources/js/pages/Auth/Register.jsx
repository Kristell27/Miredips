import { Head, Link, useForm } from '@inertiajs/react';

// Página de registro: crear nueva cuenta con nombre, email, rol y contraseña
export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        rol: 'practicante',
    });

    // Al enviar, mandamos a /register con POST
    const handleSubmit = (e) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <Head title="Registro" />
            
            <div className="w-full max-w-md px-4">
                <div className="bg-white rounded-xl shadow-lg p-8">
                    {/* Logo y título */}
                    <div className="text-center mb-8">
                        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-bold text-lg">M</span>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">Crear cuenta</h1>
                        <p className="text-gray-500 text-sm mt-1">MiRed IPS - Sistema de gestión</p>
                    </div>

                    {/* Formulario */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Nombre */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Nombre completo
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                                    errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                }`}
                                placeholder="Tu nombre"
                                autoFocus
                            />
                            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Correo electrónico
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                                    errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                }`}
                                placeholder="tucorreo@miredips.com"
                            />
                            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                        </div>

                        {/* Rol */}
                        <div>
                            <label htmlFor="rol" className="block text-sm font-medium text-gray-700 mb-1">
                                Rol
                            </label>
                            <select
                                id="rol"
                                value={data.rol}
                                onChange={(e) => setData('rol', e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            >
                                <option value="practicante">Practicante</option>
                                <option value="administrador">Administrador</option>
                                <option value="medico">Médico</option>
                                <option value="enfermero">Enfermero</option>
                            </select>
                            {errors.rol && <p className="mt-1 text-xs text-red-600">{errors.rol}</p>}
                        </div>

                        {/* Contraseña */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Contraseña
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                                    errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                }`}
                                placeholder="••••••••"
                            />
                            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
                        </div>

                        {/* Confirmar contraseña */}
                        <div>
                            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-1">
                                Confirmar contraseña
                            </label>
                            <input
                                id="password_confirmation"
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                placeholder="••••••••"
                            />
                        </div>

                        {/* Botón submit */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                        >
                            {processing ? 'Creando cuenta...' : 'Crear cuenta'}
                        </button>
                    </form>

                    {/* Enlace a login */}
                    <p className="text-center text-sm text-gray-500 mt-6">
                        ¿Ya tienes cuenta?{' '}
                        <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                            Inicia sesión
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
