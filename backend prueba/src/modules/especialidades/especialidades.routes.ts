import { Router } from "express";
import { especialidadesController } from "./especialidades.controller";
import { authMiddleware } from "../../middlewares/auth";

const router = Router();

router.use(authMiddleware);

router.get("/", (req, res, next) => especialidadesController.getAll(req, res, next));
router.get("/:id", (req, res, next) => especialidadesController.getById(req, res, next));
router.post("/", (req, res, next) => especialidadesController.create(req, res, next));
router.put("/:id", (req, res, next) => especialidadesController.update(req, res, next));
router.delete("/:id", (req, res, next) => especialidadesController.delete(req, res, next));

export default router;
