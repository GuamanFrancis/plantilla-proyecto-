import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";
import tecnicosRoutes from "./modules/tecnicos/tecnicos.routes";
import clientesRoutes from "./modules/clientes/clientes.routes";
import ticketsRoutes from "./modules/tickets/tickets.routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "API Backend - Sistema de Tickets de Asistencia Técnica", version: "1.0.0",
    endpoints: { auth: "/api/auth", tecnicos: "/api/tecnicos", clientes: "/api/clientes", tickets: "/api/tickets" } });
});

app.use("/api/auth", authRoutes);
app.use("/api/tecnicos", tecnicosRoutes);
app.use("/api/clientes", clientesRoutes);
app.use("/api/tickets", ticketsRoutes);

app.use((_req, res) => { res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Ruta no encontrada" } }); });
app.use(errorHandler);

export default app;
