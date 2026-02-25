// pages/LoginPage.tsx
// La puerta de entrada al sistema.
// Formulario de login que se conecta al backend y guarda el token.

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { loginApi } from '../api/auth.api'
import '../styles/LoginPage.css'

export function LoginPage() {
  // Estados del formulario — como "cajitas de memoria" para cada campo
  const [email, setEmail] = useState('')
  const [clave, setClave] = useState('')
  const [error, setError] = useState('')        // Mensaje de error si el login falla
  const [isLoading, setIsLoading] = useState(false) // Para deshabilitar el botón mientras carga

  const { login } = useAuth()       // La función de la recepcionista para registrar la entrada
  const navigate = useNavigate()    // Para redirigir al dashboard después del login

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()  // Evita que el formulario recargue la página (comportamiento HTML nativo)
    setError('')         // Limpia el error anterior
    setIsLoading(true)

    try {
      const data = await loginApi(email, clave)  // Llama al backend
      login(data.token, data.user)               // Guarda token + usuario en el contexto
      navigate('/')                              // Redirige al dashboard
    } catch (err: unknown) {
      // Si el backend responde con error (ej: credenciales incorrectas)
      if (
        err &&
        typeof err === 'object' &&
        'response' in err &&
        err.response &&
        typeof err.response === 'object' &&
        'data' in err.response
      ) {
        const responseData = err.response.data as { error?: { message?: string } }
        setError(responseData?.error?.message ?? 'Usuario o contraseña incorrectos.')
      } else {
        setError('Usuario o contraseña incorrectos.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1>Bienvenido</h1>
        <p>Ingresa tus credenciales para continuar</p>

        {/* Si hay error, mostramos el mensaje — si no hay error, no se renderiza nada */}
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              placeholder="demo@demo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}  // Actualiza el estado al escribir
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="clave">Contraseña</label>
            <input
              id="clave"
              type="password"
              placeholder="••••••••"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-login" disabled={isLoading}>
            {isLoading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  )
}