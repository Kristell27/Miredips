import AppLayout from '@/layouts/AppLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ProductsCreate() {
    const { data, setData, post, processing, errors } = useForm({
        codigo: '',
        nombre: '',
        categoria: '',
        descripcion: '',
        precio: '',
        stock: '',
        estado: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/products');
    };

    return (
        <AppLayout>
            <Head title="Crear producto" />

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Crear nuevo producto</h1>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 max-w-lg">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Código</label>
                        <input
                            type="text"
                            value={data.codigo}
                            onChange={(e) => setData('codigo', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                        {errors.codigo && <p className="mt-1 text-xs text-red-600">{errors.codigo}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                        <input
                            type="text"
                            value={data.nombre}
                            onChange={(e) => setData('nombre', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                        {errors.nombre && <p className="mt-1 text-xs text-red-600">{errors.nombre}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                        <input
                            type="text"
                            value={data.categoria}
                            onChange={(e) => setData('categoria', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            placeholder="Ej: Medicamentos, Equipos, Insumos"
                        />
                        {errors.categoria && <p className="mt-1 text-xs text-red-600">{errors.categoria}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                        <textarea
                            value={data.descripcion}
                            onChange={(e) => setData('descripcion', e.target.value)}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                        {errors.descripcion && <p className="mt-1 text-xs text-red-600">{errors.descripcion}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Precio (COP)</label>
                            <input
                                type="number"
                                step="0.01"
                                value={data.precio}
                                onChange={(e) => setData('precio', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                            {errors.precio && <p className="mt-1 text-xs text-red-600">{errors.precio}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                            <input
                                type="number"
                                value={data.stock}
                                onChange={(e) => setData('stock', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                            {errors.stock && <p className="mt-1 text-xs text-red-600">{errors.stock}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                        <select
                            value={data.estado ? '1' : '0'}
                            onChange={(e) => setData('estado', e.target.value === '1')}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        >
                            <option value="1">Activo</option>
                            <option value="0">Inactivo</option>
                        </select>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                        >
                            {processing ? 'Guardando...' : 'Crear producto'}
                        </button>
                        <Link
                            href="/products"
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
