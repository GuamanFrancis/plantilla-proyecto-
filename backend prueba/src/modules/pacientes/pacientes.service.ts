import prisma from "../../db/client";
import { NotFoundError } from "../../utils/httpErrors";
import { CreatePacienteInput, UpdatePacienteInput } from "./pacientes.schemas";

export class PacientesService {
  async findAll() {
    return prisma.paciente.findMany({
      orderBy: { id: "asc" },
      include: { citas: { include: { especialidad: true } } },
    });
  }

  async findById(id: number) {
    const paciente = await prisma.paciente.findUnique({
      where: { id },
      include: { citas: { include: { especialidad: true } } },
    });
    if (!paciente) {
      throw new NotFoundError(`Paciente con ID ${id} no encontrado`);
    }
    return paciente;
  }

  async create(data: CreatePacienteInput) {
    return prisma.paciente.create({ data });
  }

  async update(id: number, data: UpdatePacienteInput) {
    await this.findById(id);
    return prisma.paciente.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    await this.findById(id);
    return prisma.paciente.delete({ where: { id } });
  }
}

export const pacientesService = new PacientesService();
