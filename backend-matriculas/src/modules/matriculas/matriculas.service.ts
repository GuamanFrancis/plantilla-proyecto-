import prisma from "../../db/client";
import { NotFoundError } from "../../utils/httpErrors";
import { CreateMatriculaInput, UpdateMatriculaInput } from "./matriculas.schemas";

export class MatriculasService {
  async findAll() {
    return prisma.matricula.findMany({
      orderBy: { id: "asc" },
      include: { estudiante: true, materia: true },
    });
  }

  async findById(id: number) {
    const matricula = await prisma.matricula.findUnique({
      where: { id },
      include: { estudiante: true, materia: true },
    });
    if (!matricula) throw new NotFoundError(`Matrícula con ID ${id} no encontrada`);
    return matricula;
  }

  async create(data: CreateMatriculaInput) {
    const estudiante = await prisma.estudiante.findUnique({ where: { id: data.estudianteId } });
    if (!estudiante) throw new NotFoundError(`Estudiante con ID ${data.estudianteId} no encontrado`);

    const materia = await prisma.materia.findUnique({ where: { id: data.materiaId } });
    if (!materia) throw new NotFoundError(`Materia con ID ${data.materiaId} no encontrada`);

    return prisma.matricula.create({
      data: { ...data, fecha: new Date(data.fecha) },
      include: { estudiante: true, materia: true },
    });
  }

  async update(id: number, data: UpdateMatriculaInput) {
    await this.findById(id);
    const updateData: any = { ...data };
    if (data.fecha) updateData.fecha = new Date(data.fecha);
    return prisma.matricula.update({
      where: { id },
      data: updateData,
      include: { estudiante: true, materia: true },
    });
  }

  async delete(id: number) {
    await this.findById(id);
    return prisma.matricula.delete({ where: { id } });
  }
}

export const matriculasService = new MatriculasService();
