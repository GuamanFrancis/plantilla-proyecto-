// context/AuthContext.tsx
// La "recepcionista" del edificio.
// Guarda quién está logueado y comparte esa info con TODA la app.

import { createContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { User } from '../types/entities'
import { getToken, saveToken, removeToken } from '../utils/storage'
import client from '../api/client'
import type { AuthContextType } from '../types/AuthContext'

// ─── 1. La forma de los datos que la recepcionista maneja ──────────────────


// ─── 2. Crear el contexto (la recepcionista en sí) ─────────────────────────
// Se crea vacío porque aún no sabemos si hay alguien logueado
export const AuthContext = createContext<AuthContextType | null>(null)

// ─── 3. El proveedor — "envuelve" toda la app para que todos puedan acceder ─
// Piénsalo como el edificio: todo lo que esté DENTRO tiene acceso a la recepcionista
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(getToken()) // Lee la gaveta al iniciar
  const [isLoading, setIsLoading] = useState(true)

  // Al arrancar la app, si había un token guardado, verificamos que sigue siendo válido
  // Es como llegar al edificio al día siguiente: la recepcionista revisa si tu pulsera sigue activa
  useEffect(() => {
    const storedToken = getToken()
    if (!storedToken) {
      setIsLoading(false) // No hay token, no hay nada que verificar
      return
    }
    // Llamamos a /api/auth/me — el backend verifica el token y nos devuelve el usuario
    client.get('/auth/me')
      .then((res) => {
        setUser(res.data.data.user) // Guardamos quién es
        setToken(storedToken)
      })
      .catch(() => {
        // El token venció o es inválido, limpiamos todo
        removeToken()
        setUser(null)
        setToken(null)
      })
      .finally(() => setIsLoading(false))
  }, []) // El [] significa "solo ejecuta esto una vez, al montar el componente"

  
  //funcion login;

  function login (newToken: string,NewUser: User) {
    saveToken(newToken) // Guardamos la pulsera en la gaveta
    setToken(newToken)  // Actualizamos el estado con la nueva pulsera
    setUser(NewUser)    // Guardamos quién es el nuevo usuario logueado


  }


  //funcionlogout 

  function logout(){

    removeToken() // Borramos la pulsera de la gaveta
    setToken(null)  // Actualizamos el estado para reflejar que no hay pulsera
    setUser(null)   // No hay usuario logueado
  }

    return (
        <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
        {children}
        </AuthContext.Provider>
    )
}

