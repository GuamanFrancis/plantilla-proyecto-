import { z } from "zod";

export const createVehiculoSchema = z.object({
  marca: z.string({ required_error: "Marca requerida" }).min(1),
  modelo: z.string({ required_error: "Modelo requerido" }).min(1),
  placa: z.string({ required_error: "Placa requerida" }).min(1),
  anio: z.number().int().optional().nullable(),
  descripcion: z.string().optional().nullable(),
});

export const updateVehiculoSchema = z.object({
  marca: z.string().min(1).optional(),
  modelo: z.string().min(1).optional(),
  placa: z.string().min(1).optional(),
  anio: z.number().int().optional().nullable(),
  descripcion: z.string().optional().nullable(),
});

export const idParamSchema = z.object({ id: z.coerce.number().int().positive() });

export type CreateVehiculoInput = z.infer<typeof createVehiculoSchema>;
export type UpdateVehiculoInput = z.infer<typeof updateVehiculoSchema>;
