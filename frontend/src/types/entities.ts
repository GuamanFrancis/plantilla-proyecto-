// types/entities.ts
// La forma de cada entidad del sistema.
// Estos moldes coinciden con lo que el backend devuelve.

export interface User {
  id: number
  nombre: string
  apellido: string
  email: string
}

export interface LoginResponse {
  token: string
  user: User
}

export interface Paciente {
  id: number
  nombre: string
  apellido: string
  cedula: string
  telefono: string
  email: string | null
  createdAt: string
  updatedAt: string
}

export interface Especialidad {
  id: number
  nombre: string
  descripcion: string | null
  createdAt: string
  updatedAt: string
}

export interface Cita {
  id: number
  pacienteId: number
  especialidadId: number
  fecha: string
  motivo: string | null
  paciente: Paciente
  especialidad: Especialidad
  createdAt: string
  updatedAt: string
}