/* eslint-disable @typescript-eslint/no-var-requires */
const autocannon = require("autocannon");
const http = require("http");
const fs = require("fs");

const BASE_URL = "http://localhost:3000";

async function getToken(): Promise<string> {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ email: "demo@demo.com", clave: "Demo1234!" });
    const req = http.request(`${BASE_URL}/api/auth/login`, { method: "POST", headers: { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(data) } },
      (res: any) => { let body = ""; res.on("data", (c: string) => (body += c)); res.on("end", () => { try { resolve(JSON.parse(body).data.token); } catch { reject(new Error("No token")); } }); });
    req.on("error", reject); req.write(data); req.end();
  });
}

function runTest(title: string, url: string, token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    console.log(`\n🔥 ${title}`);
    const instance = autocannon({ url, connections: 50, duration: 10, headers: { Authorization: `Bearer ${token}` } },
      (err: Error | null, result: any) => { if (err) return reject(err); resolve(result); });
    autocannon.track(instance, { renderProgressBar: true });
  });
}

function fmt(title: string, r: any): string {
  return `\n## ${title}\n\n| Métrica | Valor |\n|---------|-------|\n| Requests totales | ${r.requests.total} |\n| Req/s (avg) | ${r.requests.average} |\n| Latencia avg | ${r.latency.average}ms |\n| Errores | ${r.errors} |\n`;
}

async function main() {
  console.log("🚀 Performance Test - Conferencias");
  const token = await getToken();
  const results = ["# Performance Test - Conferencias\n", `**Fecha:** ${new Date().toISOString()}\n`];
  results.push(fmt("GET /api/conferencistas", await runTest("GET /api/conferencistas", `${BASE_URL}/api/conferencistas`, token)));
  results.push(fmt("GET /api/auditorios", await runTest("GET /api/auditorios", `${BASE_URL}/api/auditorios`, token)));
  results.push(fmt("GET /api/reservas", await runTest("GET /api/reservas", `${BASE_URL}/api/reservas`, token)));
  fs.writeFileSync("PERF.md", results.join("\n"));
  console.log("\n✅ Resultados guardados en PERF.md");
}

main().catch(console.error);
