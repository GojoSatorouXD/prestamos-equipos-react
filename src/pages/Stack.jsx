import TituloPagina from '../components/comunes/TituloPagina'
import TarjetaStack from '../components/stack/TarjetaStack'
import Timeline from '../components/stack/Timeline'
import { stackProyecto, stackAutor, herramientasIA, experiencias, estudios } from '../data/stack'
import './Stack.css'

/**
 * Vista: Stack tecnológico y estudios (/stack)
 * Todas las secciones se generan recorriendo arreglos de src/data/stack.js
 */
function Stack() {
  return (
    <div className="contenedor">
      <TituloPagina
        titulo="Stack tecnológico y estudios"
        subtitulo="Tecnologías usadas en este proyecto, mi stack como desarrollador y soporte TI, mi experiencia y mi formación."
      />

      {/* 1. Stack implementado en este proyecto */}
      <section className="stack-seccion" aria-labelledby="titulo-proyecto">
        <h2 id="titulo-proyecto">Stack implementado en este proyecto</h2>
        <p className="stack-intro">Con estas herramientas está construido PrestaTech.</p>
        <div className="stack-cuadricula">
          {stackProyecto.map((tecnologia) => (
            <TarjetaStack
              key={tecnologia.nombre}
              nombre={tecnologia.nombre}
              imagen={tecnologia.imagen}
              descripcion={tecnologia.descripcion}
            />
          ))}
        </div>
      </section>

      {/* 2. Stack del autor: un map para los grupos y otro map adentro para sus tecnologías */}
      <section className="stack-seccion" aria-labelledby="titulo-autor">
        <h2 id="titulo-autor">Mi stack</h2>
        {stackAutor.map((grupo) => (
          <div key={grupo.grupo} className="stack-grupo">
            <h3 className="stack-grupo-titulo">{grupo.grupo}</h3>
            <div className="stack-cuadricula">
              {grupo.tecnologias.map((tecnologia) => (
                <TarjetaStack
                  key={tecnologia.nombre}
                  nombre={tecnologia.nombre}
                  imagen={tecnologia.imagen}
                  descripcion={tecnologia.descripcion}
                />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* 3. Herramientas de IA (mismo componente de tarjeta) */}
      <section className="stack-seccion" aria-labelledby="titulo-ia">
        <h2 id="titulo-ia">Herramientas de IA</h2>
        <div className="stack-cuadricula">
          {herramientasIA.map((herramienta) => (
            <TarjetaStack
              key={herramienta.nombre}
              nombre={herramienta.nombre}
              imagen={herramienta.imagen}
              descripcion={herramienta.descripcion}
            />
          ))}
        </div>
      </section>

      {/* 4. Experiencia en timeline */}
      <section className="stack-seccion" aria-labelledby="titulo-experiencia">
        <h2 id="titulo-experiencia">Experiencia</h2>
        <Timeline experiencias={experiencias} />
      </section>

      {/* 5. Estudios */}
      <section className="stack-seccion" aria-labelledby="titulo-estudios">
        <h2 id="titulo-estudios">Estudios</h2>
        <ul className="estudios">
          {estudios.map((estudio) => (
            <li key={estudio.titulo} className="estudio">
              <h3 className="estudio-titulo">{estudio.titulo}</h3>
              <p className="estudio-institucion">{estudio.institucion}</p>
              <p className="estudio-periodo">
                {estudio.periodo}
                {estudio.enCurso && <span className="estudio-en-curso">En curso</span>}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default Stack
