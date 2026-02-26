import { Router } from "express";
import { conferencistaController } from "./conferencistas.controller";
import { authMiddleware } from "../../middlewares/auth";

const router = Router();
router.use(authMiddleware);
router.get("/", (req, res, next) => conferencistaController.getAll(req, res, next));
router.get("/:id", (req, res, next) => conferencistaController.getById(req, res, next));
router.post("/", (req, res, next) => conferencistaController.create(req, res, next));
router.put("/:id", (req, res, next) => conferencistaController.update(req, res, next));
router.delete("/:id", (req, res, next) => conferencistaController.delete(req, res, next));
export default router;
