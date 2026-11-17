import './CampoFormulario.css'

/**
 * Campo de formulario reutilizable: etiqueta + control + mensaje de error.
 * Props:
 *  - etiqueta: texto de la etiqueta
 *  - name: nombre del campo (también se usa para el id)
 *  - value, onChange: valor controlado y evento de cambio
 *  - error: mensaje de error ('' o undefined si no hay)
 *  - como: 'input' (por defecto), 'textarea' o 'select'
 *  - ayuda: texto de ayuda opcional debajo del campo
 *  - children: las <option> cuando como="select"
 *  - ...resto: otras props que se pasan al control (type, maxLength, placeholder…)
 */
function CampoFormulario({ etiqueta, name, value, onChange, error, como = 'input', ayuda, children, ...resto }) {
  const id = `campo-${name}`
  const idMensaje = `${id}-mensaje`

  // Props comunes a input, textarea y select
  const propsControl = {
    id,
    name,
    value,
    onChange,
    className: error ? 'campo-control con-error' : 'campo-control',
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error || ayuda ? idMensaje : undefined,
    ...resto,
  }

  // Se elige qué etiqueta HTML dibujar según la prop "como"
  let control
  if (como === 'textarea') control = <textarea {...propsControl} />
  else if (como === 'select') control = <select {...propsControl}>{children}</select>
  else control = <input {...propsControl} />

  return (
    <div className="campo">
      <label htmlFor={id}>{etiqueta}</label>
      {control}
      {/* Si hay error se muestra el error; si no, la ayuda (si existe) */}
      {error ? (
        <p id={idMensaje} className="campo-error" role="alert">
          {error}
        </p>
      ) : (
        ayuda && (
          <p id={idMensaje} className="campo-ayuda">
            {ayuda}
          </p>
        )
      )}
    </div>
  )
}

export default CampoFormulario
