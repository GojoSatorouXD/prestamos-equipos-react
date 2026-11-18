import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Banner.css'

/**
 * Banner de presentación. De arriba hacia abajo:
 *  1. Saludo directo ("Hola, soy Juan David 👋") y el rol, para que se
 *     entienda al instante quién soy y qué hago.
 *  2. Título de la página, descripción del perfil y los 2 botones CTA.
 *  3. Foto (a la derecha en escritorio, debajo del texto en celular).
 * Props:
 *  - perfil: objeto con nombre, nombreCorto, rol, descripcion, foto y fotoPlaceholder
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
          {/* 1. Saludo: lo primero que se lee en la página */}
          <p className="banner-saludo">
            Hola, soy{' '}
            {/* nowrap: el nombre y la mano siempre quedan en la misma línea */}
            <span className="banner-saludo-nombre">
              <span className="texto-degradado">{perfil.nombreCorto}</span>{' '}
              {/* La mano saluda: rota de un lado a otro al cargar */}
              <motion.span
                className="banner-mano"
                role="img"
                aria-label="mano saludando"
                animate={{ rotate: [0, 18, -8, 18, -4, 10, 0] }}
                transition={{ duration: 1.6, delay: 0.4, ease: 'easeInOut' }}
              >
                👋
              </motion.span>
            </span>
          </p>
          <p className="banner-rol">{perfil.rol}</p>

          {/* 2. Título de la página (h1) y presentación del proyecto */}
          <p className="banner-etiqueta">PrestaTech · Préstamo de equipos de TI</p>
          <h1 className="banner-titulo">Del papel a lo digital: préstamos de equipos con trazabilidad</h1>
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

        {/* El marco dibuja el anillo en degradado alrededor de la foto */}
        <div className="banner-foto-marco">
          <img
            className="banner-foto"
            src={perfil.foto}
            alt={`Foto de ${perfil.nombre}`}
            width="320"
            height="320"
            onError={manejarErrorFoto}
          />
        </div>
      </div>
    </section>
  )
}

export default Banner
