# ForceDesk

¡Bienvenido a ForceDesk, el gestor de incidencias que usa Yoda!

## 🚀 Descripción
ForceDesk es una plataforma moderna para la gestión de incidencias, con control de roles (MASTER/PADAWAN), autenticación JWT, paginación, filtros mágicos y una interfaz inspirada en Star Wars.

---

## 🐳 Docker: Puesta en marcha rápida

### 1. Clona el repositorio
```bash
git clone <repo-url>
cd ForceDesk
```

### 2. Copia los archivos de ejemplo de entorno
```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

### 3. Construye y levanta los servicios (API, Web y Base de Datos)
```bash
docker-compose up --build
```
Esto levantará:
- **api** (NestJS) en `http://localhost:3001`
- **web** (Next.js) en `http://localhost:3000`
- **db** (PostgreSQL) en `localhost:5432`

### 4. Inicializa la base de datos con datos de muestra

En otra terminal, ejecuta:
```bash
docker-compose exec db psql -U postgres -d forcedesk -f /docker-entrypoint-initdb.d/init-db.sql
```

---

## 🧙‍♂️ Uso local (sin Docker)

1. Instala dependencias en ambos proyectos:
```bash
cd apps/api && npm install
cd ../web && npm install
```
2. Asegúrate de tener PostgreSQL corriendo y configura las variables de entorno en ambos `.env`.
3. Ejecuta migraciones e inicializa la base de datos:
```bash
cd apps/api
npx prisma migrate deploy
psql -U <usuario> -d <basededatos> -f prisma/seed.sql
```
4. Levanta el backend:
```bash
npm run start:dev
```
5. Levanta el frontend:
```bash
cd ../web
npm run dev
```

---

## 🗃️ Datos de muestra
- Usuarios: yoda (MASTER), padawan (PADAWAN)
- Contraseñas: `password` (encriptadas en la base de datos)
- Incidencias de ejemplo para probar la app

---

## 🛡️ Funcionalidades principales
- Login JWT y control de sesión
- Listado, filtrado y paginación de incidencias
- Asignación y cambio de estado de incidencias
- Roles MASTER/PADAWAN
- UI moderna y responsive

---

## 🧑‍💻 Contribuir
¡Pull requests y sugerencias son bienvenidas! Que la fuerza te acompañe.

