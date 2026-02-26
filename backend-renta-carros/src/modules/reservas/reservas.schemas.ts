import { z } from "zod";

export const createReservaSchema = z.object({
  clienteId: z.number({ required_error: "clienteId requerido" }).int().positive(),
  vehiculoId: z.number({ required_error: "vehiculoId requerido" }).int().positive(),
  fechaInicio: z.string({ required_error: "fechaInicio requerida" }),
  fechaFin: z.string({ required_error: "fechaFin requerida" }),
  descripcion: z.string().optional().nullable(),
});

export const updateReservaSchema = z.object({
  clienteId: z.number().int().positive().optional(),
  vehiculoId: z.number().int().positive().optional(),
  fechaInicio: z.string().optional(),
  fechaFin: z.string().optional(),
  descripcion: z.string().optional().nullable(),
});

export const idParamSchema = z.object({ id: z.coerce.number().int().positive() });

export type CreateReservaInput = z.infer<typeof createReservaSchema>;
export type UpdateReservaInput = z.infer<typeof updateReservaSchema>;
