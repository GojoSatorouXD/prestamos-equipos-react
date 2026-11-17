import { useState } from 'react'
import { Link } from 'react-router-dom'
import TituloPagina from '../components/comunes/TituloPagina'
import Cargando from '../components/comunes/Cargando'
import TablaHistorial from '../components/prestamos/TablaHistorial'
import { usePrestamos } from '../context/PrestamosContext'
import { resumenHistorial } from '../utils/historial'
import { pluralizar, palabraSegunCantidad } from '../utils/texto'
import { exportarHistorialExcel } from '../utils/exportarExcel'
import './Prestamos.css'

/**
 * Vista extra: Préstamos (/prestamos)
 * Historial de préstamos y devoluciones, exportar a Excel y
 * restablecer datos de ejemplo.
 */
function Prestamos() {
  const { historial, cargando, restablecerDatos } = usePrestamos()
  const [mensaje, setMensaje] = useState('')
  const [errorExcel, setErrorExcel] = useState('')
  const [exportando, setExportando] = useState(false)

  const resumen = resumenHistorial(historial)

  // Evento onClick: genera y descarga el .xlsx (función async)
  const manejarExportar = async () => {
    setErrorExcel('')
    setExportando(true)
    try {
      await exportarHistorialExcel(historial)
      setMensaje(`Excel descargado con ${pluralizar(resumen.total, 'préstamo', 'préstamos')}.`)
    } catch {
      setErrorExcel('No se pudo generar el archivo de Excel. Inténtalo de nuevo.')
    } finally {
      setExportando(false)
    }
  }

  // Evento onClick: pide confirmación antes de borrar
  const manejarRestablecer = () => {
    const confirmado = window.confirm(
      '¿Restablecer los datos de ejemplo?\n\n' +
        `Se borrará el historial (${pluralizar(resumen.total, 'préstamo', 'préstamos')}) y todos los equipos volverán a su estado inicial. ` +
        'Esta acción no se puede deshacer.',
    )
    if (!confirmado) return
    restablecerDatos()
    setMensaje('Datos restablecidos: historial vacío y equipos en su estado inicial.')
  }

  return (
    <div className="contenedor">
      <TituloPagina
        titulo="Historial de préstamos"
        subtitulo="Registro digital de cada préstamo y devolución: quién recibió el equipo, cuándo y en qué condiciones."
      />

      {cargando ? (
        <Cargando mensaje="Cargando historial…" />
      ) : (
        <>
          <div className="prestamos-barra">
            <ul className="prestamos-resumen" aria-label="Resumen del historial">
              <li>
                <strong>{resumen.total}</strong>{' '}
                {palabraSegunCantidad(resumen.total, 'préstamo registrado', 'préstamos registrados')}
              </li>
              <li className="resumen-activos">
                <strong>{resumen.activos}</strong> {palabraSegunCantidad(resumen.activos, 'activo', 'activos')}
              </li>
              <li className="resumen-devueltos">
                <strong>{resumen.devueltos}</strong> {palabraSegunCantidad(resumen.devueltos, 'devuelto', 'devueltos')}
              </li>
            </ul>

            <div className="prestamos-botones">
              {/* Deshabilitado si no hay nada que exportar o mientras se genera */}
              <button
                type="button"
                className="boton boton-primario"
                onClick={manejarExportar}
                disabled={historial.length === 0 || exportando}
              >
                {exportando ? 'Generando…' : 'Exportar a Excel'}
              </button>
              <button type="button" className="boton boton-secundario boton-peligro" onClick={manejarRestablecer}>
                Restablecer datos de ejemplo
              </button>
            </div>
          </div>

          {mensaje && (
            <p className="prestamos-mensaje" role="status">
              ✓ {mensaje}
            </p>
          )}

          {errorExcel && (
            <p className="prestamos-error" role="alert">
              {errorExcel}
            </p>
          )}

          {historial.length === 0 ? (
            <div className="prestamos-vacio">
              <p className="prestamos-vacio-titulo">Aún no hay préstamos registrados.</p>
              <p>
                Ve al inventario, abre un equipo disponible con "Ver detalle" y registra el préstamo.
              </p>
              <Link to="/equipos" className="boton boton-primario">
                Ir al inventario
              </Link>
            </div>
          ) : (
            <TablaHistorial prestamos={historial} />
          )}
        </>
      )}
    </div>
  )
}

export default Prestamos
