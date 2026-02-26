import { Request, Response, NextFunction } from "express";
import { ticketsService } from "./tickets.service";
import { createTicketSchema, updateTicketSchema, idParamSchema } from "./tickets.schemas";
import { successResponse, createdResponse } from "../../utils/responses";

export class TicketsController {
  async getAll(_req: Request, res: Response, next: NextFunction) {
    try { return successResponse(res, await ticketsService.findAll()); } catch (e) { next(e); }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    try { const { id } = idParamSchema.parse(req.params); return successResponse(res, await ticketsService.findById(id)); } catch (e) { next(e); }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try { return createdResponse(res, await ticketsService.create(createTicketSchema.parse(req.body))); } catch (e) { next(e); }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try { const { id } = idParamSchema.parse(req.params); return successResponse(res, await ticketsService.update(id, updateTicketSchema.parse(req.body))); } catch (e) { next(e); }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try { const { id } = idParamSchema.parse(req.params); await ticketsService.delete(id); return successResponse(res, { message: "Ticket eliminado correctamente" }); } catch (e) { next(e); }
  }
}
export const ticketsController = new TicketsController();
