import { Router } from "express";
import { tecnicosController } from "./tecnicos.controller";
import { authMiddleware } from "../../middlewares/auth";

const router = Router();
router.use(authMiddleware);
router.get("/", (req, res, next) => tecnicosController.getAll(req, res, next));
router.get("/:id", (req, res, next) => tecnicosController.getById(req, res, next));
router.post("/", (req, res, next) => tecnicosController.create(req, res, next));
router.put("/:id", (req, res, next) => tecnicosController.update(req, res, next));
router.delete("/:id", (req, res, next) => tecnicosController.delete(req, res, next));
export default router;
