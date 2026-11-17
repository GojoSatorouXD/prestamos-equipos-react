import { Link } from 'react-router-dom'
import TituloPagina from '../components/comunes/TituloPagina'
import { columnasHojaPapel, antes, despues, beneficios, aporte } from '../data/propuesta'
import './Propuesta.css'

/**
 * Vista: Propuesta de valor (/propuesta)
 * Sección principal: antes (hoja de papel) vs después (PrestaTech).
 * Sección secundaria: beneficios para la empresa y lo que aporta Juan.
 * El footer lo pone el Layout.
 */
function Propuesta() {
  return (
    <div className="contenedor">
      <TituloPagina
        titulo="Propuesta de valor"
        subtitulo="De la hoja de papel al registro digital de préstamos de equipos de TI."
      />

      {/* ---------- Sección principal: antes vs después ---------- */}
      <section className="propuesta-seccion" aria-labelledby="titulo-principal">
        <h2 id="titulo-principal">Del papel a lo digital</h2>
        <p className="propuesta-intro">
          Así se registraban los préstamos: una hoja de papel con estas columnas, llenada a mano en cada entrega.
        </p>

        {/* Ilustración de la hoja de papel (tabla vacía) */}
        <div className="hoja-papel" aria-label="Ejemplo de la hoja de papel de préstamos">
          <p className="hoja-papel-titulo">Control de préstamo de equipos</p>
          <div className="hoja-papel-tabla">
            <table>
              <thead>
                <tr>
                  {columnasHojaPapel.map((columna) => (
                    <th key={columna}>{columna}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Array.from crea 3 filas vacías */}
                {Array.from({ length: 3 }, (_, fila) => (
                  <tr key={fila}>
                    {columnasHojaPapel.map((columna) => (
                      <td key={columna}></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="comparacion">
          <div className="comparacion-columna comparacion-antes">
            <h3>Antes: hoja de papel</h3>
            <ul>
              {antes.map((punto) => (
                <li key={punto.titulo}>
                  <strong>{punto.titulo}.</strong> {punto.texto}
                </li>
              ))}
            </ul>
          </div>

          <div className="comparacion-columna comparacion-despues">
            <h3>Después: PrestaTech</h3>
            <ul>
              {despues.map((punto) => (
                <li key={punto.titulo}>
                  <strong>{punto.titulo}.</strong> {punto.texto}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- Sección secundaria: beneficios y aporte ---------- */}
      <section className="propuesta-seccion" aria-labelledby="titulo-beneficios">
        <h2 id="titulo-beneficios">Beneficios para la empresa</h2>
        <div className="beneficios">
          {beneficios.map((beneficio) => (
            <article key={beneficio.titulo} className="beneficio">
              <span className="beneficio-icono" aria-hidden="true">
                {beneficio.icono}
              </span>
              <h3>{beneficio.titulo}</h3>
              <p>{beneficio.texto}</p>
            </article>
          ))}
        </div>

        <h2 className="propuesta-subtitulo">Lo que aporto</h2>
        <p className="propuesta-intro">
          Soy técnico de soporte TI y desarrollador: entiendo el problema desde adentro y sé construir la solución.
        </p>
        <div className="aporte">
          {aporte.map((bloque) => (
            <div key={bloque.perfil} className="aporte-bloque">
              <h3>{bloque.perfil}</h3>
              <ul>
                {bloque.puntos.map((punto) => (
                  <li key={punto}>{punto}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="propuesta-cta">
          <Link to="/equipos" className="boton boton-primario">
            Ver el inventario
          </Link>
          <Link to="/contacto" className="boton boton-secundario">
            Quiero PrestaTech en mi empresa
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Propuesta
