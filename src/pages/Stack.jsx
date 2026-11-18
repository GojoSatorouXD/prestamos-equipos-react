import TituloPagina from '../components/comunes/TituloPagina'
import TarjetaStack from '../components/stack/TarjetaStack'
import Timeline from '../components/stack/Timeline'
import Revelar from '../components/animaciones/Revelar'
import { stackProyecto, stackAutor, herramientasIA, experiencias, estudios } from '../data/stack'
import './Stack.css'

/**
 * Vista: Stack tecnológico y estudios (/stack)
 * Todas las secciones se generan recorriendo arreglos de src/data/stack.js
 * y aparecen con una animación al hacer scroll (<Revelar>).
 */
function Stack() {
  return (
    <div className="contenedor">
      <TituloPagina
        titulo="Stack tecnológico y estudios"
        subtitulo="Tecnologías usadas en este proyecto, mi stack como desarrollador y soporte TI, mi experiencia y mi formación."
      />

      {/* 1. Stack implementado en este proyecto */}
      <Revelar como="section" className="stack-seccion" aria-labelledby="titulo-proyecto">
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
      </Revelar>

      {/* 2. Stack del autor: un map para los grupos y otro map adentro para sus tecnologías */}
      <Revelar como="section" className="stack-seccion" aria-labelledby="titulo-autor">
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
      </Revelar>

      {/* 3. Herramientas de IA (mismo componente de tarjeta) */}
      <Revelar como="section" className="stack-seccion" aria-labelledby="titulo-ia">
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
      </Revelar>

      {/* 4. Experiencia en timeline */}
      <Revelar como="section" className="stack-seccion" aria-labelledby="titulo-experiencia">
        <h2 id="titulo-experiencia">Experiencia</h2>
        <Timeline experiencias={experiencias} />
      </Revelar>

      {/* 5. Estudios */}
      <Revelar como="section" className="stack-seccion" aria-labelledby="titulo-estudios">
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
      </Revelar>
    </div>
  )
}

export default Stack
