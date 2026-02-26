import { Router } from "express";
import { ticketsController } from "./tickets.controller";
import { authMiddleware } from "../../middlewares/auth";

const router = Router();
router.use(authMiddleware);
router.get("/", (req, res, next) => ticketsController.getAll(req, res, next));
router.get("/:id", (req, res, next) => ticketsController.getById(req, res, next));
router.post("/", (req, res, next) => ticketsController.create(req, res, next));
router.put("/:id", (req, res, next) => ticketsController.update(req, res, next));
router.delete("/:id", (req, res, next) => ticketsController.delete(req, res, next));
export default router;
