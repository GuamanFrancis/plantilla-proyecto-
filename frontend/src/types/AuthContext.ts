import type { User } from "./entities"


 export interface AuthContextType {
  user: User | null        // ¿Quién está logueado? null si nadie
  token: string | null     // La pulsera actual
  isLoading: boolean       // ¿Está verificando si hay sesión activa?
  login: (token: string, user: User) => void   // Registrar entrada
  logout: () => void       // Registrar salida
}