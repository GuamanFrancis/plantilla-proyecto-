import prisma from "../../db/client";
import { NotFoundError } from "../../utils/httpErrors";
import { CreateTecnicoInput, UpdateTecnicoInput } from "./tecnicos.schemas";

export class TecnicosService {
  async findAll() { return prisma.tecnico.findMany({ orderBy: { id: "asc" } }); }
  async findById(id: number) {
    const item = await prisma.tecnico.findUnique({ where: { id } });
    if (!item) throw new NotFoundError(`Técnico con ID ${id} no encontrado`);
    return item;
  }
  async create(data: CreateTecnicoInput) { return prisma.tecnico.create({ data }); }
  async update(id: number, data: UpdateTecnicoInput) { await this.findById(id); return prisma.tecnico.update({ where: { id }, data }); }
  async delete(id: number) { await this.findById(id); return prisma.tecnico.delete({ where: { id } }); }
}
export const tecnicosService = new TecnicosService();
