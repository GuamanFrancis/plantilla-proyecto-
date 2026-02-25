import { Router } from "express";
import { citasController } from "./citas.controller";
import { authMiddleware } from "../../middlewares/auth";

const router = Router();

router.use(authMiddleware);

router.get("/", (req, res, next) => citasController.getAll(req, res, next));
router.get("/:id", (req, res, next) => citasController.getById(req, res, next));
router.post("/", (req, res, next) => citasController.create(req, res, next));
router.delete("/:id", (req, res, next) => citasController.delete(req, res, next));

export default router;
