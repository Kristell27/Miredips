# MiRed IPS

Sistema de gestión de inventario médico para la IPS MiRed.

## Tecnologías usadas

- Laravel 13

- PHP 8.4

- React (Inertia.js)

- Tailwind CSS

- MySQL

## Requisitos

- PHP >= 8.4

- Composer

- Node.js >= 18

- NPM

- MySQL (use xampp)

## Instalación

1. Clonar el repositorio:

git clone https://github.com/Kristell27/Miredips.git
cd miredips

1. Instalar dependencias de PHP:

composer install

1. Instalar dependencias de Node:

npm install

1. Configurar el archivo .env:

cp .env.example .env
php artisan key:generate


1. Editar el `.env` con los datos de conexión MySQL:

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=mi_red_ips_db
DB_USERNAME=root
DB_PASSWORD=

1. Crear la base de datos en MySQL:

CREATE DATABASE mi_red_ips_db CHARACTER SET utf8mb4;

1. Ejecutar migraciones y seeders:

php artisan migrate:fresh --seed

1. Compilar el frontend:

npm run build


## Desarrollo

composer run dev

> Nota: En Windows, si el comando llegase a fallar por Pail, eliminar la línea de `php artisan pail` del script `dev` en `composer.json`.

## Credenciales de prueba

| Rol | Email | Contraseña |
| --- | --- | --- |
| Admin | [admin@miredips.com](mailto:admin@miredips.com) | password123 |
| Médico | [carlos.perez@miredips.com](mailto:carlos.perez@miredips.com) | password123 |
| Enfermero | [maira.garcia@miredips.com](mailto:maira.garcia@miredips.com) | password123 |
| Practicante | [kristell.martinez@miredips.com](mailto:kristell.martinez@miredips.com) | password123 |

## Funcionalidades

- Autenticación (login, registro, logout )

- CRUD de usuarios con filtros por rol y búsqueda

- CRUD de productos con filtros por categoría y estado

- Edición de perfil personal

- Soft deletes en usuarios y productos

- Form Requests con validaciones

- API Resources para respuestas JSON

- Diseño responsivo con Tailwind CSS