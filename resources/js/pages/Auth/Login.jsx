import { Head, Link, useForm } from '@inertiajs/react';

// Página de login: formulario simple con email y contraseña
export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    // Al enviar, mandamos a /login con POST
    const handleSubmit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <Head title="Iniciar sesión" />
            
            <div className="w-full max-w-md px-4">
                <div className="bg-white rounded-xl shadow-lg p-8">
                    {/* Logo y título */}
                    <div className="text-center mb-8">
                        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-bold text-lg">M</span>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">MiRed IPS</h1>
                        <p className="text-gray-500 text-sm mt-1">Inicia sesión para continuar</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Campo de email */}
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
                                autoFocus
                            />
                            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                        </div>

                        {/* Campo de contraseña */}
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

                        {/* Checkbox de recordarme */}
                        <div className="flex items-center">
                            <input
                                id="remember"
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                                Recordarme
                            </label>
                        </div>

                        {/* Botón de enviar */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Ingresando...' : 'Iniciar sesión'}
                        </button>
                    </form>

                    {/* Link para ir al registro si no tiene cuenta */}
                    <p className="text-center text-sm text-gray-500 mt-6">
                        ¿No tienes cuenta?{' '}
                        <Link href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                            Regístrate aquí
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
