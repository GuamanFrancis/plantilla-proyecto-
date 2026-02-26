import { z } from "zod";

export const createClienteSchema = z.object({
  nombre: z.string({ required_error: "Nombre requerido" }).min(1),
  apellido: z.string({ required_error: "Apellido requerido" }).min(1),
  cedula: z.string({ required_error: "Cédula requerida" }).min(1),
  telefono: z.string({ required_error: "Teléfono requerido" }).min(1),
  email: z.string().email().optional().nullable(),
});

export const updateClienteSchema = z.object({
  nombre: z.string().min(1).optional(),
  apellido: z.string().min(1).optional(),
  cedula: z.string().min(1).optional(),
  telefono: z.string().min(1).optional(),
  email: z.string().email().optional().nullable(),
});

export const idParamSchema = z.object({ id: z.coerce.number().int().positive() });

export type CreateClienteInput = z.infer<typeof createClienteSchema>;
export type UpdateClienteInput = z.infer<typeof updateClienteSchema>;
