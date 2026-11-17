import { usePrestamos } from '../../context/PrestamosContext'
import './BotonTema.css'

/**
 * Botón para cambiar entre tema claro y oscuro.
 * Lee "tema" y "alternarTema" del contexto (useContext): cualquier
 * componente de la app podría cambiar el tema de la misma forma.
 */
function BotonTema() {
  const { tema, alternarTema } = usePrestamos()
  const esOscuro = tema === 'oscuro'

  return (
    <button
      type="button"
      className="boton-tema"
      onClick={alternarTema}
      aria-label={esOscuro ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
      title={esOscuro ? 'Tema claro' : 'Tema oscuro'}
    >
      <span aria-hidden="true">{esOscuro ? '☀️' : '🌙'}</span>
    </button>
  )
}

export default BotonTema
