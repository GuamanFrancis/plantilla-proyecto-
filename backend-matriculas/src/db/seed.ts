import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed de la base de datos...");

  await prisma.matricula.deleteMany();
  await prisma.estudiante.deleteMany();
  await prisma.materia.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash("Demo1234!", 10);
  const user = await prisma.user.create({
    data: { nombre: "Demo", apellido: "User", email: "demo@demo.com", passwordHash },
  });
  console.log(`✅ Usuario creado: ${user.email}`);

  const estudiantes = await Promise.all([
    prisma.estudiante.create({ data: { nombre: "Ana", apellido: "Torres", cedula: "1234567890", email: "ana.torres@email.com" } }),
    prisma.estudiante.create({ data: { nombre: "Luis", apellido: "Ramírez", cedula: "0987654321", email: "luis.ramirez@email.com" } }),
    prisma.estudiante.create({ data: { nombre: "Sofía", apellido: "Mora", cedula: "1122334455", email: "sofia.mora@email.com" } }),
  ]);
  console.log(`✅ ${estudiantes.length} estudiantes creados`);

  const materias = await Promise.all([
    prisma.materia.create({ data: { nombre: "Matemáticas", codigo: "MAT101", descripcion: "Fundamentos de matemáticas" } }),
    prisma.materia.create({ data: { nombre: "Programación", codigo: "PROG101", descripcion: "Introducción a la programación" } }),
    prisma.materia.create({ data: { nombre: "Base de Datos", codigo: "BD101", descripcion: "Fundamentos de bases de datos" } }),
  ]);
  console.log(`✅ ${materias.length} materias creadas`);

  await Promise.all([
    prisma.matricula.create({ data: { estudianteId: estudiantes[0].id, materiaId: materias[0].id, fecha: new Date("2026-01-15") } }),
    prisma.matricula.create({ data: { estudianteId: estudiantes[0].id, materiaId: materias[1].id, fecha: new Date("2026-01-15") } }),
    prisma.matricula.create({ data: { estudianteId: estudiantes[1].id, materiaId: materias[1].id, fecha: new Date("2026-01-16") } }),
    prisma.matricula.create({ data: { estudianteId: estudiantes[2].id, materiaId: materias[2].id, fecha: new Date("2026-01-16") } }),
  ]);
  console.log(`✅ Matrículas creadas`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
