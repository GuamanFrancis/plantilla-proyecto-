import { Router } from "express";
import { estudiantesController } from "./estudiantes.controller";
import { authMiddleware } from "../../middlewares/auth";

const router = Router();
router.use(authMiddleware);

router.get("/", (req, res, next) => estudiantesController.getAll(req, res, next));
router.get("/:id", (req, res, next) => estudiantesController.getById(req, res, next));
router.post("/", (req, res, next) => estudiantesController.create(req, res, next));
router.put("/:id", (req, res, next) => estudiantesController.update(req, res, next));
router.delete("/:id", (req, res, next) => estudiantesController.delete(req, res, next));

export default router;
