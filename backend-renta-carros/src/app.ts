import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";
import clientesRoutes from "./modules/clientes/clientes.routes";
import vehiculosRoutes from "./modules/vehiculos/vehiculos.routes";
import reservasRoutes from "./modules/reservas/reservas.routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "API Backend - Sistema de Renta de Carros", version: "1.0.0",
    endpoints: { auth: "/api/auth", clientes: "/api/clientes", vehiculos: "/api/vehiculos", reservas: "/api/reservas" } });
});

app.use("/api/auth", authRoutes);
app.use("/api/clientes", clientesRoutes);
app.use("/api/vehiculos", vehiculosRoutes);
app.use("/api/reservas", reservasRoutes);

app.use((_req, res) => { res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Ruta no encontrada" } }); });
app.use(errorHandler);

export default app;
