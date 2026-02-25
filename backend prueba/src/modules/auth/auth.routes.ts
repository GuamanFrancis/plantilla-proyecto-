import { Router } from "express";
import { authController } from "./auth.controller";
import { authMiddleware } from "../../middlewares/auth";

const router = Router();

router.post("/login", (req, res, next) => authController.login(req, res, next));
router.get("/me", authMiddleware, (req, res, next) => authController.me(req, res, next));
router.post("/logout", authMiddleware, (req, res, next) => authController.logout(req, res, next));

export default router;
