import { Router } from "express";
import { reservasController } from "./reservas.controller";
import { authMiddleware } from "../../middlewares/auth";

const router = Router();
router.use(authMiddleware);
router.get("/", (req, res, next) => reservasController.getAll(req, res, next));
router.get("/:id", (req, res, next) => reservasController.getById(req, res, next));
router.post("/", (req, res, next) => reservasController.create(req, res, next));
router.put("/:id", (req, res, next) => reservasController.update(req, res, next));
router.delete("/:id", (req, res, next) => reservasController.delete(req, res, next));
export default router;
