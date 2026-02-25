import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";
import pacientesRoutes from "./modules/pacientes/pacientes.routes";
import especialidadesRoutes from "./modules/especialidades/especialidades.routes";
import citasRoutes from "./modules/citas/citas.routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Ruta de bienvenida
app.get("/", (_req, res) => {
  res.json({
    message: "API Backend - Sistema de Citas Médicas",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
      pacientes: "/api/pacientes",
      especialidades: "/api/especialidades",
      citas: "/api/citas",
    },
  });
});

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/pacientes", pacientesRoutes);
app.use("/api/especialidades", especialidadesRoutes);
app.use("/api/citas", citasRoutes);

// Manejo de rutas no encontradas
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: "NOT_FOUND",
      message: "Ruta no encontrada",
    },
  });
});

// Manejo de errores global
app.use(errorHandler);

export default app;
