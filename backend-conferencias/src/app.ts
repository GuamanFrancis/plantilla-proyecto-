import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";
import conferencistaRoutes from "./modules/conferencistas/conferencistas.routes";
import auditoriosRoutes from "./modules/auditorios/auditorios.routes";
import reservasRoutes from "./modules/reservas/reservas.routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "API Backend - Sistema de Gestión de Conferencias", version: "1.0.0",
    endpoints: { auth: "/api/auth", conferencistas: "/api/conferencistas", auditorios: "/api/auditorios", reservas: "/api/reservas" } });
});

app.use("/api/auth", authRoutes);
app.use("/api/conferencistas", conferencistaRoutes);
app.use("/api/auditorios", auditoriosRoutes);
app.use("/api/reservas", reservasRoutes);

app.use((_req, res) => { res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Ruta no encontrada" } }); });
app.use(errorHandler);

export default app;
