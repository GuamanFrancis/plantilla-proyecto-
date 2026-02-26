import prisma from "../../db/client";
import { NotFoundError } from "../../utils/httpErrors";
import { CreateVehiculoInput, UpdateVehiculoInput } from "./vehiculos.schemas";

export class VehiculosService {
  async findAll() { return prisma.vehiculo.findMany({ orderBy: { id: "asc" } }); }
  async findById(id: number) {
    const item = await prisma.vehiculo.findUnique({ where: { id } });
    if (!item) throw new NotFoundError(`Vehículo con ID ${id} no encontrado`);
    return item;
  }
  async create(data: CreateVehiculoInput) { return prisma.vehiculo.create({ data }); }
  async update(id: number, data: UpdateVehiculoInput) { await this.findById(id); return prisma.vehiculo.update({ where: { id }, data }); }
  async delete(id: number) { await this.findById(id); return prisma.vehiculo.delete({ where: { id } }); }
}

export const vehiculosService = new VehiculosService();
