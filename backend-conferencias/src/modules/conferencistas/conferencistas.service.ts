import prisma from "../../db/client";
import { NotFoundError } from "../../utils/httpErrors";
import { CreateConferencistaInput, UpdateConferencistaInput } from "./conferencistas.schemas";

export class ConferencistaService {
  async findAll() { return prisma.conferencista.findMany({ orderBy: { id: "asc" } }); }
  async findById(id: number) {
    const item = await prisma.conferencista.findUnique({ where: { id } });
    if (!item) throw new NotFoundError(`Conferencista con ID ${id} no encontrado`);
    return item;
  }
  async create(data: CreateConferencistaInput) { return prisma.conferencista.create({ data }); }
  async update(id: number, data: UpdateConferencistaInput) { await this.findById(id); return prisma.conferencista.update({ where: { id }, data }); }
  async delete(id: number) { await this.findById(id); return prisma.conferencista.delete({ where: { id } }); }
}
export const conferencistaService = new ConferencistaService();
