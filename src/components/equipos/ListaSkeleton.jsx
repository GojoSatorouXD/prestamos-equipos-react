import './ListaSkeleton.css'

/**
 * Esqueletos de carga (skeletons): cajas grises con un brillo que pasa,
 * con la misma forma de las tarjetas. Se muestran mientras llegan los equipos.
 * Props:
 *  - cantidad: cuántas tarjetas falsas dibujar (10, igual que una página)
 */
function ListaSkeleton({ cantidad = 10 }) {
  // Array.from crea un arreglo [0, 1, 2, …] para recorrerlo con map
  const tarjetas = Array.from({ length: cantidad }, (_, indice) => indice)

  return (
    <div className="lista-equipos" aria-hidden="true">
      {tarjetas.map((indice) => (
        <div key={indice} className="skeleton-tarjeta">
          <div className="skeleton skeleton-imagen"></div>
          <div className="skeleton-cuerpo">
            <div className="skeleton skeleton-badge"></div>
            <div className="skeleton skeleton-linea"></div>
            <div className="skeleton skeleton-linea corta"></div>
            <div className="skeleton skeleton-boton"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ListaSkeleton
