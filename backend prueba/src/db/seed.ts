import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed de la base de datos...");

  // Limpiar datos existentes
  await prisma.cita.deleteMany();
  await prisma.paciente.deleteMany();
  await prisma.especialidad.deleteMany();
  await prisma.user.deleteMany();

  // Crear usuario demo
  const passwordHash = await bcrypt.hash("Demo1234!", 10);
  const user = await prisma.user.create({
    data: {
      nombre: "Demo",
      apellido: "User",
      email: "demo@demo.com",
      passwordHash,
    },
  });
  console.log(`✅ Usuario creado: ${user.email}`);

  // Crear pacientes
  const pacientes = await Promise.all([
    prisma.paciente.create({
      data: {
        nombre: "Juan",
        apellido: "Pérez",
        cedula: "1234567890",
        telefono: "0991234567",
        email: "juan.perez@email.com",
      },
    }),
    prisma.paciente.create({
      data: {
        nombre: "María",
        apellido: "García",
        cedula: "0987654321",
        telefono: "0997654321",
        email: "maria.garcia@email.com",
      },
    }),
    prisma.paciente.create({
      data: {
        nombre: "Carlos",
        apellido: "López",
        cedula: "1122334455",
        telefono: "0993344556",
        email: "carlos.lopez@email.com",
      },
    }),
  ]);
  console.log(`✅ ${pacientes.length} pacientes creados`);

  // Crear especialidades
  const especialidades = await Promise.all([
    prisma.especialidad.create({
      data: {
        nombre: "Cardiología",
        descripcion: "Especialidad médica del corazón y sistema circulatorio",
      },
    }),
    prisma.especialidad.create({
      data: {
        nombre: "Dermatología",
        descripcion: "Especialidad médica de la piel",
      },
    }),
    prisma.especialidad.create({
      data: {
        nombre: "Pediatría",
        descripcion: "Especialidad médica enfocada en niños y adolescentes",
      },
    }),
  ]);
  console.log(`✅ ${especialidades.length} especialidades creadas`);

  // Crear citas (relación many-to-many)
  const citas = await Promise.all([
    prisma.cita.create({
      data: {
        pacienteId: pacientes[0].id,
        especialidadId: especialidades[0].id,
        fecha: new Date("2026-03-15T09:00:00Z"),
        motivo: "Control anual cardíaco",
      },
    }),
    prisma.cita.create({
      data: {
        pacienteId: pacientes[1].id,
        especialidadId: especialidades[1].id,
        fecha: new Date("2026-03-16T10:30:00Z"),
        motivo: "Revisión dermatológica",
      },
    }),
    prisma.cita.create({
      data: {
        pacienteId: pacientes[2].id,
        especialidadId: especialidades[2].id,
        fecha: new Date("2026-03-17T14:00:00Z"),
        motivo: "Consulta pediátrica general",
      },
    }),
  ]);
  console.log(`✅ ${citas.length} citas creadas`);

  console.log("\n🎉 Seed completado exitosamente!");
  console.log("📧 Credenciales demo: demo@demo.com / Demo1234!");
}

main()
  .catch((e) => {
    console.error("❌ Error en seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
