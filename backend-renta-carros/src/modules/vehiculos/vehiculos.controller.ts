import { Request, Response, NextFunction } from "express";
import { vehiculosService } from "./vehiculos.service";
import { createVehiculoSchema, updateVehiculoSchema, idParamSchema } from "./vehiculos.schemas";
import { successResponse, createdResponse } from "../../utils/responses";

export class VehiculosController {
  async getAll(_req: Request, res: Response, next: NextFunction) {
    try { return successResponse(res, await vehiculosService.findAll()); } catch (e) { next(e); }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    try { const { id } = idParamSchema.parse(req.params); return successResponse(res, await vehiculosService.findById(id)); } catch (e) { next(e); }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try { return createdResponse(res, await vehiculosService.create(createVehiculoSchema.parse(req.body))); } catch (e) { next(e); }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try { const { id } = idParamSchema.parse(req.params); return successResponse(res, await vehiculosService.update(id, updateVehiculoSchema.parse(req.body))); } catch (e) { next(e); }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try { const { id } = idParamSchema.parse(req.params); await vehiculosService.delete(id); return successResponse(res, { message: "Vehículo eliminado correctamente" }); } catch (e) { next(e); }
  }
}
export const vehiculosController = new VehiculosController();
