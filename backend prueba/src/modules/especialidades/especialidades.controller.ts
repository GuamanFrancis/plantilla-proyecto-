import { Request, Response, NextFunction } from "express";
import { especialidadesService } from "./especialidades.service";
import {
  createEspecialidadSchema,
  updateEspecialidadSchema,
  idParamSchema,
} from "./especialidades.schemas";
import { successResponse, createdResponse } from "../../utils/responses";

export class EspecialidadesController {
  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const especialidades = await especialidadesService.findAll();
      return successResponse(res, especialidades);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = idParamSchema.parse(req.params);
      const especialidad = await especialidadesService.findById(id);
      return successResponse(res, especialidad);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = createEspecialidadSchema.parse(req.body);
      const especialidad = await especialidadesService.create(data);
      return createdResponse(res, especialidad);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = idParamSchema.parse(req.params);
      const data = updateEspecialidadSchema.parse(req.body);
      const especialidad = await especialidadesService.update(id, data);
      return successResponse(res, especialidad);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = idParamSchema.parse(req.params);
      await especialidadesService.delete(id);
      return successResponse(res, { message: "Especialidad eliminada correctamente" });
    } catch (error) {
      next(error);
    }
  }
}

export const especialidadesController = new EspecialidadesController();
