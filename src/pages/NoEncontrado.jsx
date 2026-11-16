import { Link } from 'react-router-dom'
import TituloPagina from '../components/comunes/TituloPagina'

/**
 * Página 404: se muestra cuando la ruta no existe.
 */
function NoEncontrado() {
  return (
    <section className="contenedor">
      <TituloPagina titulo="Página no encontrada" subtitulo="La dirección que buscas no existe." />
      <Link to="/" className="boton boton-primario">
        Volver al inicio
      </Link>
    </section>
  )
}

export default NoEncontrado
