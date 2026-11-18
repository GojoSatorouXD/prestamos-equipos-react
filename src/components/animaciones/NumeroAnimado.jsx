import { useEffect, useRef, useState } from 'react'
import { animate } from 'framer-motion'

/**
 * Número que "cuenta" desde su valor anterior hasta el nuevo (contador animado).
 * Props:
 *  - valor: número final
 *  - duracion: segundos que dura la animación (0.9 por defecto)
 *
 * Ciclo de vida: cada vez que cambia "valor", el efecto inicia la animación
 * con animate() de Framer Motion. La limpieza la detiene (controles.stop())
 * si el valor cambia otra vez o el componente se desmonta a mitad de camino.
 */
function NumeroAnimado({ valor, duracion = 0.9 }) {
  const [mostrado, setMostrado] = useState(0)
  // useRef guarda el número que se está mostrando sin provocar renders:
  // así la siguiente animación arranca desde ahí y no desde 0.
  const actual = useRef(0)

  useEffect(() => {
    const controles = animate(actual.current, valor, {
      duration: duracion,
      ease: 'easeOut',
      // onUpdate se llama en cada cuadro de la animación con el valor intermedio
      onUpdate: (intermedio) => {
        actual.current = intermedio
        setMostrado(Math.round(intermedio))
      },
    })
    return () => controles.stop()
  }, [valor, duracion])

  return (
    <>
      {/* El lector de pantalla lee solo el valor final, no cada número intermedio */}
      <span aria-hidden="true">{mostrado}</span>
      <span className="solo-lector">{valor}</span>
    </>
  )
}

export default NumeroAnimado
