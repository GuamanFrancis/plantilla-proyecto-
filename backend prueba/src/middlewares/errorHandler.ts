import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { HttpError } from "../utils/httpErrors";
import { errorResponse } from "../utils/responses";

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  // Zod validation errors
  if (err instanceof ZodError) {
    const details = err.errors.map((e) => ({
      field: e.path.join("."),
      message: e.message,
    }));
    return errorResponse(res, 400, "VALIDATION_ERROR", "Datos de entrada inválidos", details);
  }

  // Custom HTTP errors
  if (err instanceof HttpError) {
    return errorResponse(res, err.statusCode, err.code, err.message, err.details);
  }

  // Prisma unique constraint violation
  if ((err as any).code === "P2002") {
    return errorResponse(res, 409, "CONFLICT", "El registro ya existe (restricción única violada)");
  }

  // Prisma record not found
  if ((err as any).code === "P2025") {
    return errorResponse(res, 404, "NOT_FOUND", "Registro no encontrado");
  }

  // Default 500
  console.error("Error no manejado:", err);
  return errorResponse(res, 500, "INTERNAL_ERROR", "Error interno del servidor");
}
