// ─── 4. Hook personalizado — la forma fácil de hablar con la recepcionista ──
// En vez de escribir useContext(AuthContext) en cada componente,

import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

// escribes useAuth() y ya. Más limpio, más rápido.
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }
  return context
}