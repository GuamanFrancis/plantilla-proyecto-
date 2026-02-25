# Performance Test Results

> Ejecuta `npm run perf` con el servidor activo para generar resultados reales.
> Este archivo se sobrescribirá con los resultados del test.

## Configuración

- **Herramienta:** autocannon
- **Conexiones:** 50 concurrentes
- **Duración:** 10 segundos por endpoint
- **Endpoints testeados:**
  - `GET /api/pacientes`
  - `GET /api/especialidades`

## Cómo ejecutar

```bash
# Terminal 1: Levantar servidor
npm run dev

# Terminal 2: Ejecutar performance test
npm run perf
```

Los resultados se escribirán automáticamente en este archivo.
