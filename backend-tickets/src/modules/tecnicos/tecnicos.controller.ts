import { Request, Response, NextFunction } from "express";
import { tecnicosService } from "./tecnicos.service";
import { createTecnicoSchema, updateTecnicoSchema, idParamSchema } from "./tecnicos.schemas";
import { successResponse, createdResponse } from "../../utils/responses";

export class TecnicosController {
  async getAll(_req: Request, res: Response, next: NextFunction) {
    try { return successResponse(res, await tecnicosService.findAll()); } catch (e) { next(e); }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    try { const { id } = idParamSchema.parse(req.params); return successResponse(res, await tecnicosService.findById(id)); } catch (e) { next(e); }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try { return createdResponse(res, await tecnicosService.create(createTecnicoSchema.parse(req.body))); } catch (e) { next(e); }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try { const { id } = idParamSchema.parse(req.params); return successResponse(res, await tecnicosService.update(id, updateTecnicoSchema.parse(req.body))); } catch (e) { next(e); }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try { const { id } = idParamSchema.parse(req.params); await tecnicosService.delete(id); return successResponse(res, { message: "Técnico eliminado correctamente" }); } catch (e) { next(e); }
  }
}
export const tecnicosController = new TecnicosController();
