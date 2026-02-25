import { Request, Response, NextFunction } from "express";
import { citasService } from "./citas.service";
import {
  createCitaSchema,
  filterCitasSchema,
  idParamSchema,
} from "./citas.schemas";
import { successResponse, createdResponse } from "../../utils/responses";

export class CitasController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const filters = filterCitasSchema.parse(req.query);
      const citas = await citasService.findAll(filters);
      return successResponse(res, citas);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = idParamSchema.parse(req.params);
      const cita = await citasService.findById(id);
      return successResponse(res, cita);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = createCitaSchema.parse(req.body);
      const cita = await citasService.create(data);
      return createdResponse(res, cita);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = idParamSchema.parse(req.params);
      await citasService.delete(id);
      return successResponse(res, { message: "Cita eliminada correctamente" });
    } catch (error) {
      next(error);
    }
  }
}

export const citasController = new CitasController();
