import prisma from "../../db/client";
import { NotFoundError } from "../../utils/httpErrors";
import { CreateEstudianteInput, UpdateEstudianteInput } from "./estudiantes.schemas";

export class EstudiantesService {
  async findAll() {
    return prisma.estudiante.findMany({ orderBy: { id: "asc" } });
  }

  async findById(id: number) {
    const estudiante = await prisma.estudiante.findUnique({ where: { id } });
    if (!estudiante) throw new NotFoundError(`Estudiante con ID ${id} no encontrado`);
    return estudiante;
  }

  async create(data: CreateEstudianteInput) {
    return prisma.estudiante.create({ data });
  }

  async update(id: number, data: UpdateEstudianteInput) {
    await this.findById(id);
    return prisma.estudiante.update({ where: { id }, data });
  }

  async delete(id: number) {
    await this.findById(id);
    return prisma.estudiante.delete({ where: { id } });
  }
}

export const estudiantesService = new EstudiantesService();
