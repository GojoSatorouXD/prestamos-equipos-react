import TituloPagina from '../components/comunes/TituloPagina'
import FormularioContacto from '../components/contacto/FormularioContacto'
import Testimonio from '../components/contacto/Testimonio'
import { testimonios } from '../data/testimonios'
import './Contacto.css'

/**
 * Vista: Contacto / nuevo proyecto (/contacto)
 * Formulario con validaciones + mensaje de agradecimiento + 5 testimonios.
 */
function Contacto() {
  return (
    <div className="contenedor">
      <TituloPagina
        titulo="Contacto"
        subtitulo="¿Tu empresa necesita digitalizar el préstamo de sus equipos? Escríbeme y cuéntame tu proyecto."
      />

      <section aria-label="Formulario de contacto" className="contacto-seccion">
        <FormularioContacto />
      </section>

      <section aria-labelledby="titulo-testimonios" className="contacto-seccion">
        <h2 id="titulo-testimonios">Testimonios</h2>
        <p className="contacto-nota">
          Testimonios de ejemplo que ilustran los beneficios de PrestaTech; no corresponden a personas reales.
        </p>
        <div className="contacto-testimonios">
          {testimonios.map((testimonio) => (
            <Testimonio
              key={testimonio.id}
              nombre={testimonio.nombre}
              cargo={testimonio.cargo}
              texto={testimonio.texto}
              esEjemplo={testimonio.esEjemplo}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Contacto
