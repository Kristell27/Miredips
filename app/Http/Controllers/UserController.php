<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    // Listar usuarios con paginación y filtros
    public function index(Request $request): Response
    {
        $query = User::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
        }

        if ($request->filled('rol')) {
            $query->where('rol', $request->rol);
        }

        $users = $query->orderBy('created_at', 'desc')->paginate(10);

        return Inertia::render('Users/Index', [
            'users' => UserResource::collection($users),
            'filters' => $request->only(['search', 'rol']),
        ]);
    }

    // Formulario para crear usuario
    public function create(): Response
    {
        return Inertia::render('Users/Create');
    }

    // Guardar nuevo usuario
    public function store(UserRequest $request): RedirectResponse
    {
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'rol' => $request->rol ?? 'practicante',
        ]);

        return redirect()->route('users.index')->with('success', 'Usuario creado exitosamente.');
    }

    // Ver detalle de un usuario
    public function show(User $user): Response
    {
        return Inertia::render('Users/Show', [
            'user' => new UserResource($user),
        ]);
    }

    // Formulario para editar usuario
    public function edit(User $user): Response
    {
        return Inertia::render('Users/Edit', [
            'user' => new UserResource($user),
        ]);
    }

    // Actualizar usuario
    public function update(UserRequest $request, User $user): RedirectResponse
    {
        $data = $request->validated();
        unset($data['password']);

        if ($request->filled('password')) {
            $data['password'] = bcrypt($request->password);
        }

        $user->update($data);

        return redirect()->route('users.index')->with('success', 'Usuario actualizado exitosamente.');
    }

    // Eliminar usuario (soft delete)
    public function destroy(User $user): RedirectResponse
    {
        $user->delete();

        return redirect()->route('users.index')->with('success', 'Usuario eliminado exitosamente.');
    }

    // Restaurar usuario eliminado
    public function restore(int $id): RedirectResponse
    {
        $user = User::withTrashed()->findOrFail($id);
        $user->restore();

        return redirect()->route('users.index')->with('success', 'Usuario restaurado exitosamente.');
    }
}
