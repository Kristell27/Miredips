<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    // Listar productos con filtros y paginación
    public function index(Request $request): Response
    {
        $query = Product::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where('nombre', 'like', "%{$search}%")
                  ->orWhere('codigo', 'like', "%{$search}%");
        }

        if ($request->filled('categoria')) {
            $query->where('categoria', $request->categoria);
        }

        if ($request->filled('estado')) {
            $query->where('estado', $request->estado === 'activo');
        }

        $products = $query->orderBy('created_at', 'desc')->paginate(10);

        // Obtener categorías únicas para el filtro
        $categories = Product::distinct()->pluck('categoria')->sort()->values();

        return Inertia::render('Products/Index', [
            'products' => ProductResource::collection($products),
            'filters' => $request->only(['search', 'categoria', 'estado']),
            'categories' => $categories,
        ]);
    }

    // Formulario para crear producto
    public function create(): Response
    {
        return Inertia::render('Products/Create');
    }

    // Guardar nuevo producto
    public function store(ProductRequest $request): RedirectResponse
    {
        Product::create($request->validated());

        return redirect()->route('products.index')->with('success', 'Producto creado exitosamente.');
    }

    // Ver detalle de un producto
    public function show(Product $product): Response
    {
        return Inertia::render('Products/Show', [
            'product' => new ProductResource($product),
        ]);
    }

    // Formulario para editar producto
    public function edit(Product $product): Response
    {
        return Inertia::render('Products/Edit', [
            'product' => new ProductResource($product),
        ]);
    }

    // Actualizar producto
    public function update(ProductRequest $request, Product $product): RedirectResponse
    {
        $product->update($request->validated());

        return redirect()->route('products.index')->with('success', 'Producto actualizado exitosamente.');
    }

    // Eliminar producto (soft delete)
    public function destroy(Product $product): RedirectResponse
    {
        $product->delete();

        return redirect()->route('products.index')->with('success', 'Producto eliminado exitosamente.');
    }

    // Restaurar producto eliminado
    public function restore(int $id): RedirectResponse
    {
        $product = Product::withTrashed()->findOrFail($id);
        $product->restore();

        return redirect()->route('products.index')->with('success', 'Producto restaurado exitosamente.');
    }
}
