# Backend - Sistema de Gestión de Matrículas (Caso 1)

## Stack
- Node.js + TypeScript + Express
- Prisma ORM + SQLite
- JWT + bcrypt

## Entidades
- **Estudiante**: nombre, apellido, cedula, email?
- **Materia**: nombre, codigo, descripcion?
- **Matricula**: estudianteId, materiaId, fecha, observacion? (relacional)

## Cómo correr

```bash
npm install
npm run setup   # crea DB + corre seed
npm run dev     # inicia en http://localhost:3000
```

## Credenciales demo
- Email: demo@demo.com
- Clave: Demo1234!

## Endpoints
- POST /api/auth/login
- GET  /api/auth/me
- CRUD /api/estudiantes
- CRUD /api/materias
- CRUD /api/matriculas

## Pruebas de rendimiento
```bash
npm run perf
```
