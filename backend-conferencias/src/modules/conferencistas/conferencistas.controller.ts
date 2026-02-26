import { Request, Response, NextFunction } from "express";
import { conferencistaService } from "./conferencistas.service";
import { createConferencistaSchema, updateConferencistaSchema, idParamSchema } from "./conferencistas.schemas";
import { successResponse, createdResponse } from "../../utils/responses";

export class ConferencistaController {
  async getAll(_req: Request, res: Response, next: NextFunction) {
    try { return successResponse(res, await conferencistaService.findAll()); } catch (e) { next(e); }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    try { const { id } = idParamSchema.parse(req.params); return successResponse(res, await conferencistaService.findById(id)); } catch (e) { next(e); }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try { return createdResponse(res, await conferencistaService.create(createConferencistaSchema.parse(req.body))); } catch (e) { next(e); }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try { const { id } = idParamSchema.parse(req.params); return successResponse(res, await conferencistaService.update(id, updateConferencistaSchema.parse(req.body))); } catch (e) { next(e); }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try { const { id } = idParamSchema.parse(req.params); await conferencistaService.delete(id); return successResponse(res, { message: "Conferencista eliminado correctamente" }); } catch (e) { next(e); }
  }
}
export const conferencistaController = new ConferencistaController();
