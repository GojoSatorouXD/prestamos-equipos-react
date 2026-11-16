import './TarjetaStack.css'

/**
 * Tarjeta de una tecnología o herramienta.
 * Props:
 *  - nombre: nombre de la tecnología
 *  - imagen: ruta del logo o ícono
 *  - descripcion: para qué se usa
 *
 * Se reutiliza para el stack del proyecto, el stack del autor
 * y las herramientas de IA.
 */
function TarjetaStack({ nombre, imagen, descripcion }) {
  return (
    <article className="tarjeta-stack">
      {/* alt vacío: el nombre ya aparece como texto justo al lado */}
      <img className="tarjeta-stack-imagen" src={imagen} alt="" width="56" height="56" loading="lazy" />
      <div>
        <h3 className="tarjeta-stack-nombre">{nombre}</h3>
        <p className="tarjeta-stack-descripcion">{descripcion}</p>
      </div>
    </article>
  )
}

export default TarjetaStack
