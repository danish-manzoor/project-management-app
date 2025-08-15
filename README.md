# Project Management System Laravel + React

A simple **Project Management System** built with Laravel + React, allowing you to manage projects, create tasks, and assign them to team members.

## Features

-   Add and manage projects
-   Create and assign tasks
-   Track task progress
-   User-friendly interface

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/danish-manzoor/project-management-app.git
cd project-management-system
```

### 2. Install dependencies

```bash
composer install
npm install
```

### 3. Environment setup

Copy the .env.example file to .env:

```bash
cp .env.example .env
```

Then update your .env file with your database credentials.

### 4. Generate application key

```bash
php artisan key:generate
```

### 5. Run migrations & seed database

```bash
php artisan migrate --seed
```

### 6. Build frontend assets

```bash
npm run dev
```

### 7. Start the development server

```bash
php artisan serve
```

## Default Credentials

Email: admin@example.com
Password: password

## Requirements

PHP >= 8.2

Composer

Node.js & NPM

MySQL
