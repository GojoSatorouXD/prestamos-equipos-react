/**
 * Un elemento del timeline.
 * Props:
 *  - tipo: 'Experiencia laboral' o 'Proyecto académico'
 *  - periodo: (opcional) fechas
 *  - cargo, lugar, descripcion
 *  - tecnologias: (opcional) arreglo de textos
 */
function ItemTimeline({ tipo, periodo, cargo, lugar, descripcion, tecnologias }) {
  // Clase según el tipo, para pintar el punto y la etiqueta de otro color
  const claseTipo = tipo === 'Proyecto académico' ? 'timeline-item academico' : 'timeline-item'

  return (
    <li className={claseTipo}>
      <div className="timeline-cabecera">
        <span className="timeline-tipo">{tipo}</span>
        {periodo && <span className="timeline-periodo">{periodo}</span>}
      </div>
      <h3 className="timeline-cargo">{cargo}</h3>
      <p className="timeline-lugar">{lugar}</p>
      <p className="timeline-descripcion">{descripcion}</p>

      {/* Solo se dibuja la lista si el objeto trae tecnologías */}
      {tecnologias && (
        <ul className="timeline-tecnologias" aria-label="Tecnologías usadas">
          {tecnologias.map((tecnologia) => (
            <li key={tecnologia}>{tecnologia}</li>
          ))}
        </ul>
      )}
    </li>
  )
}

export default ItemTimeline
