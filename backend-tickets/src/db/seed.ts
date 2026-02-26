import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed...");

  await prisma.ticket.deleteMany();
  await prisma.cliente.deleteMany();
  await prisma.tecnico.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash("Demo1234!", 10);
  await prisma.user.create({ data: { nombre: "Demo", apellido: "User", email: "demo@demo.com", passwordHash } });
  console.log("✅ Usuario creado: demo@demo.com");

  const tecnicos = await Promise.all([
    prisma.tecnico.create({ data: { nombre: "Roberto", apellido: "Silva", especialidad: "Redes", email: "roberto@tech.com", telefono: "0991111111" } }),
    prisma.tecnico.create({ data: { nombre: "María", apellido: "Castro", especialidad: "Software", email: "maria@tech.com", telefono: "0992222222" } }),
    prisma.tecnico.create({ data: { nombre: "José", apellido: "Ortiz", especialidad: "Hardware", email: "jose@tech.com" } }),
  ]);
  console.log(`✅ ${tecnicos.length} técnicos creados`);

  const clientes = await Promise.all([
    prisma.cliente.create({ data: { nombre: "Ana", apellido: "Díaz", cedula: "1234567890", telefono: "0993333333", email: "ana@email.com" } }),
    prisma.cliente.create({ data: { nombre: "Luis", apellido: "Mora", cedula: "0987654321", telefono: "0994444444", email: "luis@email.com" } }),
    prisma.cliente.create({ data: { nombre: "Carla", apellido: "Ríos", cedula: "1122334455", telefono: "0995555555" } }),
  ]);
  console.log(`✅ ${clientes.length} clientes creados`);

  await Promise.all([
    prisma.ticket.create({ data: { clienteId: clientes[0].id, tecnicoId: tecnicos[0].id, descripcion: "Internet no funciona", estado: "abierto", prioridad: "alta" } }),
    prisma.ticket.create({ data: { clienteId: clientes[1].id, tecnicoId: tecnicos[1].id, descripcion: "Software desactualizado", estado: "en proceso", prioridad: "media" } }),
    prisma.ticket.create({ data: { clienteId: clientes[2].id, tecnicoId: tecnicos[2].id, descripcion: "Pantalla dañada", estado: "cerrado", prioridad: "baja" } }),
  ]);
  console.log("✅ Tickets creados");
}

main().catch(console.error).finally(() => prisma.$disconnect());
