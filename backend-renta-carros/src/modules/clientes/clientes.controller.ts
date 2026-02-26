import { Request, Response, NextFunction } from "express";
import { clientesService } from "./clientes.service";
import { createClienteSchema, updateClienteSchema, idParamSchema } from "./clientes.schemas";
import { successResponse, createdResponse } from "../../utils/responses";

export class ClientesController {
  async getAll(_req: Request, res: Response, next: NextFunction) {
    try { return successResponse(res, await clientesService.findAll()); } catch (e) { next(e); }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    try { const { id } = idParamSchema.parse(req.params); return successResponse(res, await clientesService.findById(id)); } catch (e) { next(e); }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try { return createdResponse(res, await clientesService.create(createClienteSchema.parse(req.body))); } catch (e) { next(e); }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try { const { id } = idParamSchema.parse(req.params); return successResponse(res, await clientesService.update(id, updateClienteSchema.parse(req.body))); } catch (e) { next(e); }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try { const { id } = idParamSchema.parse(req.params); await clientesService.delete(id); return successResponse(res, { message: "Cliente eliminado correctamente" }); } catch (e) { next(e); }
  }
}
export const clientesController = new ClientesController();
