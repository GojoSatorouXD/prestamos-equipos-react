import './Biografia.css'

/**
 * Biografía en forma de línea de tiempo vertical.
 * Props:
 *  - elementos: arreglo de objetos { periodo, titulo, lugar, descripcion?, destacado? }
 *
 * "descripcion" y "destacado" son opcionales: solo se muestran si existen.
 */
function Biografia({ elementos }) {
  return (
    <ol className="biografia">
      {elementos.map((elemento) => (
        <li key={elemento.titulo} className="biografia-item">
          <p className="biografia-periodo">{elemento.periodo}</p>
          <h3 className="biografia-titulo">{elemento.titulo}</h3>
          <p className="biografia-lugar">{elemento.lugar}</p>
          {elemento.descripcion && <p className="biografia-descripcion">{elemento.descripcion}</p>}
          {elemento.destacado && <span className="biografia-destacado">{elemento.destacado}</span>}
        </li>
      ))}
    </ol>
  )
}

export default Biografia
