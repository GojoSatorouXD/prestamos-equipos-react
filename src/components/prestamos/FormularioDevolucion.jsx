import { useState } from 'react'
import CampoFormulario from '../comunes/CampoFormulario'
import RelojActual from './RelojActual'
import { validarCondicion, formatearFechaHora, calcularDuracion, MAX_CONDICION } from '../../utils/prestamos'

/**
 * Formulario "Registrar devolución" (solo para equipos Prestados).
 * Props:
 *  - prestamo: el préstamo activo del equipo (quién lo tiene y desde cuándo)
 *  - onRegistrar: función que recibe { condicionDevolucion, mismasCondiciones }
 *
 * La casilla decide el nuevo estado:
 *  - marcada (Sí)    -> Disponible
 *  - sin marcar (No) -> En mantenimiento
 */
function FormularioDevolucion({ prestamo, onRegistrar }) {
  const [condicion, setCondicion] = useState('')
  const [mismasCondiciones, setMismasCondiciones] = useState(false)
  const [errores, setErrores] = useState({})

  const manejarEnvio = (evento) => {
    evento.preventDefault()

    const errorCondicion = validarCondicion(condicion, 'La condición de devolución')
    if (errorCondicion) {
      setErrores({ condicion: errorCondicion })
      return
    }

    try {
      onRegistrar({ condicionDevolucion: condicion, mismasCondiciones })
    } catch (error) {
      setErrores({ general: error.message })
    }
  }

  // Texto que anticipa el resultado según la casilla
  const resultado = mismasCondiciones ? 'Disponible' : 'En mantenimiento'

  return (
    <form className="form-prestamo" onSubmit={manejarEnvio} noValidate>
      <h3>Registrar devolución</h3>

      {/* Datos del préstamo activo */}
      {prestamo && (
        <dl className="form-prestamo-resumen">
          <div>
            <dt>Lo tiene</dt>
            <dd>
              {prestamo.colaborador} ({prestamo.cargo})
            </dd>
          </div>
          <div>
            <dt>Prestado el</dt>
            <dd>{formatearFechaHora(prestamo.fechaPrestamo)}</dd>
          </div>
          <div>
            <dt>Tiempo prestado</dt>
            <dd>{calcularDuracion(prestamo.fechaPrestamo, null)}</dd>
          </div>
          <div>
            <dt>Condición de entrega</dt>
            <dd>{prestamo.condicionEntrega}</dd>
          </div>
        </dl>
      )}

      <p className="form-prestamo-fecha">
        Fecha y hora de devolución: <RelojActual />
        <span>Se registran automáticamente al guardar.</span>
      </p>

      <CampoFormulario
        etiqueta="Condición de devolución *"
        name="condicionDevolucion"
        como="textarea"
        rows={3}
        value={condicion}
        onChange={(evento) => setCondicion(evento.target.value)}
        error={errores.condicion}
        maxLength={MAX_CONDICION}
        placeholder="Ej.: Devuelto con cargador, sin daños visibles."
      />

      <label className="form-prestamo-casilla">
        <input
          type="checkbox"
          checked={mismasCondiciones}
          onChange={(evento) => setMismasCondiciones(evento.target.checked)}
        />
        ¿Llegó en las mismas condiciones?
      </label>

      <p className={mismasCondiciones ? 'form-prestamo-resultado ok' : 'form-prestamo-resultado revision'}>
        {mismasCondiciones ? 'Sí' : 'No'} → el equipo quedará <strong>{resultado}</strong>.
      </p>

      {errores.general && (
        <p className="form-prestamo-error" role="alert">
          {errores.general}
        </p>
      )}

      <button type="submit" className="boton boton-primario">
        Registrar devolución
      </button>
    </form>
  )
}

export default FormularioDevolucion
