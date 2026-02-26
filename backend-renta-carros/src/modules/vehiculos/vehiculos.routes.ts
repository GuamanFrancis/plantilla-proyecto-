import { Router } from "express";
import { vehiculosController } from "./vehiculos.controller";
import { authMiddleware } from "../../middlewares/auth";

const router = Router();
router.use(authMiddleware);
router.get("/", (req, res, next) => vehiculosController.getAll(req, res, next));
router.get("/:id", (req, res, next) => vehiculosController.getById(req, res, next));
router.post("/", (req, res, next) => vehiculosController.create(req, res, next));
router.put("/:id", (req, res, next) => vehiculosController.update(req, res, next));
router.delete("/:id", (req, res, next) => vehiculosController.delete(req, res, next));
export default router;
