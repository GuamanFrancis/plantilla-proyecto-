// pages/EspecialidadesPage.tsx
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import type { Especialidad } from '../types/entities'
import type { CreateEspecialidadDto } from '../api/especialidades.api'
import {
  getEspecialidades,
  createEspecialidad,
  updateEspecialidad,
  deleteEspecialidad,
} from '../api/especialidades.api'
import '../styles/EspecialidadesPage.css'

const EMPTY_FORM: CreateEspecialidadDto = {
  nombre: '',
  descripcion: '',
}

export function EspecialidadesPage() {
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([])
  const [formData, setFormData] = useState<CreateEspecialidadDto>(EMPTY_FORM)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    loadEspecialidades()
  }, [])

  async function loadEspecialidades() {
    const data = await getEspecialidades()
    setEspecialidades(data)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      if (editingId !== null) {
        await updateEspecialidad(editingId, formData)
      } else {
        await createEspecialidad(formData)
      }
      handleCancel()
      await loadEspecialidades()
      toast.success(editingId !== null ? 'Especialidad actualizada correctamente' : 'Especialidad creada correctamente')
    } catch (error) {
      console.error('Error al guardar especialidad:', error)
      toast.error('Ocurrió un error al guardar. Revisa los datos.')
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleEdit(e: Especialidad) {
    setFormData({
      nombre: e.nombre,
      descripcion: e.descripcion ?? '',
    })
    setEditingId(e.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleCancel() {
    setFormData(EMPTY_FORM)
    setEditingId(null)
  }

  async function handleDelete(id: number) {
    if (!confirm('¿Estás seguro de que deseas eliminar esta especialidad?')) return
    try {
      await deleteEspecialidad(id)
      await loadEspecialidades()
      toast.success('Especialidad eliminada correctamente')
    } catch (error) {
      console.error('Error al eliminar:', error)
      toast.error('No se pudo eliminar la especialidad.')
    }
  }

  return (
    <section className="especialidades-page">
      <header className="especialidades-page__header">
        <div>
          <h1 className="especialidades-page__title">Especialidades</h1>
          <p className="especialidades-page__subtitle">
            Gestión completa de especialidades del sistema.
          </p>
        </div>
      </header>

      <section className="especialidades-page__panel">
        <h2 className="especialidades-page__panel-title">
          {editingId !== null ? '✏️ Editar especialidad' : '➕ Nueva especialidad'}
        </h2>

        <form className="especialidades-page__form" onSubmit={handleSubmit}>
          <div className="especialidades-page__form-grid">

            <div className="especialidades-page__field">
              <label htmlFor="nombre">Nombre *</label>
              <input
                id="nombre"
                name="nombre"
                placeholder="Ej: Cardiología"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="especialidades-page__field especialidades-page__field--full">
              <label htmlFor="descripcion">Descripción</label>
              <textarea
                id="descripcion"
                name="descripcion"
                rows={3}
                placeholder="Descripción breve de la especialidad"
                value={formData.descripcion ?? ''}
                onChange={handleChange}
              />
            </div>

          </div>

          <div className="especialidades-page__actions">
            <button
              className="especialidades-page__btn especialidades-page__btn--primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Guardando...' : editingId !== null ? 'Actualizar' : 'Guardar'}
            </button>
            {editingId !== null && (
              <button
                className="especialidades-page__btn especialidades-page__btn--neutral"
                type="button"
                onClick={handleCancel}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="especialidades-page__panel">
        <h2 className="especialidades-page__panel-title">
          Listado ({especialidades.length})
        </h2>

        {especialidades.length === 0 ? (
          <p className="especialidades-page__empty">No hay especialidades registradas.</p>
        ) : (
          <div className="especialidades-page__table-wrap">
            <table className="especialidades-page__table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {especialidades.map((e) => (
                  <tr key={e.id}>
                    <td>#{e.id}</td>
                    <td>{e.nombre}</td>
                    <td>{e.descripcion ?? '—'}</td>
                    <td>
                      <div className="especialidades-page__actions especialidades-page__actions--compact">
                        <button
                          className="especialidades-page__btn especialidades-page__btn--neutral"
                          type="button"
                          onClick={() => handleEdit(e)}
                        >
                          Editar
                        </button>
                        <button
                          className="especialidades-page__btn especialidades-page__btn--danger"
                          type="button"
                          onClick={() => handleDelete(e.id)}
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