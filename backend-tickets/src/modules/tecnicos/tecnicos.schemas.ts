import { z } from "zod";

export const createTecnicoSchema = z.object({
  nombre: z.string({ required_error: "Nombre requerido" }).min(1),
  apellido: z.string({ required_error: "Apellido requerido" }).min(1),
  especialidad: z.string({ required_error: "Especialidad requerida" }).min(1),
  email: z.string().email().optional().nullable(),
  telefono: z.string().optional().nullable(),
});

export const updateTecnicoSchema = z.object({
  nombre: z.string().min(1).optional(),
  apellido: z.string().min(1).optional(),
  especialidad: z.string().min(1).optional(),
  email: z.string().email().optional().nullable(),
  telefono: z.string().optional().nullable(),
});

export const idParamSchema = z.object({ id: z.coerce.number().int().positive() });
export type CreateTecnicoInput = z.infer<typeof createTecnicoSchema>;
export type UpdateTecnicoInput = z.infer<typeof updateTecnicoSchema>;
