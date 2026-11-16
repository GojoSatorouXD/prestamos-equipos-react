import './TituloPagina.css'

/**
 * Título reutilizable para las 5 vistas.
 * Props:
 *  - titulo: texto principal (obligatorio)
 *  - subtitulo: texto de apoyo (opcional)
 */
function TituloPagina({ titulo, subtitulo }) {
  return (
    <div className="titulo-pagina">
      <h1>{titulo}</h1>
      {/* Solo se muestra el subtítulo si viene en las props */}
      {subtitulo && <p>{subtitulo}</p>}
    </div>
  )
}

export default TituloPagina
