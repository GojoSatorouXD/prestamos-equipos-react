import { useState } from 'react'
import CampoFormulario from '../comunes/CampoFormulario'
import { enviarCorreo } from '../../services/correoService'
import {
  validarCampo,
  validarFormulario,
  soloLetras,
  soloNumeros,
  MAX_NOMBRE,
  MAX_TELEFONO,
  MAX_DESCRIPCION,
} from '../../utils/validaciones'
import './FormularioContacto.css'

// Objeto con los valores iniciales (todo vacío)
const VALORES_INICIALES = {
  nombre: '',
  apellidos: '',
  correo: '',
  telefono: '',
  descripcion: '',
}

/**
 * Formulario de contacto con validaciones y envío por EmailJS.
 *
 * Estados (useState):
 *  - valores: lo que hay escrito en cada campo
 *  - errores: mensajes de error por campo
 *  - enviando: true mientras se espera la respuesta (Promesa)
 *  - resultado: null, o { nombre, modo } cuando se envió con éxito
 *  - errorEnvio: mensaje si falló el envío
 */
function FormularioContacto() {
  const [valores, setValores] = useState(VALORES_INICIALES)
  const [errores, setErrores] = useState({})
  const [enviando, setEnviando] = useState(false)
  const [resultado, setResultado] = useState(null)
  const [errorEnvio, setErrorEnvio] = useState('')

  // Evento onChange de todos los campos
  const manejarCambio = (evento) => {
    const { name } = evento.target
    let { value } = evento.target

    // Solo se permite INGRESAR caracteres válidos:
    // letras en nombre/apellidos y dígitos en teléfono
    if (name === 'nombre' || name === 'apellidos') value = soloLetras(value)
    if (name === 'telefono') value = soloNumeros(value)

    setValores({ ...valores, [name]: value })

    // Si el campo ya tenía error, se revalida para quitarlo apenas se corrija
    if (errores[name]) {
      setErrores({ ...errores, [name]: validarCampo(name, value) })
    }
  }

  // Evento onSubmit: valida todo y, si está bien, envía (función async)
  const manejarEnvio = async (evento) => {
    evento.preventDefault()
    setErrorEnvio('')

    const nuevosErrores = validarFormulario(valores)
    setErrores(nuevosErrores)

    // Object.keys(...).length === 0 significa "no hay errores"
    if (Object.keys(nuevosErrores).length > 0) return

    setEnviando(true)
    try {
      const respuesta = await enviarCorreo(valores) // espera la Promesa
      setResultado({ nombre: valores.nombre.trim(), modo: respuesta.modo })
      setValores(VALORES_INICIALES)
    } catch {
      setErrorEnvio('No se pudo enviar el mensaje. Revisa tu conexión e inténtalo de nuevo.')
    } finally {
      setEnviando(false) // se ejecuta tanto si salió bien como si falló
    }
  }

  // Mensaje de agradecimiento (reemplaza el formulario)
  if (resultado) {
    return (
      <div className="contacto-gracias" role="status">
        <p className="contacto-gracias-icono" aria-hidden="true">
          ✓
        </p>
        <h2>¡Gracias, {resultado.nombre}!</h2>
        <p>Recibí tu mensaje. Te responderé al correo que dejaste lo antes posible.</p>
        {resultado.modo === 'demo' && (
          <p className="contacto-gracias-demo">
            Modo demostración: EmailJS aún no está configurado, así que el correo no se envió.
          </p>
        )}
        <button type="button" className="boton boton-secundario" onClick={() => setResultado(null)}>
          Enviar otro mensaje
        </button>
      </div>
    )
  }

  return (
    // noValidate: desactiva los avisos del navegador para usar nuestras validaciones
    <form className="contacto-formulario" onSubmit={manejarEnvio} noValidate>
      <div className="contacto-fila">
        <CampoFormulario
          etiqueta="Nombre *"
          name="nombre"
          value={valores.nombre}
          onChange={manejarCambio}
          error={errores.nombre}
          maxLength={MAX_NOMBRE}
          autoComplete="given-name"
          ayuda={`Solo letras, máximo ${MAX_NOMBRE} caracteres.`}
        />
        <CampoFormulario
          etiqueta="Apellidos *"
          name="apellidos"
          value={valores.apellidos}
          onChange={manejarCambio}
          error={errores.apellidos}
          maxLength={MAX_NOMBRE}
          autoComplete="family-name"
          ayuda={`Solo letras, máximo ${MAX_NOMBRE} caracteres.`}
        />
      </div>

      <div className="contacto-fila">
        <CampoFormulario
          etiqueta="Correo *"
          name="correo"
          type="email"
          value={valores.correo}
          onChange={manejarCambio}
          error={errores.correo}
          autoComplete="email"
          placeholder="nombre@empresa.com"
        />
        <CampoFormulario
          etiqueta="Teléfono *"
          name="telefono"
          type="tel"
          inputMode="numeric"
          value={valores.telefono}
          onChange={manejarCambio}
          error={errores.telefono}
          maxLength={MAX_TELEFONO}
          autoComplete="tel"
          ayuda="Solo números, entre 7 y 10 dígitos."
        />
      </div>

      <CampoFormulario
        etiqueta="Descripción del proyecto *"
        name="descripcion"
        como="textarea"
        value={valores.descripcion}
        onChange={manejarCambio}
        error={errores.descripcion}
        maxLength={MAX_DESCRIPCION}
        placeholder="Cuéntame qué necesita tu empresa: cuántos equipos, cómo prestan hoy, qué problema quieren resolver…"
        ayuda={`${valores.descripcion.length}/${MAX_DESCRIPCION} caracteres`}
      />

      {errorEnvio && (
        <p className="contacto-error-envio" role="alert">
          {errorEnvio}
        </p>
      )}

      <p className="contacto-obligatorios">* Todos los campos son obligatorios.</p>

      <button type="submit" className="boton boton-primario" disabled={enviando}>
        {enviando ? 'Enviando…' : 'Enviar email'}
      </button>
    </form>
  )
}

export default FormularioContacto
