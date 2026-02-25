import { z } from "zod";

export const createEspecialidadSchema = z.object({
  nombre: z
    .string({ required_error: "El nombre es requerido" })
    .min(1, "El nombre no puede estar vacío"),
  descripcion: z.string().optional().nullable(),
});

export const updateEspecialidadSchema = z.object({
  nombre: z.string().min(1, "El nombre no puede estar vacío").optional(),
  descripcion: z.string().optional().nullable(),
});

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive("El ID debe ser un número positivo"),
});

export type CreateEspecialidadInput = z.infer<typeof createEspecialidadSchema>;
export type UpdateEspecialidadInput = z.infer<typeof updateEspecialidadSchema>;
