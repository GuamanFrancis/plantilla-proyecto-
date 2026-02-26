import { z } from "zod";

export const createTicketSchema = z.object({
  clienteId: z.number({ required_error: "clienteId requerido" }).int().positive(),
  tecnicoId: z.number({ required_error: "tecnicoId requerido" }).int().positive(),
  descripcion: z.string({ required_error: "Descripción requerida" }).min(1),
  estado: z.string().optional(),
  prioridad: z.string().optional(),
});

export const updateTicketSchema = z.object({
  clienteId: z.number().int().positive().optional(),
  tecnicoId: z.number().int().positive().optional(),
  descripcion: z.string().min(1).optional(),
  estado: z.string().optional(),
  prioridad: z.string().optional(),
});

export const idParamSchema = z.object({ id: z.coerce.number().int().positive() });
export type CreateTicketInput = z.infer<typeof createTicketSchema>;
export type UpdateTicketInput = z.infer<typeof updateTicketSchema>;
