import { z } from "zod";

export const createPacienteSchema = z.object({
  nombre: z
    .string({ required_error: "El nombre es requerido" })
    .min(1, "El nombre no puede estar vacío"),
  apellido: z
    .string({ required_error: "El apellido es requerido" })
    .min(1, "El apellido no puede estar vacío"),
  cedula: z
    .string({ required_error: "La cédula es requerida" })
    .min(1, "La cédula no puede estar vacía"),
  telefono: z
    .string({ required_error: "El teléfono es requerido" })
    .min(1, "El teléfono no puede estar vacío"),
  email: z.string().email("Debe ser un email válido").optional().nullable(),
});

export const updatePacienteSchema = z.object({
  nombre: z.string().min(1, "El nombre no puede estar vacío").optional(),
  apellido: z.string().min(1, "El apellido no puede estar vacío").optional(),
  cedula: z.string().min(1, "La cédula no puede estar vacía").optional(),
  telefono: z.string().min(1, "El teléfono no puede estar vacío").optional(),
  email: z.string().email("Debe ser un email válido").optional().nullable(),
});

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive("El ID debe ser un número positivo"),
});

export type CreatePacienteInput = z.infer<typeof createPacienteSchema>;
export type UpdatePacienteInput = z.infer<typeof updatePacienteSchema>;
