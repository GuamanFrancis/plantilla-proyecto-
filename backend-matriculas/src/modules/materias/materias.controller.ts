import { Request, Response, NextFunction } from "express";
import { materiasService } from "./materias.service";
import { createMateriaSchema, updateMateriaSchema, idParamSchema } from "./materias.schemas";
import { successResponse, createdResponse } from "../../utils/responses";

export class MateriasController {
  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      return successResponse(res, await materiasService.findAll());
    } catch (error) { next(error); }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = idParamSchema.parse(req.params);
      return successResponse(res, await materiasService.findById(id));
    } catch (error) { next(error); }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = createMateriaSchema.parse(req.body);
      return createdResponse(res, await materiasService.create(data));
    } catch (error) { next(error); }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = idParamSchema.parse(req.params);
      const data = updateMateriaSchema.parse(req.body);
      return successResponse(res, await materiasService.update(id, data));
    } catch (error) { next(error); }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = idParamSchema.parse(req.params);
      await materiasService.delete(id);
      return successResponse(res, { message: "Materia eliminada correctamente" });
    } catch (error) { next(error); }
  }
}

export const materiasController = new MateriasController();
