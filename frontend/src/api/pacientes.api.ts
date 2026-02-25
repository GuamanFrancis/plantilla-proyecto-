// api/pacientes.api.ts
// Todas las llamadas HTTP relacionadas con pacientes.
// La página no toca Axios directamente — solo llama estas funciones.

import client from './client'
import type { ApiResponse } from '../types/api'
import type { Paciente } from '../types/entities'

// Tipo que define qué campos se mandan al CREAR un paciente
// No incluye id, createdAt ni updatedAt — esos los genera el backend
export interface CreatePacienteDto {
  nombre: string
  apellido: string
  cedula: string
  telefono: string
  email?: string  // opcional, el backend lo acepta o no
}

// Para UPDATE todos los campos son opcionales (solo mandas lo que cambió)
export type UpdatePacienteDto = Partial<CreatePacienteDto>

// GET /api/pacientes — trae la lista completa
export async function getPacientes(): Promise<Paciente[]> {
  const res = await client.get<ApiResponse<Paciente[]>>('/pacientes')
  return res.data.data
}

// POST /api/pacientes — crea uno nuevo
export async function createPaciente(data: CreatePacienteDto): Promise<Paciente> {
  const res = await client.post<ApiResponse<Paciente>>('/pacientes', data)
  return res.data.data
}

// PUT /api/pacientes/:id — actualiza un paciente existente
export async function updatePaciente(id: number, data: UpdatePacienteDto): Promise<Paciente> {
  const res = await client.put<ApiResponse<Paciente>>(`/pacientes/${id}`, data)
  return res.data.data
}

// DELETE /api/pacientes/:id — elimina un paciente
export async function deletePaciente(id: number): Promise<void> {
  await client.delete(`/pacientes/${id}`)
}