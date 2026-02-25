// pages/CitasPage.tsx
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import type { Cita, Paciente, Especialidad } from '../types/entities'
import type { CreateCitaDto } from '../api/citas.api'
import { getCitas, createCita, deleteCita } from '../api/citas.api'
import { getPacientes } from '../api/pacientes.api'
import { getEspecialidades } from '../api/especialidades.api'
import '../styles/CitasPage.css'

const EMPTY_FORM: CreateCitaDto = {
  pacienteId: 0,
  especialidadId: 0,
  fecha: '',
  motivo: '',
}

export function CitasPage() {
  const [citas, setCitas] = useState<Cita[]>([])
  const [pacientes, setPacientes] = useState<Paciente[]>([])
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([])
  const [formData, setFormData] = useState<CreateCitaDto>(EMPTY_FORM)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Al montar: carga las 3 listas al mismo tiempo
  useEffect(() => {
    async function loadAll() {
      const [c, p, e] = await Promise.all([
        getCitas(),
        getPacientes(),
        getEspecialidades(),
      ])
      setCitas(c)
      setPacientes(p)
      setEspecialidades(e)
    }
    loadAll()
  }, [])

  async function loadCitas() {
    const data = await getCitas()
    setCitas(data)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    // Los selects mandan string, pero pacienteId y especialidadId deben ser number
    setFormData(prev => ({
      ...prev,
      [name]: name === 'pacienteId' || name === 'especialidadId' ? Number(value) : value,
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (formData.pacienteId === 0 || formData.especialidadId === 0) {
      toast.error('Selecciona un paciente y una especialidad.')
      return
    }
    setIsSubmitting(true)
    try {
      await createCita(formData)
      setFormData(EMPTY_FORM)
      await loadCitas()
      toast.success('Cita creada correctamente')
    } catch (error) {
      console.error('Error al guardar cita:', error)
      toast.error('Ocurrió un error al guardar. Revisa los datos.')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('¿Estás seguro de que deseas eliminar esta cita?')) return
    try {
      await deleteCita(id)
      await loadCitas()
      toast.success('Cita eliminada correctamente')
    } catch (error) {
      console.error('Error al eliminar:', error)
      toast.error('No se pudo eliminar la cita.')
    }
  }

  return (
    <section className="citas-page">
      <header className="citas-page__header">
        <div>
          <h1 className="citas-page__title">Citas</h1>
          <p className="citas-page__subtitle">
            Agenda de citas médicas del sistema.
          </p>
        </div>
      </header>

      <section className="citas-page__panel">
        <h2 className="citas-page__panel-title">➕ Nueva cita</h2>

        <form className="citas-page__form" onSubmit={handleSubmit}>
          <div className="citas-page__form-grid">

            <div className="citas-page__field">
              <label htmlFor="pacienteId">Paciente *</label>
              <select
                id="pacienteId"
                name="pacienteId"
                value={formData.pacienteId}
                onChange={handleChange}
                required
              >
                <option value={0} disabled>Seleccionar paciente</option>
                {pacientes.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.nombre} {p.apellido}
                  </option>
                ))}
              </select>
            </div>

            <div className="citas-page__field">
              <label htmlFor="especialidadId">Especialidad *</label>
              <select
                id="especialidadId"
                name="especialidadId"
                value={formData.especialidadId}
                onChange={handleChange}
                required
              >
                <option value={0} disabled>Seleccionar especialidad</option>
                {especialidades.map(e => (
                  <option key={e.id} value={e.id}>
                    {e.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="citas-page__field">
              <label htmlFor="fecha">Fecha y hora *</label>
              <input
                id="fecha"
                name="fecha"
                type="datetime-local"
                value={formData.fecha}
                onChange={handleChange}
                required
              />
            </div>

            <div className="citas-page__field citas-page__field--full">
              <label htmlFor="motivo">Motivo</label>
              <textarea
                id="motivo"
                name="motivo"
                rows={3}
                placeholder="Describe el motivo de la cita"
                value={formData.motivo ?? ''}
                onChange={handleChange}
              />
            </div>

          </div>

          <div className="citas-page__actions">
            <button
              className="citas-page__btn citas-page__btn--primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Guardando...' : 'Guardar cita'}
            </button>
          </div>
        </form>
      </section>

      <section className="citas-page__panel">
        <h2 className="citas-page__panel-title">Listado ({citas.length})</h2>

        {citas.length === 0 ? (
          <p className="citas-page__empty">No hay citas registradas.</p>
        ) : (
          <div className="citas-page__table-wrap">
            <table className="citas-page__table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Paciente</th>
                  <th>Especialidad</th>
                  <th>Fecha</th>
                  <th>Motivo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {citas.map((c) => (
                  <tr key={c.id}>
                    <td>#{c.id}</td>
                    <td>{c.paciente.nombre} {c.paciente.apellido}</td>
                    <td>{c.especialidad.nombre}</td>
                    <td>{new Date(c.fecha).toLocaleString('es-EC')}</td>
                    <td>{c.motivo ?? '—'}</td>
                    <td>
                      <button
                        className="citas-page__btn citas-page__btn--danger"
                        type="button"
                        onClick={() => handleDelete(c.id)}
                      >
                        Eliminar
                      </button>
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