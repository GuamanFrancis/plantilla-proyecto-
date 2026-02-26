import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed...");

  await prisma.reserva.deleteMany();
  await prisma.cliente.deleteMany();
  await prisma.vehiculo.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash("Demo1234!", 10);
  await prisma.user.create({ data: { nombre: "Demo", apellido: "User", email: "demo@demo.com", passwordHash } });
  console.log("✅ Usuario creado: demo@demo.com");

  const clientes = await Promise.all([
    prisma.cliente.create({ data: { nombre: "Carlos", apellido: "Mendoza", cedula: "1234567890", telefono: "0991234567", email: "carlos@email.com" } }),
    prisma.cliente.create({ data: { nombre: "Laura", apellido: "Vega", cedula: "0987654321", telefono: "0997654321", email: "laura@email.com" } }),
    prisma.cliente.create({ data: { nombre: "Pedro", apellido: "Ruiz", cedula: "1122334455", telefono: "0993344556" } }),
  ]);
  console.log(`✅ ${clientes.length} clientes creados`);

  const vehiculos = await Promise.all([
    prisma.vehiculo.create({ data: { marca: "Toyota", modelo: "Corolla", placa: "ABC-1234", anio: 2022, descripcion: "Sedán económico" } }),
    prisma.vehiculo.create({ data: { marca: "Chevrolet", modelo: "Sail", placa: "XYZ-5678", anio: 2021, descripcion: "Compacto" } }),
    prisma.vehiculo.create({ data: { marca: "Hyundai", modelo: "Tucson", placa: "DEF-9012", anio: 2023, descripcion: "SUV" } }),
  ]);
  console.log(`✅ ${vehiculos.length} vehículos creados`);

  await Promise.all([
    prisma.reserva.create({ data: { clienteId: clientes[0].id, vehiculoId: vehiculos[0].id, fechaInicio: new Date("2026-02-01"), fechaFin: new Date("2026-02-05") } }),
    prisma.reserva.create({ data: { clienteId: clientes[1].id, vehiculoId: vehiculos[1].id, fechaInicio: new Date("2026-02-10"), fechaFin: new Date("2026-02-15") } }),
    prisma.reserva.create({ data: { clienteId: clientes[2].id, vehiculoId: vehiculos[2].id, fechaInicio: new Date("2026-02-20"), fechaFin: new Date("2026-02-25") } }),
  ]);
  console.log("✅ Reservas creadas");
}

main().catch(console.error).finally(() => prisma.$disconnect());
