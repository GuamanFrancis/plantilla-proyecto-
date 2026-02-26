import { z } from "zod";

export const createEstudianteSchema = z.object({
  nombre: z.string({ required_error: "El nombre es requerido" }).min(1),
  apellido: z.string({ required_error: "El apellido es requerido" }).min(1),
  cedula: z.string({ required_error: "La cédula es requerida" }).min(1),
  email: z.string().email("Debe ser un email válido").optional().nullable(),
});

export const updateEstudianteSchema = z.object({
  nombre: z.string().min(1).optional(),
  apellido: z.string().min(1).optional(),
  cedula: z.string().min(1).optional(),
  email: z.string().email().optional().nullable(),
});

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive("El ID debe ser un número positivo"),
});

export type CreateEstudianteInput = z.infer<typeof createEstudianteSchema>;
export type UpdateEstudianteInput = z.infer<typeof updateEstudianteSchema>;
