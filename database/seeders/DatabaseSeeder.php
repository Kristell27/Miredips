<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Usuario admin para pruebas
        User::create([
            'name' => 'Administrador',
            'email' => 'admin@miredips.com',
            'password' => Hash::make('password123'),
            'rol' => 'admin',
        ]);

        // Usuarios de prueba
        User::create([
            'name' => 'Carlos Perez',
            'email' => 'carlos.perez@miredips.com',
            'password' => Hash::make('password123'),
            'rol' => 'medico',
        ]);

        User::create([
            'name' => 'Maira Garcia',
            'email' => 'maira.garcia@miredips.com',
            'password' => Hash::make('password123'),
            'rol' => 'enfermero',
        ]);

        User::create([
            'name' => 'Kristell Martinez',
            'email' => 'kristell.martinez@miredips.com',
            'password' => Hash::make('password123'),
            'rol' => 'practicante',
        ]);
        // Cargar productos de prueba
        $this->call(ProductSeeder::class);
    }
}
