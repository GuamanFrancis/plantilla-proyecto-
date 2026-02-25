// routes/router.tsx
// El mapa de la app: qué URL muestra qué página.
// Piénsalo como el índice de un libro — cada capítulo tiene su número de página.

import { createBrowserRouter } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'

// Páginas (las iremos creando — por ahora importamos aunque no existan aún,
// las crearás tú en los pasos siguientes)
import {LoginPage} from '../pages/LoginPage'
import {DashboardPage} from '../pages/DashboardPage'
import {PacientesPage} from '../pages/PacientesPage'
import {EspecialidadesPage} from '../pages/EspecialidadesPage'
import {CitasPage} from '../pages/CitasPage'
import {NotFoundPage} from '../pages/NotFoundPage'
import PublicRoute from './PublicRoute'
import { AppLayout } from '../pages/AppLayout'

const router = createBrowserRouter([
  // Ruta pública: cualquiera puede entrar sin sesión
  {
    element: <PublicRoute />,              // ← envuelve el login
    children: [
      { path: '/login', element: <LoginPage /> },
    ],
  },

  // Rutas privadas: todas pasan por el PrivateRoute (el portero)
  // El portero envuelve todas las rutas de adentro
  {
    element: <PrivateRoute />,
    children: [{
      element: <AppLayout />,        // ← el frame que nunca desaparece
      children: [
        { path: '/', element: <DashboardPage /> },
        { path: '/pacientes', element: <PacientesPage /> },
        { path: '/especialidades', element: <EspecialidadesPage /> },
        { path: '/citas', element: <CitasPage /> },
      ],
    }],
  },

  // Cualquier URL que no existe muestra el NotFound
  {
    path: '*',
    element: <NotFoundPage />,
  },
])

export default router