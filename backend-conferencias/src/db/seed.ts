import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed...");

  await prisma.reserva.deleteMany();
  await prisma.conferencista.deleteMany();
  await prisma.auditorio.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash("Demo1234!", 10);
  await prisma.user.create({ data: { nombre: "Demo", apellido: "User", email: "demo@demo.com", passwordHash } });
  console.log("✅ Usuario creado: demo@demo.com");

  const conferencistas = await Promise.all([
    prisma.conferencista.create({ data: { nombre: "Elena", apellido: "Vargas", email: "elena@conf.com", telefono: "0991111111", especialidad: "Inteligencia Artificial" } }),
    prisma.conferencista.create({ data: { nombre: "Marco", apellido: "Salinas", email: "marco@conf.com", especialidad: "Ciberseguridad" } }),
    prisma.conferencista.create({ data: { nombre: "Diana", apellido: "Fuentes", email: "diana@conf.com", especialidad: "Desarrollo Web" } }),
  ]);
  console.log(`✅ ${conferencistas.length} conferencistas creados`);

  const auditorios = await Promise.all([
    prisma.auditorio.create({ data: { nombre: "Auditorio A", capacidad: 200, ubicacion: "Edificio Central, Piso 1" } }),
    prisma.auditorio.create({ data: { nombre: "Auditorio B", capacidad: 100, ubicacion: "Edificio Norte, Piso 2" } }),
    prisma.auditorio.create({ data: { nombre: "Sala de Conferencias", capacidad: 50, ubicacion: "Edificio Sur, Piso 3" } }),
  ]);
  console.log(`✅ ${auditorios.length} auditorios creados`);

  await Promise.all([
    prisma.reserva.create({ data: { conferencistaId: conferencistas[0].id, auditorioId: auditorios[0].id, fecha: new Date("2026-03-10"), tema: "El futuro de la IA" } }),
    prisma.reserva.create({ data: { conferencistaId: conferencistas[1].id, auditorioId: auditorios[1].id, fecha: new Date("2026-03-11"), tema: "Seguridad en la nube" } }),
    prisma.reserva.create({ data: { conferencistaId: conferencistas[2].id, auditorioId: auditorios[2].id, fecha: new Date("2026-03-12"), tema: "React en 2026" } }),
  ]);
  console.log("✅ Reservas creadas");
}

main().catch(console.error).finally(() => prisma.$disconnect());
