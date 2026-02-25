// utils/storage.ts
// Esta utilidad maneja el token JWT en el localStorage.
// Piénsalo como la "gaveta" donde guardas tu pulsera de acceso.

const TOKEN_KEY = 'auth_token'  // El nombre de la gaveta

// Guarda la pulsera en la gaveta
export function saveToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

// Saca la pulsera de la gaveta (puede ser null si no hay ninguna)
export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

// Bota la pulsera (cuando el usuario hace logout)
export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}