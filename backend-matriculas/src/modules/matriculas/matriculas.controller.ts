import { Request, Response, NextFunction } from "express";
import { matriculasService } from "./matriculas.service";
import { createMatriculaSchema, updateMatriculaSchema, idParamSchema } from "./matriculas.schemas";
import { successResponse, createdResponse } from "../../utils/responses";

export class MatriculasController {
  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      return successResponse(res, await matriculasService.findAll());
    } catch (error) { next(error); }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = idParamSchema.parse(req.params);
      return successResponse(res, await matriculasService.findById(id));
    } catch (error) { next(error); }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = createMatriculaSchema.parse(req.body);
      return createdResponse(res, await matriculasService.create(data));
    } catch (error) { next(error); }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = idParamSchema.parse(req.params);
      const data = updateMatriculaSchema.parse(req.body);
      return successResponse(res, await matriculasService.update(id, data));
    } catch (error) { next(error); }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = idParamSchema.parse(req.params);
      await matriculasService.delete(id);
      return successResponse(res, { message: "Matrícula eliminada correctamente" });
    } catch (error) { next(error); }
  }
}

export const matriculasController = new MatriculasController();
