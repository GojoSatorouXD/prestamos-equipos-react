import { Link } from 'react-router-dom'
import './Banner.css'

/**
 * Banner de presentación: título de la página, foto, nombre,
 * descripción del perfil y los 2 botones de llamado a la acción (CTA).
 * Props:
 *  - perfil: objeto con nombre, rol, descripcion, foto y fotoPlaceholder
 */
function Banner({ perfil }) {
  // Evento onError: si la foto real no existe, se cambia por el placeholder.
  // Se comprueba la ruta para no entrar en un ciclo si también fallara el placeholder.
  const manejarErrorFoto = (evento) => {
    const imagen = evento.currentTarget
    if (!imagen.src.endsWith(perfil.fotoPlaceholder)) {
      imagen.src = perfil.fotoPlaceholder
    }
  }

  return (
    <section className="banner">
      <div className="contenedor banner-contenido">
        <div className="banner-texto">
          <p className="banner-etiqueta">PrestaTech · Préstamo de equipos de TI</p>
          <h1 className="banner-titulo">Del papel a lo digital: préstamos de equipos con trazabilidad</h1>

          <p className="banner-nombre">
            {perfil.nombre} <span>· {perfil.rol}</span>
          </p>
          <p className="banner-descripcion">{perfil.descripcion}</p>

          {/* 2 botones CTA: Link navega sin recargar la página */}
          <div className="banner-botones">
            <Link to="/equipos" className="boton boton-primario">
              Ver equipos
            </Link>
            <Link to="/contacto" className="boton boton-secundario">
              Contacto
            </Link>
          </div>
        </div>

        <img
          className="banner-foto"
          src={perfil.foto}
          alt={`Foto de ${perfil.nombre}`}
          width="320"
          height="320"
          onError={manejarErrorFoto}
        />
      </div>
    </section>
  )
}

export default Banner
