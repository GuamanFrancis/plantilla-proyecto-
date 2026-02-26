import { Router } from "express";
import { materiasController } from "./materias.controller";
import { authMiddleware } from "../../middlewares/auth";

const router = Router();
router.use(authMiddleware);

router.get("/", (req, res, next) => materiasController.getAll(req, res, next));
router.get("/:id", (req, res, next) => materiasController.getById(req, res, next));
router.post("/", (req, res, next) => materiasController.create(req, res, next));
router.put("/:id", (req, res, next) => materiasController.update(req, res, next));
router.delete("/:id", (req, res, next) => materiasController.delete(req, res, next));

export default router;
