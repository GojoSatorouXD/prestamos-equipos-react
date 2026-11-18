import { motion } from 'framer-motion'

// Etiquetas HTML que puede usar Revelar. Se definen UNA vez, fuera del
// componente: motion.section es un <section> que sabe animarse.
const ETIQUETAS = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  li: motion.li,
}

/**
 * Animación de entrada al hacer scroll (Framer Motion).
 * El contenido aparece subiendo y ganando opacidad cuando entra en pantalla.
 *
 * Props:
 *  - como: etiqueta HTML a usar ('div' por defecto, 'section', 'article', 'li')
 *  - retraso: segundos de espera antes de animar (para escalonar tarjetas)
 *  - children y cualquier otra prop (className, aria-labelledby…) pasan tal cual
 *
 * whileInView: anima cuando el elemento se ve en la pantalla.
 * viewport.once: anima solo la primera vez, no cada vez que se hace scroll.
 */
function Revelar({ como = 'div', retraso = 0, children, ...resto }) {
  const Etiqueta = ETIQUETAS[como] ?? motion.div

  return (
    <Etiqueta
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: retraso, ease: 'easeOut' }}
      {...resto}
    >
      {children}
    </Etiqueta>
  )
}

export default Revelar
