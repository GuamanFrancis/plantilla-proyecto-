import { z } from "zod";

export const createMateriaSchema = z.object({
  nombre: z.string({ required_error: "El nombre es requerido" }).min(1),
  codigo: z.string({ required_error: "El código es requerido" }).min(1),
  descripcion: z.string().optional().nullable(),
});

export const updateMateriaSchema = z.object({
  nombre: z.string().min(1).optional(),
  codigo: z.string().min(1).optional(),
  descripcion: z.string().optional().nullable(),
});

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export type CreateMateriaInput = z.infer<typeof createMateriaSchema>;
export type UpdateMateriaInput = z.infer<typeof updateMateriaSchema>;
