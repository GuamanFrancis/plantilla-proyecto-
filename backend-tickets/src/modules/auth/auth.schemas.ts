import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "El email es requerido" })
    .email("Debe ser un email válido"),
  clave: z
    .string({ required_error: "La clave es requerida" })
    .min(1, "La clave no puede estar vacía"),
});

export type LoginInput = z.infer<typeof loginSchema>;
