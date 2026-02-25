// types/api.ts
// Los "sobres" en los que el backend envía las respuestas.
// Siempre tienen la misma forma, solo cambia el contenido de adentro.

// Cuando todo sale bien: { success: true, data: ... }
export interface ApiResponse<T> {
  success: true
  data: T
}

// Cuando algo sale mal: { success: false, error: { code, message } }
export interface ApiError {
  success: false
  error: {
    code: string
    message: string
    details?: { field: string; message: string }[]
  }
}