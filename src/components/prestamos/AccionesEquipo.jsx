import { usePrestamos } from '../../context/PrestamosContext'
import { useNotificaciones } from '../../context/NotificacionesContext'
import FormularioPrestamo from './FormularioPrestamo'
import FormularioDevolucion from './FormularioDevolucion'
import './AccionesEquipo.css'

/**
 * Acciones del sidebar según el estado del equipo:
 *  - Disponible       -> formulario "Registrar préstamo"
 *  - Prestado         -> formulario "Registrar devolución"
 *  - En mantenimiento -> botón "Marcar como reparado"
 * Props:
 *  - equipo: el equipo seleccionado
 *
 * Después de cada acción muestra un aviso flotante (toast) de confirmación.
 */
function AccionesEquipo({ equipo }) {
  const {
    colaboradores,
    registrarPrestamo,
    registrarDevolucion,
    marcarReparado,
    obtenerPrestamoActivo,
    ubicacionOriginalDe,
  } = usePrestamos()
  const { notificar } = useNotificaciones()

  const manejarPrestamo = (datos) => {
    // Si registrarPrestamo lanza un Error, lo atrapa el formulario
    // (y no se llega a mostrar el aviso)
    const prestamo = registrarPrestamo({ equipoId: equipo.id, ...datos })
    notificar({
      tipo: 'exito',
      titulo: 'Préstamo registrado',
      mensaje: `${prestamo.colaborador} recibió ${equipo.nombre}. Nueva ubicación: ${prestamo.ubicacionPrestamo}.`,
    })
  }

  const manejarDevolucion = (datos) => {
    const resultado = registrarDevolucion({ equipoId: equipo.id, ...datos })
    // Si no llegó en las mismas condiciones el aviso es amarillo (revisión)
    notificar({
      tipo: resultado.estado === 'Disponible' ? 'exito' : 'aviso',
      titulo: 'Devolución registrada',
      mensaje: `${equipo.nombre} quedó ${resultado.estado}, en ${resultado.ubicacion}.`,
    })
  }

  const manejarReparado = () => {
    const ubicacion = marcarReparado(equipo.id)
    notificar({
      tipo: 'exito',
      titulo: 'Equipo reparado',
      mensaje: `${equipo.nombre} volvió a estar Disponible, en ${ubicacion}.`,
    })
  }

  // Se elige qué mostrar según el estado actual del equipo
  let accion = null
  if (equipo.estado === 'Disponible') {
    accion = <FormularioPrestamo colaboradores={colaboradores} onRegistrar={manejarPrestamo} />
  } else if (equipo.estado === 'Prestado') {
    accion = (
      <FormularioDevolucion
        prestamo={obtenerPrestamoActivo(equipo.id)}
        ubicacionOriginal={ubicacionOriginalDe(equipo.id)}
        onRegistrar={manejarDevolucion}
      />
    )
  } else if (equipo.estado === 'En mantenimiento') {
    accion = (
      <div className="form-prestamo">
        <h3>En mantenimiento</h3>
        <p className="form-prestamo-texto">
          Cuando el equipo esté revisado y funcionando, márcalo como reparado para que vuelva a estar disponible.
        </p>
        <p className="form-prestamo-texto">
          Volverá a: <strong>{ubicacionOriginalDe(equipo.id)}</strong>
        </p>
        <button type="button" className="boton boton-primario" onClick={manejarReparado}>
          Marcar como reparado
        </button>
      </div>
    )
  }

  return (
    <div className="acciones-equipo">{accion}</div>
  )
}

export default AccionesEquipo
