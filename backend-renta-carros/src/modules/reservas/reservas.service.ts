import prisma from "../../db/client";
import { NotFoundError } from "../../utils/httpErrors";
import { CreateReservaInput, UpdateReservaInput } from "./reservas.schemas";

export class ReservasService {
  async findAll() {
    return prisma.reserva.findMany({ orderBy: { id: "asc" }, include: { cliente: true, vehiculo: true } });
  }
  async findById(id: number) {
    const item = await prisma.reserva.findUnique({ where: { id }, include: { cliente: true, vehiculo: true } });
    if (!item) throw new NotFoundError(`Reserva con ID ${id} no encontrada`);
    return item;
  }
  async create(data: CreateReservaInput) {
    const cliente = await prisma.cliente.findUnique({ where: { id: data.clienteId } });
    if (!cliente) throw new NotFoundError(`Cliente con ID ${data.clienteId} no encontrado`);
    const vehiculo = await prisma.vehiculo.findUnique({ where: { id: data.vehiculoId } });
    if (!vehiculo) throw new NotFoundError(`Vehículo con ID ${data.vehiculoId} no encontrado`);
    return prisma.reserva.create({ data: { ...data, fechaInicio: new Date(data.fechaInicio), fechaFin: new Date(data.fechaFin) }, include: { cliente: true, vehiculo: true } });
  }
  async update(id: number, data: UpdateReservaInput) {
    await this.findById(id);
    const updateData: any = { ...data };
    if (data.fechaInicio) updateData.fechaInicio = new Date(data.fechaInicio);
    if (data.fechaFin) updateData.fechaFin = new Date(data.fechaFin);
    return prisma.reserva.update({ where: { id }, data: updateData, include: { cliente: true, vehiculo: true } });
  }
  async delete(id: number) { await this.findById(id); return prisma.reserva.delete({ where: { id } }); }
}

export const reservasService = new ReservasService();
