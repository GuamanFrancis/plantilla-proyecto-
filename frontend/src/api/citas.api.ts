// api/citas.api.ts
import client from './client'
import type { ApiResponse } from '../types/api'
import type { Cita } from '../types/entities'

export interface CreateCitaDto {
  pacienteId: number
  especialidadId: number
  fecha: string
  motivo?: string
}

export async function getCitas(): Promise<Cita[]> {
  const res = await client.get<ApiResponse<Cita[]>>('/citas')
  return res.data.data
}

export async function createCita(data: CreateCitaDto): Promise<Cita> {
  const res = await client.post<ApiResponse<Cita>>('/citas', data)
  return res.data.data
}

export async function deleteCita(id: number): Promise<void> {
  await client.delete(`/citas/${id}`)
}