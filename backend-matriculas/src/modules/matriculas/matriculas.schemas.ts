import { z } from "zod";

export const createMatriculaSchema = z.object({
  estudianteId: z.number({ required_error: "El estudianteId es requerido" }).int().positive(),
  materiaId: z.number({ required_error: "El materiaId es requerido" }).int().positive(),
  fecha: z.string({ required_error: "La fecha es requerida" }),
  observacion: z.string().optional().nullable(),
});

export const updateMatriculaSchema = z.object({
  estudianteId: z.number().int().positive().optional(),
  materiaId: z.number().int().positive().optional(),
  fecha: z.string().optional(),
  observacion: z.string().optional().nullable(),
});

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export type CreateMatriculaInput = z.infer<typeof createMatriculaSchema>;
export type UpdateMatriculaInput = z.infer<typeof updateMatriculaSchema>;
