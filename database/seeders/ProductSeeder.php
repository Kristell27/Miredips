<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $productos = [
            [
                'codigo' => 'MED-001',
                'nombre' => 'Amoxicilina 500mg',
                'categoria' => 'Medicamentos',
                'descripcion' => 'Antibiótico de amplio espectro, caja con 21 cápsulas.',
                'precio' => 8500,
                'stock' => 150,
                'estado' => true,
            ],
            [
                'codigo' => 'MED-002',
                'nombre' => 'Ibuprofeno 400mg',
                'categoria' => 'Medicamentos',
                'descripcion' => 'Antiinflamatorio y analgésico, caja con 30 tabletas.',
                'precio' => 6200,
                'stock' => 200,
                'estado' => true,
            ],
            [
                'codigo' => 'EQU-001',
                'nombre' => 'Oxímetro de pulso',
                'categoria' => 'Equipos',
                'descripcion' => 'Medición de saturación de oxígeno y frecuencia cardíaca.',
                'precio' => 65000,
                'stock' => 25,
                'estado' => true,
            ],
            [
                'codigo' => 'INS-001',
                'nombre' => 'Jeringa descartable 10ml',
                'categoria' => 'Insumos',
                'descripcion' => 'Jeringa estéril de uso médico, empaque individual.',
                'precio' => 800,
                'stock' => 500,
                'estado' => true,
            ],
            [
                'codigo' => 'INS-002',
                'nombre' => 'Guantes de látex (caja)',
                'categoria' => 'Insumos',
                'descripcion' => 'Caja con 100 guantes de látex, talla mediana.',
                'precio' => 12500,
                'stock' => 80,
                'estado' => true,
            ],
            [
                'codigo' => 'EQU-002',
                'nombre' => 'Tensiómetro digital',
                'categoria' => 'Equipos',
                'descripcion' => 'Medición de presión arterial con display LCD.',
                'precio' => 95000,
                'stock' => 15,
                'estado' => true,
            ],
            [
                'codigo' => 'MED-003',
                'nombre' => 'Paracetamol 500mg',
                'categoria' => 'Medicamentos',
                'descripcion' => 'Analgésico y antipirético, caja con 20 tabletas.',
                'precio' => 3200,
                'stock' => 300,
                'estado' => true,
            ],
            [
                'codigo' => 'INS-003',
                'nombre' => 'Alcohol isopropílico 500ml',
                'categoria' => 'Insumos',
                'descripcion' => 'Antiséptico para desinfección de superficies y piel.',
                'precio' => 4800,
                'stock' => 100,
                'estado' => false,
            ],
            [
                'codigo' => 'MED-004',
                'nombre' => 'Omeprazol 20mg',
                'categoria' => 'Medicamentos',
                'descripcion' => 'Inhibidor de la bomba de protones, caja con 14 cápsulas.',
                'precio' => 7500,
                'stock' => 75,
                'estado' => true,
            ],
            [
                'codigo' => 'EQU-003',
                'nombre' => 'Termómetro infrarrojo',
                'categoria' => 'Equipos',
                'descripcion' => 'Termómetro sin contacto para medición rápida de temperatura.',
                'precio' => 45000,
                'stock' => 30,
                'estado' => true,
            ],
        ];

        foreach ($productos as $producto) {
            Product::create($producto);
        }
    }
}
