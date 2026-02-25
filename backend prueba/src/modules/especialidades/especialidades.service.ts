import prisma from "../../db/client";
import { NotFoundError } from "../../utils/httpErrors";
import { CreateEspecialidadInput, UpdateEspecialidadInput } from "./especialidades.schemas";

export class EspecialidadesService {
  async findAll() {
    return prisma.especialidad.findMany({
      orderBy: { id: "asc" },
      include: { citas: { include: { paciente: true } } },
    });
  }

  async findById(id: number) {
    const especialidad = await prisma.especialidad.findUnique({
      where: { id },
      include: { citas: { include: { paciente: true } } },
    });
    if (!especialidad) {
      throw new NotFoundError(`Especialidad con ID ${id} no encontrada`);
    }
    return especialidad;
  }

  async create(data: CreateEspecialidadInput) {
    return prisma.especialidad.create({ data });
  }

  async update(id: number, data: UpdateEspecialidadInput) {
    await this.findById(id);
    return prisma.especialidad.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    await this.findById(id);
    return prisma.especialidad.delete({ where: { id } });
  }
}

export const especialidadesService = new EspecialidadesService();
