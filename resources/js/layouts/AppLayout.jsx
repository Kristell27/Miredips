import { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';

// Este es el layout que envuelve todas las páginas protegidas
// Incluye la barra de navegación, los mensajes flash y el contenedor principal
export default function AppLayout({ children }) {
    const { auth, flash } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Cerrar sesión: mandamos POST a /logout
    const handleLogout = () => {
        router.post('/logout');
    };

    // Navegación: definimos los links y verificamos si estamos en la ruta activa
    const { component } = usePage();
    const navItems = [
        { href: '/products', label: 'Productos', active: component.startsWith('Products') },
        { href: '/users', label: 'Usuarios', active: component.startsWith('Users') },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Barra de navegación */}
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            {/* Botón hamburguesa para móvil */}
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>

                            {/* Logo */}
                            <Link href="/products" className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">M</span>
                                </div>
                                <span className="font-semibold text-gray-800 text-lg">MiRed IPS</span>
                            </Link>
                        </div>

                        {/* Links de navegación (desktop) */}
                        <div className="hidden md:flex items-center space-x-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                        item.active
                                            ? 'text-blue-600 bg-blue-50'
                                            : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>

                        {/* Nombre del usuario y botón de logout */}
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-600 hidden sm:block">
                                {auth.user?.name}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="text-sm text-gray-500 hover:text-red-600 transition-colors"
                            >
                                Cerrar sesión
                            </button>
                        </div>
                    </div>
                </div>

                {/* Menú desplegable para móvil */}
                {sidebarOpen && (
                    <div className="md:hidden border-t border-gray-200">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                                        item.active
                                            ? 'text-blue-600 bg-blue-50'
                                            : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </nav>

            {/* Alertas flash: se muestran solo cuando hay un mensaje */}
            {flash.success && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
                        <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="5 13l4 4L19 7" />
                        </svg>
                        <p className="text-green-700 text-sm">{flash.success}</p>
                    </div>
                </div>
            )}

            {flash.error && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                        <svg className="h-5 w-5 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <p className="text-red-700 text-sm">{flash.error}</p>
                    </div>
                </div>
            )}

            {/* Aquí va el contenido de cada página */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
}
