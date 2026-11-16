import './Cargando.css'

/**
 * Indicador de carga (círculo girando + texto).
 * Props:
 *  - mensaje: texto a mostrar (por defecto "Cargando…")
 *
 * role="status" hace que los lectores de pantalla anuncien el mensaje.
 */
function Cargando({ mensaje = 'Cargando…' }) {
  return (
    <div className="cargando" role="status">
      <span className="cargando-circulo" aria-hidden="true"></span>
      <p>{mensaje}</p>
    </div>
  )
}

export default Cargando
