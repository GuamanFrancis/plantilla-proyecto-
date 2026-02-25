// pages/DashboardPage.tsx
import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { getPacientes } from '../api/pacientes.api'
import { getEspecialidades } from '../api/especialidades.api'
import { getCitas } from '../api/citas.api'
import '../styles/DashboardPage.css'

export function DashboardPage() {
  const { user } = useAuth()
  const [counts, setCounts] = useState({ pacientes: 0, especialidades: 0, citas: 0 })

  useEffect(() => {
    async function loadCounts() {
      const [p, e, c] = await Promise.all([
        getPacientes(),
        getEspecialidades(),
        getCitas(),
      ])
      setCounts({ pacientes: p.length, especialidades: e.length, citas: c.length })
    }
    loadCounts()
  }, [])

  return (
    <section className="dashboard-page">
      <header className="dashboard-page__header">
        <div>
          <h1 className="dashboard-page__title">Dashboard</h1>
          <p className="dashboard-page__subtitle">
            Bienvenido, <strong>{user?.nombre} {user?.apellido}</strong>
          </p>
        </div>
      </header>

      <div className="dashboard-page__stats-grid">
        <article className="dashboard-page__stat-card">
          <p className="dashboard-page__stat-label">Pacientes</p>
          <p className="dashboard-page__stat-value">{counts.pacientes}</p>
        </article>
        <article className="dashboard-page__stat-card">
          <p className="dashboard-page__stat-label">Especialidades</p>
          <p className="dashboard-page__stat-value">{counts.especialidades}</p>
        </article>
        <article className="dashboard-page__stat-card">
          <p className="dashboard-page__stat-label">Citas</p>
          <p className="dashboard-page__stat-value">{counts.citas}</p>
        </article>
      </div>
    </section>
  )
}