import { Request, Response, NextFunction } from "express";
import { loginSchema } from "./auth.schemas";
import { authService } from "./auth.service";
import { successResponse, messageResponse } from "../../utils/responses";

export class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data = loginSchema.parse(req.body);
      const result = await authService.login(data);
      return successResponse(res, result);
    } catch (error) {
      next(error);
    }
  }

  async me(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const result = await authService.me(userId);
      return successResponse(res, result);
    } catch (error) {
      next(error);
    }
  }

  async logout(_req: Request, res: Response, _next: NextFunction) {
    return messageResponse(res, "Sesión cerrada correctamente");
  }
}

export const authController = new AuthController();
