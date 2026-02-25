# Backend - Sistema de Citas Médicas

API REST completa con arquitectura MVC para gestión de pacientes, especialidades y citas médicas.

## Stack Tecnológico

- **Runtime:** Node.js + TypeScript
- **Framework:** Express
- **ORM:** Prisma
- **Base de datos:** SQLite
- **Autenticación:** JWT (jsonwebtoken) + bcrypt
- **Validación:** Zod
- **CORS:** habilitado

## Estructura del Proyecto

```
src/
├── app.ts                          # Configuración de Express
├── server.ts                       # Punto de entrada
├── config/
│   └── env.ts                      # Variables de entorno
├── db/
│   ├── client.ts                   # Instancia de Prisma
│   ├── seed.ts                     # Datos de prueba
│   └── prisma/
│       └── schema.prisma           # Esquema de BD
├── middlewares/
│   ├── auth.ts                     # Middleware JWT
│   └── errorHandler.ts             # Manejo global de errores
├── modules/
│   ├── auth/                       # Login, me, logout
│   ├── pacientes/                  # CRUD pacientes
│   ├── especialidades/             # CRUD especialidades
│   └── citas/                      # CRUD citas (relación)
└── utils/
    ├── httpErrors.ts               # Clases de error HTTP
    └── responses.ts                # Helpers de respuesta
```

## Instalación y Ejecución

```bash
# 1. Instalar dependencias
npm install

# 2. Generar cliente Prisma y crear BD + seed
npm run setup

# 3. Iniciar servidor en desarrollo
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

## Variables de Entorno (.env)

```env
PORT=3000
DATABASE_URL="file:./dev.db"
JWT_SECRET="super-secret-key-change-in-production"
JWT_EXPIRES_IN="8h"
```

## Credenciales Demo

| Campo   | Valor          |
|---------|----------------|
| Email   | demo@demo.com  |
| Clave   | Demo1234!      |
| Nombre  | Demo User      |

## Endpoints

### Auth

```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@demo.com","clave":"Demo1234!"}'

# Obtener usuario actual (requiere token)
curl http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer <TOKEN>"

# Logout
curl -X POST http://localhost:3000/api/auth/logout \
  -H "Authorization: Bearer <TOKEN>"
```

### Pacientes (requiere token)

```bash
# Listar todos
curl http://localhost:3000/api/pacientes \
  -H "Authorization: Bearer <TOKEN>"

# Obtener por ID
curl http://localhost:3000/api/pacientes/1 \
  -H "Authorization: Bearer <TOKEN>"

# Crear
curl -X POST http://localhost:3000/api/pacientes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{"nombre":"Ana","apellido":"Martínez","cedula":"5566778899","telefono":"0998877665"}'

# Actualizar
curl -X PUT http://localhost:3000/api/pacientes/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{"telefono":"0991111111"}'

# Eliminar
curl -X DELETE http://localhost:3000/api/pacientes/1 \
  -H "Authorization: Bearer <TOKEN>"
```

### Especialidades (requiere token)

```bash
# Listar todas
curl http://localhost:3000/api/especialidades \
  -H "Authorization: Bearer <TOKEN>"

# Obtener por ID
curl http://localhost:3000/api/especialidades/1 \
  -H "Authorization: Bearer <TOKEN>"

# Crear
curl -X POST http://localhost:3000/api/especialidades \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{"nombre":"Neurología","descripcion":"Especialidad del sistema nervioso"}'

# Actualizar
curl -X PUT http://localhost:3000/api/especialidades/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{"descripcion":"Nueva descripción"}'

# Eliminar
curl -X DELETE http://localhost:3000/api/especialidades/1 \
  -H "Authorization: Bearer <TOKEN>"
```

### Citas (requiere token)

```bash
# Listar todas (con filtros opcionales)
curl http://localhost:3000/api/citas \
  -H "Authorization: Bearer <TOKEN>"

# Filtrar por paciente
curl "http://localhost:3000/api/citas?pacienteId=1" \
  -H "Authorization: Bearer <TOKEN>"

# Filtrar por especialidad
curl "http://localhost:3000/api/citas?especialidadId=1" \
  -H "Authorization: Bearer <TOKEN>"

# Obtener por ID
curl http://localhost:3000/api/citas/1 \
  -H "Authorization: Bearer <TOKEN>"

# Crear cita
curl -X POST http://localhost:3000/api/citas \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{"pacienteId":1,"especialidadId":2,"fecha":"2026-04-01T10:00:00Z","motivo":"Consulta general"}'

# Eliminar cita
curl -X DELETE http://localhost:3000/api/citas/1 \
  -H "Authorization: Bearer <TOKEN>"
```

## Respuestas de Error

| Código | Tipo             | Descripción                    |
|--------|------------------|--------------------------------|
| 400    | VALIDATION_ERROR | Datos de entrada inválidos     |
| 401    | UNAUTHORIZED     | Token inválido o no provisto   |
| 404    | NOT_FOUND        | Recurso no encontrado          |
| 409    | CONFLICT         | Registro duplicado             |
| 500    | INTERNAL_ERROR   | Error interno del servidor     |

## Scripts Disponibles

| Script            | Descripción                             |
|-------------------|-----------------------------------------|
| `npm run dev`     | Servidor en modo desarrollo (hot reload)|
| `npm run build`   | Compilar TypeScript                     |
| `npm run start`   | Ejecutar build compilado                |
| `npm run setup`   | Crear BD + generar Prisma + seed        |
| `npm run seed`    | Ejecutar solo el seed                   |
| `npm run perf`    | Test de rendimiento con autocannon      |

## Performance Test

```bash
# Con el servidor corriendo en otra terminal:
npm run perf
```

Los resultados se guardan en `PERF.md`.
