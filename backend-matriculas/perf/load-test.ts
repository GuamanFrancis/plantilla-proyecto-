/* eslint-disable @typescript-eslint/no-var-requires */
const autocannon = require("autocannon");
const http = require("http");
const fs = require("fs");

const BASE_URL = "http://localhost:3000";

async function getToken(): Promise<string> {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ email: "demo@demo.com", clave: "Demo1234!" });
    const req = http.request(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(data) },
    }, (res: any) => {
      let body = "";
      res.on("data", (chunk: string) => (body += chunk));
      res.on("end", () => {
        try { resolve(JSON.parse(body).data.token); }
        catch (e) { reject(new Error("No se pudo obtener token.")); }
      });
    });
    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

function runTest(title: string, url: string, token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    console.log(`\n🔥 Ejecutando test: ${title}`);
    const instance = autocannon({ url, connections: 50, duration: 10, headers: { Authorization: `Bearer ${token}` } },
      (err: Error | null, result: any) => { if (err) return reject(err); resolve(result); });
    autocannon.track(instance, { renderProgressBar: true });
  });
}

function formatResult(title: string, result: any): string {
  return `\n## ${title}\n\n| Métrica | Valor |\n|---------|-------|\n| Requests totales | ${result.requests.total} |\n| Req/s (avg) | ${result.requests.average} |\n| Latencia avg | ${result.latency.average}ms |\n| Latencia p99 | ${result.latency.p99}ms |\n| Errores | ${result.errors} |\n| Timeouts | ${result.timeouts} |\n`;
}

async function main() {
  console.log("🚀 Performance Test - Sistema de Matrículas");
  const token = await getToken();
  console.log("✅ Token obtenido");

  const results = ["# Performance Test - Matrículas\n", `**Fecha:** ${new Date().toISOString()}\n`, "**Config:** 50 conexiones, 10s\n"];

  results.push(formatResult("GET /api/estudiantes", await runTest("GET /api/estudiantes", `${BASE_URL}/api/estudiantes`, token)));
  results.push(formatResult("GET /api/materias", await runTest("GET /api/materias", `${BASE_URL}/api/materias`, token)));
  results.push(formatResult("GET /api/matriculas", await runTest("GET /api/matriculas", `${BASE_URL}/api/matriculas`, token)));

  fs.writeFileSync("PERF.md", results.join("\n"));
  console.log("\n✅ Resultados guardados en PERF.md");
}

main().catch(console.error);
