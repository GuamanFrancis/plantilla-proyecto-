import { z } from "zod";

export const createConferencistaSchema = z.object({
  nombre: z.string({ required_error: "Nombre requerido" }).min(1),
  apellido: z.string({ required_error: "Apellido requerido" }).min(1),
  email: z.string().email().optional().nullable(),
  telefono: z.string().optional().nullable(),
  especialidad: z.string().optional().nullable(),
});

export const updateConferencistaSchema = z.object({
  nombre: z.string().min(1).optional(),
  apellido: z.string().min(1).optional(),
  email: z.string().email().optional().nullable(),
  telefono: z.string().optional().nullable(),
  especialidad: z.string().optional().nullable(),
});

export const idParamSchema = z.object({ id: z.coerce.number().int().positive() });
export type CreateConferencistaInput = z.infer<typeof createConferencistaSchema>;
export type UpdateConferencistaInput = z.infer<typeof updateConferencistaSchema>;
