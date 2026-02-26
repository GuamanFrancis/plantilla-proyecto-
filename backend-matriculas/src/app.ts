import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";
import estudiantesRoutes from "./modules/estudiantes/estudiantes.routes";
import materiasRoutes from "./modules/materias/materias.routes";
import matriculasRoutes from "./modules/matriculas/matriculas.routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "API Backend - Sistema de Gestión de Matrículas",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
      estudiantes: "/api/estudiantes",
      materias: "/api/materias",
      matriculas: "/api/matriculas",
    },
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/estudiantes", estudiantesRoutes);
app.use("/api/materias", materiasRoutes);
app.use("/api/matriculas", matriculasRoutes);

app.use((_req, res) => {
  res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Ruta no encontrada" } });
});

app.use(errorHandler);

export default app;
