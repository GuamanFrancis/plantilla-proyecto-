// routes/PrivateRoute.tsx
// El "portero" de las páginas protegidas.
// Si no tienes sesión activa, te manda al login.

import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function PrivateRoute() {
  const { token, isLoading } = useAuth()

  // Mientras se verifica si el token guardado sigue siendo válido,
  // no renderizamos nada. Evita el "parpadeo" de redirigir al login
  // cuando en realidad SÍ hay sesión.
  if (isLoading) {
    return <div>Cargando...</div>
  }

  // Si hay token = hay sesión = deja pasar
  // <Outlet /> es "el contenido de la página que está adentro"
  // Si no hay token = manda al login
  return token ? <Outlet /> : <Navigate to="/login" replace />
}

export default PrivateRoute