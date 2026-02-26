import { Request, Response, NextFunction } from "express";
import { estudiantesService } from "./estudiantes.service";
import { createEstudianteSchema, updateEstudianteSchema, idParamSchema } from "./estudiantes.schemas";
import { successResponse, createdResponse } from "../../utils/responses";

export class EstudiantesController {
  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const data = await estudiantesService.findAll();
      return successResponse(res, data);
    } catch (error) { next(error); }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = idParamSchema.parse(req.params);
      const data = await estudiantesService.findById(id);
      return successResponse(res, data);
    } catch (error) { next(error); }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = createEstudianteSchema.parse(req.body);
      const result = await estudiantesService.create(data);
      return createdResponse(res, result);
    } catch (error) { next(error); }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = idParamSchema.parse(req.params);
      const data = updateEstudianteSchema.parse(req.body);
      const result = await estudiantesService.update(id, data);
      return successResponse(res, result);
    } catch (error) { next(error); }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = idParamSchema.parse(req.params);
      await estudiantesService.delete(id);
      return successResponse(res, { message: "Estudiante eliminado correctamente" });
    } catch (error) { next(error); }
  }
}

export const estudiantesController = new EstudiantesController();
