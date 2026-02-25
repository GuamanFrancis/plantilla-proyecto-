// api/especialidades.api.ts
import client from './client'
import type { ApiResponse } from '../types/api'
import type { Especialidad } from '../types/entities'

export interface CreateEspecialidadDto {
  nombre: string
  descripcion?: string
}

export type UpdateEspecialidadDto = Partial<CreateEspecialidadDto>

export async function getEspecialidades(): Promise<Especialidad[]> {
  const res = await client.get<ApiResponse<Especialidad[]>>('/especialidades')
  return res.data.data
}

export async function createEspecialidad(data: CreateEspecialidadDto): Promise<Especialidad> {
  const res = await client.post<ApiResponse<Especialidad>>('/especialidades', data)
  return res.data.data
}

export async function updateEspecialidad(id: number, data: UpdateEspecialidadDto): Promise<Especialidad> {
  const res = await client.put<ApiResponse<Especialidad>>(`/especialidades/${id}`, data)
  return res.data.data
}

export async function deleteEspecialidad(id: number): Promise<void> {
  await client.delete(`/especialidades/${id}`)
}