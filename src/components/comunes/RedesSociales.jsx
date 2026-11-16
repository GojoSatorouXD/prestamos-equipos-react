import './RedesSociales.css'

// Objeto con el dibujo SVG de cada ícono (la clave es el campo "icono" de cada red)
const ICONOS = {
  github: (
    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
  ),
  correo: (
    <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1 2.4V17h16V7.4l-8 5.6-8-5.6ZM5.2 7 12 11.8 18.8 7H5.2Z" />
  ),
}

/**
 * Lista de redes sociales con ícono.
 * Props:
 *  - redes: arreglo de objetos { nombre, texto, url, icono }
 *  - mostrarTexto: si es true, muestra el usuario o correo junto al ícono
 *
 * Se reutiliza en la vista Inicio y en el Footer.
 */
function RedesSociales({ redes, mostrarTexto = true }) {
  return (
    <ul className="redes">
      {redes.map((red) => {
        // Los enlaces web se abren en otra pestaña; el mailto no lo necesita
        const esWeb = red.url.startsWith('http')

        return (
          <li key={red.nombre}>
            <a
              className="redes-enlace"
              href={red.url}
              target={esWeb ? '_blank' : undefined}
              rel={esWeb ? 'noreferrer' : undefined}
              aria-label={`${red.nombre}: ${red.texto}`}
            >
              <svg className="redes-icono" viewBox="0 0 24 24" aria-hidden="true">
                {ICONOS[red.icono]}
              </svg>
              {mostrarTexto && <span>{red.texto}</span>}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export default RedesSociales
