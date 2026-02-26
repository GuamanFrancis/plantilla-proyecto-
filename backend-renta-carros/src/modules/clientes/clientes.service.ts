import prisma from "../../db/client";
import { NotFoundError } from "../../utils/httpErrors";
import { CreateClienteInput, UpdateClienteInput } from "./clientes.schemas";

export class ClientesService {
  async findAll() { return prisma.cliente.findMany({ orderBy: { id: "asc" } }); }
  async findById(id: number) {
    const item = await prisma.cliente.findUnique({ where: { id } });
    if (!item) throw new NotFoundError(`Cliente con ID ${id} no encontrado`);
    return item;
  }
  async create(data: CreateClienteInput) { return prisma.cliente.create({ data }); }
  async update(id: number, data: UpdateClienteInput) { await this.findById(id); return prisma.cliente.update({ where: { id }, data }); }
  async delete(id: number) { await this.findById(id); return prisma.cliente.delete({ where: { id } }); }
}

export const clientesService = new ClientesService();
