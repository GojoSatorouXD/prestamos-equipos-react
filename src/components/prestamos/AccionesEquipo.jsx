import { useState } from 'react'
import { usePrestamos } from '../../context/PrestamosContext'
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
 * Después de cada acción muestra un mensaje de confirmación.
 */
function AccionesEquipo({ equipo }) {
  const { colaboradores, registrarPrestamo, registrarDevolucion, marcarReparado, obtenerPrestamoActivo } =
    usePrestamos()
  const [mensaje, setMensaje] = useState('')

  const manejarPrestamo = (datos) => {
    // Si registrarPrestamo lanza un Error, lo atrapa el formulario
    const prestamo = registrarPrestamo({ equipoId: equipo.id, ...datos })
    setMensaje(`Préstamo registrado: ${prestamo.colaborador} recibió el equipo.`)
  }

  const manejarDevolucion = (datos) => {
    const nuevoEstado = registrarDevolucion({ equipoId: equipo.id, ...datos })
    setMensaje(`Devolución registrada. El equipo quedó ${nuevoEstado}.`)
  }

  const manejarReparado = () => {
    marcarReparado(equipo.id)
    setMensaje('El equipo quedó Disponible.')
  }

  // Se elige qué mostrar según el estado actual del equipo
  let accion = null
  if (equipo.estado === 'Disponible') {
    accion = <FormularioPrestamo colaboradores={colaboradores} onRegistrar={manejarPrestamo} />
  } else if (equipo.estado === 'Prestado') {
    accion = <FormularioDevolucion prestamo={obtenerPrestamoActivo(equipo.id)} onRegistrar={manejarDevolucion} />
  } else if (equipo.estado === 'En mantenimiento') {
    accion = (
      <div className="form-prestamo">
        <h3>En mantenimiento</h3>
        <p className="form-prestamo-texto">
          Cuando el equipo esté revisado y funcionando, márcalo como reparado para que vuelva a estar disponible.
        </p>
        <button type="button" className="boton boton-primario" onClick={manejarReparado}>
          Marcar como reparado
        </button>
      </div>
    )
  }

  return (
    <div className="acciones-equipo">
      {mensaje && (
        <p className="acciones-mensaje" role="status">
          ✓ {mensaje}
        </p>
      )}
      {accion}
    </div>
  )
}

export default AccionesEquipo
