import { motion } from 'framer-motion'
import { pluralizar } from '../../utils/texto'
import './GraficaBarras.css'

/**
 * Gráfica de barras horizontales sencilla (sin librerías: HTML + CSS).
 * Props:
 *  - titulo: título del panel
 *  - descripcion: texto corto debajo del título
 *  - datos: arreglo [{ clave, etiqueta, detalle?, valor }] ya ordenado
 *
 * El ancho de cada barra es su valor dividido entre el valor más alto,
 * en porcentaje. Framer Motion la hace crecer desde 0 al aparecer en pantalla.
 * Al pasar el mouse (o con Tab) se ve un tooltip con la cantidad y el % del total.
 */
function GraficaBarras({ titulo, descripcion, datos }) {
  // Math.max(...arreglo) devuelve el número más grande; 1 evita dividir entre 0
  const maximo = Math.max(1, ...datos.map((dato) => dato.valor))
  const total = datos.reduce((suma, dato) => suma + dato.valor, 0)

  return (
    <figure className="dashboard-panel grafica">
      <figcaption>
        <h3 className="grafica-titulo">{titulo}</h3>
        <p className="grafica-descripcion">{descripcion}</p>
      </figcaption>

      <ul className="grafica-lista">
        {datos.map((dato, indice) => {
          const ancho = (dato.valor / maximo) * 100
          const porcentaje = Math.round((dato.valor / total) * 100)
          const textoTooltip = `${pluralizar(dato.valor, 'préstamo', 'préstamos')} · ${porcentaje}% del total`

          return (
            // tabIndex={0}: la fila se puede enfocar con Tab y muestra su tooltip
            <li key={dato.clave} className="grafica-fila" tabIndex={0} aria-label={`${dato.etiqueta}: ${textoTooltip}`}>
              <div className="grafica-etiquetas" aria-hidden="true">
                <span className="grafica-etiqueta">
                  {dato.etiqueta}
                  {dato.detalle && <span className="grafica-detalle"> · {dato.detalle}</span>}
                </span>
                <span className="grafica-valor">{dato.valor}</span>
              </div>

              <div className="grafica-pista" aria-hidden="true">
                <motion.div
                  className="grafica-barra"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${ancho}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: indice * 0.06, ease: 'easeOut' }}
                />
              </div>

              <span className="grafica-tooltip" aria-hidden="true">
                {textoTooltip}
              </span>
            </li>
          )
        })}
      </ul>
    </figure>
  )
}

export default GraficaBarras
