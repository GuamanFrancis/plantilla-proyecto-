import { Request, Response, NextFunction } from "express";
import { reservasService } from "./reservas.service";
import { createReservaSchema, updateReservaSchema, idParamSchema } from "./reservas.schemas";
import { successResponse, createdResponse } from "../../utils/responses";

export class ReservasController {
  async getAll(_req: Request, res: Response, next: NextFunction) {
    try { return successResponse(res, await reservasService.findAll()); } catch (e) { next(e); }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    try { const { id } = idParamSchema.parse(req.params); return successResponse(res, await reservasService.findById(id)); } catch (e) { next(e); }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try { return createdResponse(res, await reservasService.create(createReservaSchema.parse(req.body))); } catch (e) { next(e); }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try { const { id } = idParamSchema.parse(req.params); return successResponse(res, await reservasService.update(id, updateReservaSchema.parse(req.body))); } catch (e) { next(e); }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try { const { id } = idParamSchema.parse(req.params); await reservasService.delete(id); return successResponse(res, { message: "Reserva eliminada correctamente" }); } catch (e) { next(e); }
  }
}
export const reservasController = new ReservasController();
