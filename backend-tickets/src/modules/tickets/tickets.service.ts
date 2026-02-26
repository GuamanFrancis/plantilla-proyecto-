import prisma from "../../db/client";
import { NotFoundError } from "../../utils/httpErrors";
import { CreateTicketInput, UpdateTicketInput } from "./tickets.schemas";

export class TicketsService {
  async findAll() {
    return prisma.ticket.findMany({ orderBy: { id: "asc" }, include: { cliente: true, tecnico: true } });
  }
  async findById(id: number) {
    const item = await prisma.ticket.findUnique({ where: { id }, include: { cliente: true, tecnico: true } });
    if (!item) throw new NotFoundError(`Ticket con ID ${id} no encontrado`);
    return item;
  }
  async create(data: CreateTicketInput) {
    const cliente = await prisma.cliente.findUnique({ where: { id: data.clienteId } });
    if (!cliente) throw new NotFoundError(`Cliente con ID ${data.clienteId} no encontrado`);
    const tecnico = await prisma.tecnico.findUnique({ where: { id: data.tecnicoId } });
    if (!tecnico) throw new NotFoundError(`Técnico con ID ${data.tecnicoId} no encontrado`);
    return prisma.ticket.create({ data, include: { cliente: true, tecnico: true } });
  }
  async update(id: number, data: UpdateTicketInput) {
    await this.findById(id);
    return prisma.ticket.update({ where: { id }, data, include: { cliente: true, tecnico: true } });
  }
  async delete(id: number) { await this.findById(id); return prisma.ticket.delete({ where: { id } }); }
}
export const ticketsService = new TicketsService();
