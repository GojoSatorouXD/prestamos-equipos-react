import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './Notificaciones.css'

// Milisegundos que dura cada aviso en pantalla
const DURACION_MS = 4500

// Ícono de cada tipo de aviso
const ICONOS = { exito: '✓', aviso: '!', error: '✕' }

/**
 * Un aviso (toast). Se cierra solo después de DURACION_MS.
 * Ciclo de vida: el efecto programa un setTimeout al montar y la
 * limpieza lo cancela si el aviso se cierra antes con el botón ✕.
 */
function Aviso({ aviso, onCerrar }) {
  useEffect(() => {
    const temporizador = setTimeout(() => onCerrar(aviso.id), DURACION_MS)
    return () => clearTimeout(temporizador)
  }, [aviso.id, onCerrar])

  return (
    <motion.li
      layout // los demás avisos se reacomodan suavemente
      className={`aviso aviso-${aviso.tipo}`}
      initial={{ opacity: 0, x: 60, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 60, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
      // Los errores se anuncian de inmediato al lector de pantalla
      role={aviso.tipo === 'error' ? 'alert' : 'status'}
    >
      <span className="aviso-icono" aria-hidden="true">
        {ICONOS[aviso.tipo]}
      </span>
      <div className="aviso-texto">
        <p className="aviso-titulo">{aviso.titulo}</p>
        {aviso.mensaje && <p className="aviso-mensaje">{aviso.mensaje}</p>}
      </div>
      <button type="button" className="aviso-cerrar" onClick={() => onCerrar(aviso.id)} aria-label="Cerrar aviso">
        ✕
      </button>
    </motion.li>
  )
}

/**
 * Pila de avisos en la esquina inferior derecha.
 * AnimatePresence permite animar los avisos también cuando SALEN.
 */
function Notificaciones({ avisos, onCerrar }) {
  return (
    <ol className="avisos" aria-live="polite">
      <AnimatePresence initial={false}>
        {avisos.map((aviso) => (
          <Aviso key={aviso.id} aviso={aviso} onCerrar={onCerrar} />
        ))}
      </AnimatePresence>
    </ol>
  )
}

export default Notificaciones
