import { z } from "zod";

export const createCitaSchema = z.object({
  pacienteId: z.coerce
    .number({ required_error: "El pacienteId es requerido" })
    .int()
    .positive("El pacienteId debe ser un número positivo"),
  especialidadId: z.coerce
    .number({ required_error: "El especialidadId es requerido" })
    .int()
    .positive("El especialidadId debe ser un número positivo"),
  fecha: z
    .string({ required_error: "La fecha es requerida" })
    .min(1, "La fecha no puede estar vacía")
    .transform((val) => new Date(val)),
  motivo: z.string().optional().nullable(),
});

export const filterCitasSchema = z.object({
  pacienteId: z.coerce.number().int().positive().optional(),
  especialidadId: z.coerce.number().int().positive().optional(),
});

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive("El ID debe ser un número positivo"),
});

export type CreateCitaInput = z.infer<typeof createCitaSchema>;
