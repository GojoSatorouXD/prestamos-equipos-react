import './Testimonio.css'

/**
 * Tarjeta de un testimonio.
 * Props:
 *  - nombre, cargo, texto
 *  - esEjemplo: si es true, muestra la etiqueta "Ejemplo"
 */
function Testimonio({ nombre, cargo, texto, esEjemplo }) {
  return (
    <figure className="testimonio">
      {esEjemplo && (
        <span className="testimonio-ejemplo" title="Testimonio ilustrativo, no corresponde a una persona real">
          Ejemplo
        </span>
      )}
      <blockquote className="testimonio-texto">“{texto}”</blockquote>
      <figcaption className="testimonio-autor">
        <strong>{nombre}</strong>
        <span>{cargo}</span>
      </figcaption>
    </figure>
  )
}

export default Testimonio
