import { Link } from 'react-router-dom'
import '../styles/NotFoundPage.css'

export const NotFoundPage = () => {
  return (
    <section className="not-found-page">
      <div className="not-found-page__panel">
        <p className="not-found-page__pill">Error 404</p>
        <h1 className="not-found-page__title">Pagina no encontrada</h1>
        <p className="not-found-page__subtitle">La ruta que intentaste abrir no existe en esta plantilla.</p>

        <div className="not-found-page__actions">
          <Link to="/" className="not-found-page__btn not-found-page__btn--primary">Volver al inicio</Link>
          <Link to="/login" className="not-found-page__btn not-found-page__btn--neutral">Ir a login</Link>
        </div>
      </div>
    </section>
  )
}
