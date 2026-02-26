import autocannon from "autocannon";
import * as http from "http";
import * as fs from "fs";

const BASE_URL = "http://localhost:3000";

// ─── 1. Obtener token haciendo login ────────────────────────────────────────
// El frontend necesita token para consumir los endpoints protegidos,
// igual que hace el usuario real al iniciar sesión
async function getToken(): Promise<string> {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ email: "demo@demo.com", clave: "Demo1234!" });
    const req = http.request(
      `${BASE_URL}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(data),
        },
      },
      (res: any) => {
        let body = "";
        res.on("data", (chunk: string) => (body += chunk));
        res.on("end", () => {
          try {
            const parsed = JSON.parse(body);
            resolve(parsed.data.token);
          } catch (e) {
            reject(new Error("No se pudo parsear el token."));
          }
        });
      }
    );
    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

// ─── 2. Función reutilizable para correr un test ─────────────────────────────
// "title" es solo para mostrar en consola, "url" es el endpoint a golpear
// 50 conexiones simultáneas durante 10 segundos = prueba de carga real
function runTest(title: string, url: string, token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    console.log(`\n🔥 Ejecutando test: ${title}`);
    console.log(`   URL: ${url}`);
    console.log(`   Conexiones: 50 | Duración: 10s\n`);

    const instance = autocannon(
      {
        url,
        connections: 50,   // 50 usuarios simultáneos
        duration: 10,       // durante 10 segundos
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      (err: Error | null, result: any) => {
        if (err) return reject(err);
        resolve(result);
      }
    );

    autocannon.track(instance, { renderProgressBar: true });
  });
}

// ─── 3. Dar formato al resultado como tabla Markdown ─────────────────────────
function formatResult(title: string, result: any): string {
  return `
## ${title}

| Métrica          | Valor                                   |
|------------------|-----------------------------------------|
| URL              | ${result.url}                           |
| Conexiones       | ${result.connections}                   |
| Duración         | ${result.duration}s                     |
| Requests totales | ${result.requests.total}               |
| Req/s (avg)      | ${result.requests.average}             |
| Req/s (max)      | ${result.requests.max}                 |
| Latencia avg     | ${result.latency.average}ms            |
| Latencia p50     | ${result.latency.p50}ms                |
| Latencia p99     | ${result.latency.p99}ms                |
| Throughput avg   | ${(result.throughput.average / 1024).toFixed(2)} KB/s |
| Errores          | ${result.errors}                        |
| Timeouts         | ${result.timeouts}                      |
`;
}

// ─── 4. Main: corre los tests en secuencia y guarda resultados ───────────────
async function main() {
  console.log("🚀 Frontend Performance Test - Sistema de Citas Médicas");
  console.log("=========================================================\n");

  let token: string;
  try {
    token = await getToken();
    console.log("✅ Token obtenido correctamente");
  } catch (e) {
    console.error("❌ Error: No se pudo conectar al servidor.");
    console.error("   Asegúrate de que el backend esté corriendo con: npm run dev");
    process.exit(1);
  }

  const results: string[] = [];
  results.push("# Frontend - Performance Test Results\n");
  results.push(`**Fecha:** ${new Date().toISOString()}\n`);
  results.push(`**Herramienta:** autocannon\n`);
  results.push(`**Configuración:** 50 conexiones, 10 segundos por test\n`);
  results.push(`**Base URL:** ${BASE_URL}\n`);

  // Test 1: Endpoint que usa DashboardPage para contar pacientes
  const r1 = await runTest("GET /api/pacientes", `${BASE_URL}/api/pacientes`, token);
  results.push(formatResult("GET /api/pacientes", r1));

  // Test 2: Endpoint que usa EspecialidadesPage y los selects de CitasPage
  const r2 = await runTest("GET /api/especialidades", `${BASE_URL}/api/especialidades`, token);
  results.push(formatResult("GET /api/especialidades", r2));

  // Test 3: Endpoint que usa CitasPage (el más pesado: incluye joins de paciente y especialidad)
  const r3 = await runTest("GET /api/citas", `${BASE_URL}/api/citas`, token);
  results.push(formatResult("GET /api/citas", r3));

  // Test 4: Endpoint que usa AuthContext para restaurar la sesión al recargar
  const r4 = await runTest("GET /api/auth/me", `${BASE_URL}/api/auth/me`, token);
  results.push(formatResult("GET /api/auth/me", r4));

  // Guardar todo en PERF.md junto al script
  const perfContent = results.join("\n");
  fs.writeFileSync("PERF.md", perfContent);
  console.log("\n✅ Resultados guardados en PERF.md");
}

main().catch(console.error);