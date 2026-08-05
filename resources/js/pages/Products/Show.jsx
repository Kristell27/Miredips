import AppLayout from '@/layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';

export default function ProductsShow({ product }) {
    const formatPrecio = (precio) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
        }).format(precio);
    };

    return (
        <AppLayout>
            <Head title={`Producto: ${product.nombre}`} />

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Detalle del producto</h1>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 max-w-lg">
                <div className="space-y-4">
                    <div>
                        <p className="text-sm text-gray-500">Código</p>
                        <p className="text-lg font-medium text-gray-800">{product.codigo}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Nombre</p>
                        <p className="text-lg font-medium text-gray-800">{product.nombre}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Categoría</p>
                        <p className="text-lg font-medium text-gray-800">{product.categoria}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Descripción</p>
                        <p className="text-base text-gray-700">{product.descripcion || 'Sin descripción'}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-500">Precio</p>
                            <p className="text-lg font-medium text-gray-800">{formatPrecio(product.precio)}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Stock</p>
                            <p className="text-lg font-medium text-gray-800">{product.stock}</p>
                        </div>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Estado</p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            product.estado
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                        }`}>
                            {product.estado ? 'Activo' : 'Inactivo'}
                        </span>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Creado el</p>
                        <p className="text-base text-gray-700">{new Date(product.created_at).toLocaleDateString('es-CO')}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Actualizado el</p>
                        <p className="text-base text-gray-700">{new Date(product.updated_at).toLocaleDateString('es-CO')}</p>
                    </div>
                </div>

                <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
                    <Link
                        href={`/products/${product.id}/edit`}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm font-medium hover:bg-yellow-600"
                    >
                        Editar
                    </Link>
                    <Link
                        href="/products"
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300"
                    >
                        Volver
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}
