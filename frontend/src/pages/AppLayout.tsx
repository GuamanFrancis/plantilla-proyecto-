// pages/AppLayout.tsx
// El "marco del cuadro" — siempre visible en todas las páginas privadas.
// El Outlet es el cuadro que cambia, el marco nunca se mueve.
// sidebarOpen es como una puerta corrediza: true=abierta, false=cerrada

import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { logoutApi } from '../api/auth.api'
import '../styles/AppLayout.css'

export function AppLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  // Estado de la "puerta corrediza" — empieza abierta
  const [sidebarOpen, setSidebarOpen] = useState(true)

  async function handleLogout() {
    try {
      await logoutApi()
    } finally {
      logout()
      navigate('/login')
    }
  }

  return (
    <div className="layout">

      {/* NAVBAR SUPERIOR */}
      <header className="navbar">
        <div className="navbar-left">
          {/* Botón hamburguesa — abre/cierra el sidebar */}
          <button
            className="btn-toggle"
            onClick={() => setSidebarOpen(prev => !prev)}
            title={sidebarOpen ? 'Ocultar menú' : 'Mostrar menú'}
          >
            {sidebarOpen ? '✕' : '☰'}
          </button>
          <span className="navbar-brand">🏥 Sistema Médico</span>
        </div>
        <div className="navbar-user">
          <div className="user-info">
            <span className="user-name">{user?.nombre} {user?.apellido}</span>
            <span className="user-email">{user?.email}</span>
          </div>
          <button onClick={handleLogout} className="btn-logout">
            Cerrar sesión
          </button>
        </div>
      </header>

      <div className="layout-body">

        {/* SIDEBAR — se anima con CSS transition cuando sidebarOpen cambia */}
        <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <nav>
            <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
              <span className="nav-icon">🏠</span>
              <span className="nav-label">Inicio</span>
            </NavLink>
            <NavLink to="/pacientes" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
              <span className="nav-icon">👤</span>
              <span className="nav-label">Pacientes</span>
            </NavLink>
            <NavLink to="/especialidades" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
              <span className="nav-icon">🩺</span>
              <span className="nav-label">Especialidades</span>
            </NavLink>
            <NavLink to="/citas" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
              <span className="nav-icon">📅</span>
              <span className="nav-label">Citas</span>
            </NavLink>
          </nav>
        </aside>

        {/* CONTENIDO — se expande cuando el sidebar se cierra */}
        <main className="content">
          <Outlet />
        </main>

      </div>
    </div>
  )
}