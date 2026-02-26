import { Router } from "express";
import { matriculasController } from "./matriculas.controller";
import { authMiddleware } from "../../middlewares/auth";

const router = Router();
router.use(authMiddleware);

router.get("/", (req, res, next) => matriculasController.getAll(req, res, next));
router.get("/:id", (req, res, next) => matriculasController.getById(req, res, next));
router.post("/", (req, res, next) => matriculasController.create(req, res, next));
router.put("/:id", (req, res, next) => matriculasController.update(req, res, next));
router.delete("/:id", (req, res, next) => matriculasController.delete(req, res, next));

export default router;
