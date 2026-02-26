import prisma from "../../db/client";
import { NotFoundError } from "../../utils/httpErrors";
import { CreateAuditorioInput, UpdateAuditorioInput } from "./auditorios.schemas";

export class AuditoriosService {
  async findAll() { return prisma.auditorio.findMany({ orderBy: { id: "asc" } }); }
  async findById(id: number) {
    const item = await prisma.auditorio.findUnique({ where: { id } });
    if (!item) throw new NotFoundError(`Auditorio con ID ${id} no encontrado`);
    return item;
  }
  async create(data: CreateAuditorioInput) { return prisma.auditorio.create({ data }); }
  async update(id: number, data: UpdateAuditorioInput) { await this.findById(id); return prisma.auditorio.update({ where: { id }, data }); }
  async delete(id: number) { await this.findById(id); return prisma.auditorio.delete({ where: { id } }); }
}
export const auditoriosService = new AuditoriosService();
