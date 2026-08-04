import AppLayout from '@/layouts/AppLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ProductsIndex({ products, filters, categories }) {
    const { data, setData, get } = useForm({
        search: filters.search || '',
        categoria: filters.categoria || '',
        estado: filters.estado || '',
    });

    const handleSearch = (e) => {
        e.preventDefault();
        get('/products', {
            preserveState: true,
        });
    };

    const handleClear = () => {
        setData({ search: '', categoria: '', estado: '' });
        get('/products');
    };

    const handleDelete = (id) => {
        if (confirm('¿Estás seguro de eliminar este producto?')) {
            useForm().delete(`/products/${id}`);
        }
    };

    const formatPrecio = (precio) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
        }).format(precio);
    };

    return (
        <AppLayout>
            <Head title="Productos" />

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Productos</h1>
                <p className="text-gray-500 text-sm mt-1">Gestiona el inventario de la IPS</p>
            </div>

            {/* Barra de filtros */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <form onSubmit={handleSearch} className="flex flex-wrap gap-3">
                    <input
                        type="text"
                        value={data.search}
                        onChange={(e) => setData('search', e.target.value)}
                        placeholder="Buscar por nombre o código..."
                        className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                    <select
                        value={data.categoria}
                        onChange={(e) => setData('categoria', e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                        <option value="">Todas las categorías</option>
                        {categories.map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <select
                        value={data.estado}
                        onChange={(e) => setData('estado', e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                        <option value="">Todos los estados</option>
                        <option value="activo">Activo</option>
                        <option value="inactivo">Inactivo</option>
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
                        href="/products/create"
                        className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 ml-auto"
                    >
                        Nuevo producto
                    </Link>
                </form>
            </div>

            {/* Tabla de productos */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Código</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoría</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Precio</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Stock</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Estado</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {products.data.length > 0 ? (
                            products.data.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{product.codigo}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{product.nombre}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{product.categoria}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900 text-right font-medium">{product.precio}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900 text-right">{product.stock}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            product.estado_texto === 'Activo'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {product.estado_texto}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right text-sm space-x-2">
                                        <Link
                                            href={`/products/${product.id}`}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            Ver
                                        </Link>
                                        <Link
                                            href={`/products/${product.id}/edit`}
                                            className="text-yellow-600 hover:text-yellow-800"
                                        >
                                            Editar
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                                    No se encontraron productos.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Paginación */}
                {products.links && products.links.length > 3 && (
                    <div className="flex justify-center py-4 border-t border-gray-200">
                        {products.links.map((link, index) => (
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
