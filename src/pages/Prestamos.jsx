import { useState } from 'react'
import { Link } from 'react-router-dom'
import TituloPagina from '../components/comunes/TituloPagina'
import Cargando from '../components/comunes/Cargando'
import TablaHistorial from '../components/prestamos/TablaHistorial'
import GraficaBarras from '../components/prestamos/GraficaBarras'
import Revelar from '../components/animaciones/Revelar'
import { usePrestamos } from '../context/PrestamosContext'
import { useNotificaciones } from '../context/NotificacionesContext'
import { resumenHistorial, prestamosPorCategoria, equiposMasPrestados } from '../utils/historial'
import { pluralizar, palabraSegunCantidad } from '../utils/texto'
import { exportarHistorialExcel } from '../utils/exportarExcel'
import './Prestamos.css'

/**
 * Vista extra: Préstamos (/prestamos)
 * Mini dashboard (préstamos por categoría y equipos más prestados),
 * historial de préstamos y devoluciones, exportar a Excel y
 * restablecer datos de ejemplo.
 */
function Prestamos() {
  const { historial, cargando, restablecerDatos } = usePrestamos()
  const { notificar } = useNotificaciones()
  const [exportando, setExportando] = useState(false)

  const resumen = resumenHistorial(historial)
  // Datos de las dos gráficas (se calculan a partir del historial)
  const porCategoria = prestamosPorCategoria(historial)
  const masPrestados = equiposMasPrestados(historial, 5)

  // Evento onClick: genera y descarga el .xlsx (función async)
  const manejarExportar = async () => {
    setExportando(true)
    try {
      await exportarHistorialExcel(historial)
      notificar({
        tipo: 'exito',
        titulo: 'Excel descargado',
        mensaje: `El archivo tiene ${pluralizar(resumen.total, 'préstamo', 'préstamos')}.`,
      })
    } catch {
      notificar({
        tipo: 'error',
        titulo: 'No se pudo exportar',
        mensaje: 'Hubo un problema al generar el archivo de Excel. Inténtalo de nuevo.',
      })
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
    notificar({
      tipo: 'aviso',
      titulo: 'Datos restablecidos',
      mensaje: 'Historial vacío y equipos en su estado inicial.',
    })
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
            <>
              {/* Mini dashboard: dos gráficas de barras */}
              <Revelar como="section" className="dashboard" aria-label="Resumen gráfico de préstamos">
                <GraficaBarras
                  titulo="Préstamos por categoría"
                  descripcion="Cuántas veces se ha prestado cada tipo de equipo."
                  datos={porCategoria}
                />
                <GraficaBarras
                  titulo="Equipos más prestados"
                  descripcion="Los 5 equipos con más préstamos registrados."
                  datos={masPrestados}
                />
              </Revelar>

              <Revelar>
                <h2 className="prestamos-subtitulo">Historial</h2>
                <TablaHistorial prestamos={historial} />
              </Revelar>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default Prestamos
