import { z } from "zod";

export const createAuditorioSchema = z.object({
  nombre: z.string({ required_error: "Nombre requerido" }).min(1),
  capacidad: z.number({ required_error: "Capacidad requerida" }).int().positive(),
  ubicacion: z.string().optional().nullable(),
});

export const updateAuditorioSchema = z.object({
  nombre: z.string().min(1).optional(),
  capacidad: z.number().int().positive().optional(),
  ubicacion: z.string().optional().nullable(),
});

export const idParamSchema = z.object({ id: z.coerce.number().int().positive() });
export type CreateAuditorioInput = z.infer<typeof createAuditorioSchema>;
export type UpdateAuditorioInput = z.infer<typeof updateAuditorioSchema>;
