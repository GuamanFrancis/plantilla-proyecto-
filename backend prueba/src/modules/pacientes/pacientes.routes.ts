import { Router } from "express";
import { pacientesController } from "./pacientes.controller";
import { authMiddleware } from "../../middlewares/auth";

const router = Router();

router.use(authMiddleware);

router.get("/", (req, res, next) => pacientesController.getAll(req, res, next));
router.get("/:id", (req, res, next) => pacientesController.getById(req, res, next));
router.post("/", (req, res, next) => pacientesController.create(req, res, next));
router.put("/:id", (req, res, next) => pacientesController.update(req, res, next));
router.delete("/:id", (req, res, next) => pacientesController.delete(req, res, next));

export default router;
