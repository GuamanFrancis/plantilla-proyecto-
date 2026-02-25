import { Request, Response, NextFunction } from "express";
import { pacientesService } from "./pacientes.service";
import {
  createPacienteSchema,
  updatePacienteSchema,
  idParamSchema,
} from "./pacientes.schemas";
import { successResponse, createdResponse } from "../../utils/responses";

export class PacientesController {
  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const pacientes = await pacientesService.findAll();
      return successResponse(res, pacientes);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = idParamSchema.parse(req.params);
      const paciente = await pacientesService.findById(id);
      return successResponse(res, paciente);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = createPacienteSchema.parse(req.body);
      const paciente = await pacientesService.create(data);
      return createdResponse(res, paciente);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = idParamSchema.parse(req.params);
      const data = updatePacienteSchema.parse(req.body);
      const paciente = await pacientesService.update(id, data);
      return successResponse(res, paciente);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = idParamSchema.parse(req.params);
      await pacientesService.delete(id);
      return successResponse(res, { message: "Paciente eliminado correctamente" });
    } catch (error) {
      next(error);
    }
  }
}

export const pacientesController = new PacientesController();
