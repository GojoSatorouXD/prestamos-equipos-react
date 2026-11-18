import Banner from '../components/inicio/Banner'
import Biografia from '../components/inicio/Biografia'
import RedesSociales from '../components/comunes/RedesSociales'
import { perfil } from '../data/perfil'
import Revelar from '../components/animaciones/Revelar'
import './Inicio.css'

/**
 * Vista: Presentación y biografía (/)
 * Secciones: banner (título, foto, descripción y CTA), biografía y redes sociales.
 * El header y el footer los pone el Layout.
 */
function Inicio() {
  return (
    <>
      <Banner perfil={perfil} />

      <div className="contenedor inicio-secciones">
        <Revelar como="section" aria-labelledby="titulo-biografia">
          <h2 id="titulo-biografia" className="inicio-subtitulo">
            Biografía
          </h2>
          <Biografia elementos={perfil.biografia} />
        </Revelar>

        <Revelar como="section" retraso={0.1} aria-labelledby="titulo-redes">
          <h2 id="titulo-redes" className="inicio-subtitulo">
            Redes y contacto
          </h2>
          <p className="inicio-texto">Revisa mis proyectos en GitHub o escríbeme por correo.</p>
          <RedesSociales redes={perfil.redes} />
        </Revelar>
      </div>
    </>
  )
}

export default Inicio
