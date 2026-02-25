import prisma from "../../db/client";
import { NotFoundError } from "../../utils/httpErrors";
import { CreateCitaInput } from "./citas.schemas";

export class CitasService {
  async findAll(filters?: { pacienteId?: number; especialidadId?: number }) {
    const where: any = {};
    if (filters?.pacienteId) where.pacienteId = filters.pacienteId;
    if (filters?.especialidadId) where.especialidadId = filters.especialidadId;

    return prisma.cita.findMany({
      where,
      orderBy: { id: "asc" },
      include: {
        paciente: true,
        especialidad: true,
      },
    });
  }

  async findById(id: number) {
    const cita = await prisma.cita.findUnique({
      where: { id },
      include: {
        paciente: true,
        especialidad: true,
      },
    });
    if (!cita) {
      throw new NotFoundError(`Cita con ID ${id} no encontrada`);
    }
    return cita;
  }

  async create(data: CreateCitaInput) {
    // Verificar que paciente existe
    const paciente = await prisma.paciente.findUnique({
      where: { id: data.pacienteId },
    });
    if (!paciente) {
      throw new NotFoundError(`Paciente con ID ${data.pacienteId} no encontrado`);
    }

    // Verificar que especialidad existe
    const especialidad = await prisma.especialidad.findUnique({
      where: { id: data.especialidadId },
    });
    if (!especialidad) {
      throw new NotFoundError(`Especialidad con ID ${data.especialidadId} no encontrada`);
    }

    return prisma.cita.create({
      data,
      include: {
        paciente: true,
        especialidad: true,
      },
    });
  }

  async delete(id: number) {
    await this.findById(id);
    return prisma.cita.delete({ where: { id } });
  }
}

export const citasService = new CitasService();
