import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import BadgeEstado from '../comunes/BadgeEstado'
import { usarImagenRespaldo } from '../../utils/equipos'
import './SidebarDetalle.css'

/**
 * Panel lateral "Ver detalle" con los 8 atributos del equipo.
 * Props:
 *  - equipo: objeto del equipo seleccionado
 *  - onCerrar: función que cierra el panel
 *  - children: (opcional) contenido extra debajo de los atributos;
 *              aquí irán los botones de préstamo y devolución
 *
 * El padre solo dibuja este componente cuando hay un equipo seleccionado.
 * Por eso se MONTA al abrir y se DESMONTA al cerrar.
 */
function SidebarDetalle({ equipo, onCerrar, children }) {
  // ---------------------------------------------------------
  // Ciclo de vida: mientras el panel está abierto
  //  - la tecla Esc lo cierra
  //  - la página de fondo no se desplaza
  // La función de limpieza deshace las dos cosas al cerrar.
  // ---------------------------------------------------------
  useEffect(() => {
    const manejarTecla = (evento) => {
      if (evento.key === 'Escape') onCerrar()
    }

    // Al montar: se registra el listener y se bloquea el scroll del fondo
    document.addEventListener('keydown', manejarTecla)
    document.body.style.overflow = 'hidden'

    // Limpieza (al desmontar): se quita el listener y se devuelve el scroll
    return () => {
      document.removeEventListener('keydown', manejarTecla)
      document.body.style.overflow = ''
    }
  }, [onCerrar])

  // Arreglo de objetos con los atributos de texto (la imagen va arriba).
  // Se recorre con map para no repetir el mismo bloque 7 veces.
  const atributos = [
    { etiqueta: 'Nombre', valor: equipo.nombre },
    { etiqueta: 'Serial', valor: equipo.serial },
    { etiqueta: 'Categoría', valor: equipo.categoria },
    { etiqueta: 'Marca', valor: equipo.marca },
    { etiqueta: 'Estado', valor: <BadgeEstado estado={equipo.estado} /> },
    { etiqueta: 'Ubicación', valor: equipo.ubicacion },
    { etiqueta: 'Especificaciones', valor: equipo.especificaciones },
  ]

  // createPortal dibuja el panel directamente dentro de <body>, fuera de la
  // vista. Así ninguna animación de la página (transform) lo desacomoda.
  return createPortal(
    <div className="sidebar-capa">
      {/* Fondo oscuro: un clic aquí cierra el panel */}
      <div className="sidebar-fondo" onClick={onCerrar} aria-hidden="true"></div>

      <aside
        className="sidebar"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sidebar-titulo"
      >
        <div className="sidebar-encabezado">
          <h2 id="sidebar-titulo">Detalle del equipo</h2>
          {/* autoFocus: al abrir, el foco del teclado queda en el botón de cerrar */}
          <button
            type="button"
            className="sidebar-cerrar"
            onClick={onCerrar}
            aria-label="Cerrar detalle"
            autoFocus
          >
            ✕
          </button>
        </div>

        <div className="sidebar-cuerpo">
          {/* Atributo 1 de 8: imagen */}
          <img
            className="sidebar-imagen"
            src={equipo.imagen}
            alt={equipo.nombre}
            width="400"
            height="260"
            onError={(evento) => usarImagenRespaldo(evento, equipo.categoria)}
          />

          {/* Atributos 2 a 8 */}
          <dl className="sidebar-atributos">
            {atributos.map((atributo) => (
              <div key={atributo.etiqueta} className="sidebar-atributo">
                <dt>{atributo.etiqueta}</dt>
                <dd>{atributo.valor}</dd>
              </div>
            ))}
          </dl>

          {/* Espacio para acciones (préstamo / devolución) */}
          {children && <div className="sidebar-acciones">{children}</div>}
        </div>
      </aside>
    </div>,
    document.body,
  )
}

export default SidebarDetalle
