import { Router } from "express";
import { clientesController } from "./clientes.controller";
import { authMiddleware } from "../../middlewares/auth";

const router = Router();
router.use(authMiddleware);
router.get("/", (req, res, next) => clientesController.getAll(req, res, next));
router.get("/:id", (req, res, next) => clientesController.getById(req, res, next));
router.post("/", (req, res, next) => clientesController.create(req, res, next));
router.put("/:id", (req, res, next) => clientesController.update(req, res, next));
router.delete("/:id", (req, res, next) => clientesController.delete(req, res, next));
export default router;
