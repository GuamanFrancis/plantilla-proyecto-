// routes/PublicRoute.tsx
// El inverso del PrivateRoute.
// Si ya tienes sesión activa, no tiene sentido ir al login — te manda al dashboard.
// Es como intentar entrar por la puerta de un edificio cuando ya estás adentro.

import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function PublicRoute() {
  const { token, isLoading } = useAuth()

  // Espera a que el contexto verifique si hay sesión antes de decidir
  if (isLoading) return <div>Cargando...</div>

  // Si hay token (ya estás logueado) → manda al dashboard
  // Si no hay token → muestra la página pública (login)
  return token ? <Navigate to="/" replace /> : <Outlet />
}

export default PublicRoute