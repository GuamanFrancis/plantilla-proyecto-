# Frontend - Performance Test Results

**Fecha:** 2026-02-25T21:11:46.756Z

**Herramienta:** autocannon

**Configuración:** 50 conexiones, 10 segundos por test

**Base URL:** http://localhost:3000


## GET /api/pacientes

| Métrica          | Valor                                   |
|------------------|-----------------------------------------|
| URL              | http://localhost:3000/api/pacientes                           |
| Conexiones       | 50                   |
| Duración         | 10.04s                     |
| Requests totales | 8343               |
| Req/s (avg)      | 834.3             |
| Req/s (max)      | 890                 |
| Latencia avg     | 59.38ms            |
| Latencia p50     | 57ms                |
| Latencia p99     | 125ms                |
| Throughput avg   | 2203.30 KB/s |
| Errores          | 0                        |
| Timeouts         | 0                      |


## GET /api/especialidades

| Métrica          | Valor                                   |
|------------------|-----------------------------------------|
| URL              | http://localhost:3000/api/especialidades                           |
| Conexiones       | 50                   |
| Duración         | 10.03s                     |
| Requests totales | 8902               |
| Req/s (avg)      | 890.2             |
| Req/s (max)      | 978                 |
| Latencia avg     | 55.56ms            |
| Latencia p50     | 53ms                |
| Latencia p99     | 90ms                |
| Throughput avg   | 1916.65 KB/s |
| Errores          | 0                        |
| Timeouts         | 0                      |


## GET /api/citas

| Métrica          | Valor                                   |
|------------------|-----------------------------------------|
| URL              | http://localhost:3000/api/citas                           |
| Conexiones       | 50                   |
| Duración         | 10.04s                     |
| Requests totales | 9529               |
| Req/s (avg)      | 952.9             |
| Req/s (max)      | 1011                 |
| Latencia avg     | 51.93ms            |
| Latencia p50     | 49ms                |
| Latencia p99     | 95ms                |
| Throughput avg   | 1936.55 KB/s |
| Errores          | 0                        |
| Timeouts         | 0                      |


## GET /api/auth/me

| Métrica          | Valor                                   |
|------------------|-----------------------------------------|
| URL              | http://localhost:3000/api/auth/me                           |
| Conexiones       | 50                   |
| Duración         | 10.04s                     |
| Requests totales | 12455               |
| Req/s (avg)      | 1245.5             |
| Req/s (max)      | 1332                 |
| Latencia avg     | 39.64ms            |
| Latencia p50     | 38ms                |
| Latencia p99     | 70ms                |
| Throughput avg   | 445.18 KB/s |
| Errores          | 0                        |
| Timeouts         | 0                      |
