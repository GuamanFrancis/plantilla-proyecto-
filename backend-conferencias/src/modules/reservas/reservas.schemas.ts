import { z } from "zod";

export const createReservaSchema = z.object({
  conferencistaId: z.number({ required_error: "conferencistaId requerido" }).int().positive(),
  auditorioId: z.number({ required_error: "auditorioId requerido" }).int().positive(),
  fecha: z.string({ required_error: "fecha requerida" }),
  tema: z.string().optional().nullable(),
});

export const updateReservaSchema = z.object({
  conferencistaId: z.number().int().positive().optional(),
  auditorioId: z.number().int().positive().optional(),
  fecha: z.string().optional(),
  tema: z.string().optional().nullable(),
});

export const idParamSchema = z.object({ id: z.coerce.number().int().positive() });
export type CreateReservaInput = z.infer<typeof createReservaSchema>;
export type UpdateReservaInput = z.infer<typeof updateReservaSchema>;
