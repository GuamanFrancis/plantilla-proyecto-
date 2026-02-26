import prisma from "../../db/client";
import { NotFoundError } from "../../utils/httpErrors";
import { CreateReservaInput, UpdateReservaInput } from "./reservas.schemas";

export class ReservasService {
  async findAll() {
    return prisma.reserva.findMany({ orderBy: { id: "asc" }, include: { conferencista: true, auditorio: true } });
  }
  async findById(id: number) {
    const item = await prisma.reserva.findUnique({ where: { id }, include: { conferencista: true, auditorio: true } });
    if (!item) throw new NotFoundError(`Reserva con ID ${id} no encontrada`);
    return item;
  }
  async create(data: CreateReservaInput) {
    const conf = await prisma.conferencista.findUnique({ where: { id: data.conferencistaId } });
    if (!conf) throw new NotFoundError(`Conferencista con ID ${data.conferencistaId} no encontrado`);
    const aud = await prisma.auditorio.findUnique({ where: { id: data.auditorioId } });
    if (!aud) throw new NotFoundError(`Auditorio con ID ${data.auditorioId} no encontrado`);
    return prisma.reserva.create({ data: { ...data, fecha: new Date(data.fecha) }, include: { conferencista: true, auditorio: true } });
  }
  async update(id: number, data: UpdateReservaInput) {
    await this.findById(id);
    const updateData: any = { ...data };
    if (data.fecha) updateData.fecha = new Date(data.fecha);
    return prisma.reserva.update({ where: { id }, data: updateData, include: { conferencista: true, auditorio: true } });
  }
  async delete(id: number) { await this.findById(id); return prisma.reserva.delete({ where: { id } }); }
}
export const reservasService = new ReservasService();
