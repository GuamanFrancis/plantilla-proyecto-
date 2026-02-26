import { Router } from "express";
import { auditoriosController } from "./auditorios.controller";
import { authMiddleware } from "../../middlewares/auth";

const router = Router();
router.use(authMiddleware);
router.get("/", (req, res, next) => auditoriosController.getAll(req, res, next));
router.get("/:id", (req, res, next) => auditoriosController.getById(req, res, next));
router.post("/", (req, res, next) => auditoriosController.create(req, res, next));
router.put("/:id", (req, res, next) => auditoriosController.update(req, res, next));
router.delete("/:id", (req, res, next) => auditoriosController.delete(req, res, next));
export default router;
