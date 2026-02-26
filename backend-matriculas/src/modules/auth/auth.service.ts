import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../db/client";
import { env } from "../../config/env";
import { UnauthorizedError } from "../../utils/httpErrors";
import { LoginInput } from "./auth.schemas";

export class AuthService {
  async login(input: LoginInput) {
    const user = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (!user) {
      throw new UnauthorizedError("Usuario o contraseña incorrectos.");
    }

    const isValid = await bcrypt.compare(input.clave, user.passwordHash);
    if (!isValid) {
      throw new UnauthorizedError("Usuario o contraseña incorrectos.");
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN as any }
    );

    return {
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
      },
    };
  }

  async me(userId: number) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, nombre: true, apellido: true, email: true },
    });

    if (!user) {
      throw new UnauthorizedError("Usuario no encontrado");
    }

    return { user };
  }
}

export const authService = new AuthService();
