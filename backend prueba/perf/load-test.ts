/* eslint-disable @typescript-eslint/no-var-requires */
const autocannon = require("autocannon");
const http = require("http");
const fs = require("fs");

const BASE_URL = "http://localhost:3000";

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
            reject(new Error("No se pudo obtener token. ¿El servidor está corriendo?"));
          }
        });
      }
    );
    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

function runTest(title: string, url: string, token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    console.log(`\n🔥 Ejecutando test: ${title}`);
    console.log(`   URL: ${url}`);
    console.log(`   Conexiones: 50 | Duración: 10s\n`);

    const instance = autocannon(
      {
        url,
        connections: 50,
        duration: 10,
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

function formatResult(title: string, result: any): string {
  return `
## ${title}

| Métrica         | Valor           |
|-----------------|-----------------|
| URL             | ${result.url}   |
| Conexiones      | ${result.connections} |
| Duración        | ${result.duration}s |
| Requests totales| ${result.requests.total} |
| Req/s (avg)     | ${result.requests.average} |
| Req/s (min)     | ${result.requests.min} |
| Req/s (max)     | ${result.requests.max} |
| Latencia avg    | ${result.latency.average}ms |
| Latencia p50    | ${result.latency.p50}ms |
| Latencia p99    | ${result.latency.p99}ms |
| Throughput avg  | ${(result.throughput.average / 1024).toFixed(2)} KB/s |
| Errores         | ${result.errors} |
| Timeouts        | ${result.timeouts} |
`;
}

async function main() {
  console.log("🚀 Performance Test - Sistema de Citas Médicas");
  console.log("================================================\n");

  let token: string;
  try {
    token = await getToken();
    console.log("✅ Token obtenido correctamente");
  } catch (e) {
    console.error("❌ Error: No se pudo conectar al servidor.");
    console.error("   Asegúrate de que el servidor esté corriendo con: npm run dev");
    process.exit(1);
  }

  const results: string[] = [];
  results.push("# Performance Test Results\n");
  results.push(`**Fecha:** ${new Date().toISOString()}\n`);
  results.push(`**Herramienta:** autocannon\n`);
  results.push(`**Configuración:** 50 conexiones, 10 segundos\n`);

  // Test GET /api/pacientes
  const r1 = await runTest("GET /api/pacientes", `${BASE_URL}/api/pacientes`, token);
  results.push(formatResult("GET /api/pacientes", r1));

  // Test GET /api/especialidades
  const r2 = await runTest("GET /api/especialidades", `${BASE_URL}/api/especialidades`, token);
  results.push(formatResult("GET /api/especialidades", r2));

  // Escribir resultados
  const perfContent = results.join("\n");
  fs.writeFileSync("PERF.md", perfContent);
  console.log("\n✅ Resultados guardados en PERF.md");
}

main().catch(console.error);
