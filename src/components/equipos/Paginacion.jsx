import './Paginacion.css'

/**
 * Controles de paginación: Anterior, números de página y Siguiente.
 * Props:
 *  - paginaActual: número de la página que se está viendo (empieza en 1)
 *  - totalPaginas: cuántas páginas hay en total
 *  - onCambiarPagina: función que recibe el número de la nueva página
 *
 * Este componente no guarda estado: solo avisa al padre (Equipos)
 * qué página se eligió, y el padre decide qué mostrar.
 */
function Paginacion({ paginaActual, totalPaginas, onCambiarPagina }) {
  // Con una sola página no hace falta mostrar los controles
  if (totalPaginas <= 1) return null

  // Arreglo [1, 2, 3, ...] para dibujar un botón por página
  const numeros = Array.from({ length: totalPaginas }, (_, indice) => indice + 1)

  return (
    <nav className="paginacion" aria-label="Paginación de equipos">
      <button
        type="button"
        className="paginacion-boton"
        onClick={() => onCambiarPagina(paginaActual - 1)}
        disabled={paginaActual === 1}
      >
        ← Anterior
      </button>

      {numeros.map((numero) => (
        <button
          key={numero}
          type="button"
          className={numero === paginaActual ? 'paginacion-boton activo' : 'paginacion-boton'}
          onClick={() => onCambiarPagina(numero)}
          aria-current={numero === paginaActual ? 'page' : undefined}
          aria-label={`Página ${numero}`}
        >
          {numero}
        </button>
      ))}

      <button
        type="button"
        className="paginacion-boton"
        onClick={() => onCambiarPagina(paginaActual + 1)}
        disabled={paginaActual === totalPaginas}
      >
        Siguiente →
      </button>
    </nav>
  )
}

export default Paginacion
