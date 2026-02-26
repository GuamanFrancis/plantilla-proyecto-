import prisma from "../../db/client";
import { NotFoundError } from "../../utils/httpErrors";
import { CreateMateriaInput, UpdateMateriaInput } from "./materias.schemas";

export class MateriasService {
  async findAll() {
    return prisma.materia.findMany({ orderBy: { id: "asc" } });
  }

  async findById(id: number) {
    const materia = await prisma.materia.findUnique({ where: { id } });
    if (!materia) throw new NotFoundError(`Materia con ID ${id} no encontrada`);
    return materia;
  }

  async create(data: CreateMateriaInput) {
    return prisma.materia.create({ data });
  }

  async update(id: number, data: UpdateMateriaInput) {
    await this.findById(id);
    return prisma.materia.update({ where: { id }, data });
  }

  async delete(id: number) {
    await this.findById(id);
    return prisma.materia.delete({ where: { id } });
  }
}

export const materiasService = new MateriasService();
