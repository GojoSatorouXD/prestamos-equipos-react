import { useState } from 'react'
import CampoFormulario from '../comunes/CampoFormulario'
import RelojActual from './RelojActual'
import { validarCondicion, MAX_CONDICION } from '../../utils/prestamos'

/**
 * Formulario "Registrar préstamo" (solo para equipos Disponibles).
 * Props:
 *  - colaboradores: arreglo de colaboradores para el selector
 *  - onRegistrar: función que recibe { colaboradorId, condicionEntrega }.
 *                 Si algo no es válido lanza un Error con el mensaje.
 *
 * La fecha y la hora NO se escriben: se toman automáticamente al guardar.
 */
function FormularioPrestamo({ colaboradores, onRegistrar }) {
  const [colaboradorId, setColaboradorId] = useState('')
  const [condicion, setCondicion] = useState('')
  const [errores, setErrores] = useState({})

  const manejarEnvio = (evento) => {
    evento.preventDefault()

    // Validación antes de llamar al contexto
    const nuevosErrores = {}
    if (colaboradorId === '') nuevosErrores.colaborador = 'Selecciona el colaborador que recibe el equipo.'
    const errorCondicion = validarCondicion(condicion, 'La condición de entrega')
    if (errorCondicion) nuevosErrores.condicion = errorCondicion
    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length > 0) return

    try {
      // El value de un <select> es texto: se convierte a número con Number()
      onRegistrar({ colaboradorId: Number(colaboradorId), condicionEntrega: condicion })
    } catch (error) {
      setErrores({ general: error.message })
    }
  }

  return (
    <form className="form-prestamo" onSubmit={manejarEnvio} noValidate>
      <h3>Registrar préstamo</h3>

      <p className="form-prestamo-fecha">
        Fecha y hora del préstamo: <RelojActual />
        <span>Se registran automáticamente al guardar.</span>
      </p>

      <CampoFormulario
        etiqueta="Colaborador que recibe *"
        name="colaborador"
        como="select"
        value={colaboradorId}
        onChange={(evento) => setColaboradorId(evento.target.value)}
        error={errores.colaborador}
      >
        <option value="">Selecciona un colaborador…</option>
        {colaboradores.map((colaborador) => (
          <option key={colaborador.id} value={colaborador.id}>
            {colaborador.nombreCompleto} — {colaborador.cargo}
          </option>
        ))}
      </CampoFormulario>

      <CampoFormulario
        etiqueta="Condición de entrega *"
        name="condicionEntrega"
        como="textarea"
        rows={3}
        value={condicion}
        onChange={(evento) => setCondicion(evento.target.value)}
        error={errores.condicion}
        maxLength={MAX_CONDICION}
        placeholder="Ej.: Buen estado, con cargador y funda. Sin golpes."
      />

      {errores.general && (
        <p className="form-prestamo-error" role="alert">
          {errores.general}
        </p>
      )}

      <button type="submit" className="boton boton-primario">
        Registrar préstamo
      </button>
    </form>
  )
}

export default FormularioPrestamo
