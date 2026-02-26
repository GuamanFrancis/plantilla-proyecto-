import { Request, Response, NextFunction } from "express";
import { auditoriosService } from "./auditorios.service";
import { createAuditorioSchema, updateAuditorioSchema, idParamSchema } from "./auditorios.schemas";
import { successResponse, createdResponse } from "../../utils/responses";

export class AuditoriosController {
  async getAll(_req: Request, res: Response, next: NextFunction) {
    try { return successResponse(res, await auditoriosService.findAll()); } catch (e) { next(e); }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    try { const { id } = idParamSchema.parse(req.params); return successResponse(res, await auditoriosService.findById(id)); } catch (e) { next(e); }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try { return createdResponse(res, await auditoriosService.create(createAuditorioSchema.parse(req.body))); } catch (e) { next(e); }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try { const { id } = idParamSchema.parse(req.params); return successResponse(res, await auditoriosService.update(id, updateAuditorioSchema.parse(req.body))); } catch (e) { next(e); }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try { const { id } = idParamSchema.parse(req.params); await auditoriosService.delete(id); return successResponse(res, { message: "Auditorio eliminado correctamente" }); } catch (e) { next(e); }
  }
}
export const auditoriosController = new AuditoriosController();
