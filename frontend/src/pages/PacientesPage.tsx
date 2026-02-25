// pages/PacientesPage.tsx
// Módulo CRUD completo de pacientes.
// La página tiene dos zonas: el formulario (crear/editar) y la tabla (listar/eliminar).

import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import type { Paciente } from '../types/entities'
import type { CreatePacienteDto } from '../api/pacientes.api'
import {
  getPacientes,
  createPaciente,
  updatePaciente,
  deletePaciente,
} from '../api/pacientes.api'
import '../styles/PacientesPage.css'

// Estado inicial del formulario — campos vacíos
// Lo usamos para limpiar el formulario después de guardar o cancelar
const EMPTY_FORM: CreatePacienteDto = {
  nombre: '',
  apellido: '',
  cedula: '',
  telefono: '',
  email: '',
}

export function PacientesPage() {
  // ── CAJITAS DE MEMORIA ──────────────────────────────────────────────────
  const [pacientes, setPacientes] = useState<Paciente[]>([])
  const [formData, setFormData] = useState<CreatePacienteDto>(EMPTY_FORM)
  const [editingId, setEditingId] = useState<number | null>(null) // null = modo crear
  const [isSubmitting, setIsSubmitting] = useState(false)

  // ── AL MONTAR: cargar lista del backend ────────────────────────────────
  // useEffect con [] = "ejecuta esto UNA sola vez cuando la página carga"
  // Es como el encargado que al abrir la tienda va al almacén a traer el inventario
  useEffect(() => {
    loadPacientes()
  }, [])

  async function loadPacientes() {
    const data = await getPacientes()
    setPacientes(data)
  }

  // ── ACTUALIZAR FORMULARIO ───────────────────────────────────────────────
  // Una sola función maneja todos los campos del form.
  // e.target.name = el atributo name del input que cambió
  // e.target.value = el texto que escribió el usuario
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    //                              ↑ "copia todo lo anterior y cambia solo este campo"
  }

  // ── GUARDAR (crear O editar) ────────────────────────────────────────────
  // Si editingId tiene un número → estamos editando ese paciente
  // Si editingId es null → estamos creando uno nuevo
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (editingId !== null) {
        // EDITAR: mandamos los datos actualizados al backend
        await updatePaciente(editingId, formData)
      } else {
        // CREAR: mandamos el nuevo paciente al backend
        await createPaciente(formData)
      }
      // Limpiamos el formulario y recargamos la lista
      handleCancel()
      await loadPacientes()
      toast.success(editingId !== null ? 'Paciente actualizado correctamente' : 'Paciente creado correctamente')
    } catch (error) {
      console.error('Error al guardar paciente:', error)
      toast.error('Ocurrió un error al guardar. Revisa los datos.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // ── EDITAR: rellenar el formulario con los datos del paciente ───────────
  // Es como cuando el encargado saca la ficha de un cliente para modificarla
  function handleEdit(p: Paciente) {
    setFormData({
      nombre: p.nombre,
      apellido: p.apellido,
      cedula: p.cedula,
      telefono: p.telefono,
      email: p.email ?? '', // ?? '' = si email es null, usa string vacío
    })
    setEditingId(p.id) // Guardamos el ID para saber a quién actualizar
    // Scroll suave hacia arriba para que el usuario vea el formulario
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // ── CANCELAR: limpiar formulario y volver a modo crear ─────────────────
  function handleCancel() {
    setFormData(EMPTY_FORM)
    setEditingId(null)
  }

  // ── ELIMINAR ────────────────────────────────────────────────────────────
  // confirm() muestra un diálogo nativo del navegador — si el usuario acepta, borra
  async function handleDelete(id: number) {
    if (!confirm('¿Estás seguro de que deseas eliminar este paciente?')) return
    try {
      await deletePaciente(id)
      await loadPacientes()
      toast.success('Paciente eliminado correctamente')
    } catch (error) {
      console.error('Error al eliminar:', error)
      toast.error('No se pudo eliminar el paciente.')
    }
  }

  // ── RENDER ──────────────────────────────────────────────────────────────
  return (
    <section className="pacientes-page">
      <header className="pacientes-page__header">
        <div>
          <h1 className="pacientes-page__title">Pacientes</h1>
          <p className="pacientes-page__subtitle">
            Gestión completa de pacientes del sistema.
          </p>
        </div>
      </header>

      {/* FORMULARIO — el título cambia según el modo */}
      <section className="pacientes-page__panel">
        <h2 className="pacientes-page__panel-title">
          {editingId !== null ? '✏️ Editar paciente' : '➕ Nuevo paciente'}
        </h2>

        <form className="pacientes-page__form" onSubmit={handleSubmit}>
          <div className="pacientes-page__form-grid">

            {/* name="nombre" es clave — handleChange lo usa para saber qué campo actualizar */}
            <div className="pacientes-page__field">
              <label htmlFor="nombre">Nombre *</label>
              <input
                id="nombre"
                name="nombre"
                placeholder="Ej: Juan"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="pacientes-page__field">
              <label htmlFor="apellido">Apellido *</label>
              <input
                id="apellido"
                name="apellido"
                placeholder="Ej: Pérez"
                value={formData.apellido}
                onChange={handleChange}
                required
              />
            </div>

            <div className="pacientes-page__field">
              <label htmlFor="cedula">Cédula *</label>
              <input
                id="cedula"
                name="cedula"
                placeholder="Ej: 0102030405"
                value={formData.cedula}
                onChange={handleChange}
                required
              />
            </div>

            <div className="pacientes-page__field">
              <label htmlFor="telefono">Teléfono *</label>
              <input
                id="telefono"
                name="telefono"
                placeholder="Ej: 0990001122"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </div>

            <div className="pacientes-page__field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Ej: paciente@email.com"
                value={formData.email ?? ''}
                onChange={handleChange}
              />
            </div>

          </div>

          <div className="pacientes-page__actions">
            <button
              className="pacientes-page__btn pacientes-page__btn--primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Guardando...' : editingId !== null ? 'Actualizar' : 'Guardar'}
            </button>
            {/* El botón cancelar solo aparece en modo edición */}
            {editingId !== null && (
              <button
                className="pacientes-page__btn pacientes-page__btn--neutral"
                type="button"
                onClick={handleCancel}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </section>

      {/* TABLA */}
      <section className="pacientes-page__panel">
        <h2 className="pacientes-page__panel-title">
          Listado ({pacientes.length})
        </h2>

        {pacientes.length === 0 ? (
          <p className="pacientes-page__empty">No hay pacientes registrados.</p>
        ) : (
          <div className="pacientes-page__table-wrap">
            <table className="pacientes-page__table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Cédula</th>
                  <th>Teléfono</th>
                  <th>Email</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {pacientes.map((p) => (
                  <tr key={p.id}>
                    <td>#{p.id}</td>
                    <td>{p.nombre} {p.apellido}</td>
                    <td>{p.cedula}</td>
                    <td>{p.telefono}</td>
                    <td>{p.email ?? '—'}</td>
                    <td>
                      <div className="pacientes-page__actions pacientes-page__actions--compact">
                        <button
                          className="pacientes-page__btn pacientes-page__btn--neutral"
                          type="button"
                          onClick={() => handleEdit(p)}
                        >
                          Editar
                        </button>
                        <button
                          className="pacientes-page__btn pacientes-page__btn--danger"
                          type="button"
                          onClick={() => handleDelete(p.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </section>
  )
}