import { useEffect, useState } from 'react'
import { PrestamosContext } from './PrestamosContext'
import { obtenerEquipos } from '../services/equiposService'
import { filtrarEquipos, contarPorEstado } from '../utils/equipos'

// Filtros vacíos = mostrar todos los equipos
const FILTROS_INICIALES = { categoria: '', estado: '' }

/**
 * Proveedor del estado global. Envuelve toda la aplicación (main.jsx),
 * así cualquier componente puede leer estos datos con usePrestamos().
 *
 * Maneja:
 *  - equipos, cargando, error  -> carga inicial del inventario
 *  - equipoSeleccionado        -> equipo que se muestra en el sidebar
 *  - filtros                   -> filtros ya aplicados (al presionar "Filtrar")
 *  - tema                      -> 'claro' u 'oscuro'
 */
function PrestamosProvider({ children }) {
  const [equipos, setEquipos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null)
  const [filtros, setFiltros] = useState(FILTROS_INICIALES)
  const [tema, setTema] = useState('claro')

  // ---------------------------------------------------------
  // Ciclo de vida: carga inicial (se ejecuta una sola vez al montar,
  // por eso el arreglo de dependencias está vacío []).
  // ---------------------------------------------------------
  useEffect(() => {
    // AbortController permite cancelar el fetch si el componente se desmonta
    const controlador = new AbortController()

    async function cargarEquipos() {
      try {
        const datos = await obtenerEquipos(controlador.signal)
        setEquipos(datos)
      } catch (err) {
        // Si la cancelamos nosotros (AbortError) no es un error real
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      } finally {
        if (!controlador.signal.aborted) {
          setCargando(false)
        }
      }
    }

    cargarEquipos()

    // Función de limpieza: React la ejecuta al desmontar el componente
    return () => controlador.abort()
  }, [])

  // ---------------------------------------------------------
  // Efecto del tema: cada vez que cambia "tema" se actualiza el
  // atributo data-theme de <html>, y el CSS cambia los colores.
  // ---------------------------------------------------------
  useEffect(() => {
    document.documentElement.dataset.theme = tema
  }, [tema])

  // ---------------------------------------------------------
  // Acciones que pueden usar los componentes
  // ---------------------------------------------------------
  const seleccionarEquipo = (equipo) => setEquipoSeleccionado(equipo)
  const cerrarDetalle = () => setEquipoSeleccionado(null)

  // Recibe un objeto { categoria, estado } (se usa una copia)
  const aplicarFiltros = (nuevosFiltros) => setFiltros({ ...nuevosFiltros })
  const limpiarFiltros = () => setFiltros(FILTROS_INICIALES)

  const alternarTema = () => setTema((temaActual) => (temaActual === 'claro' ? 'oscuro' : 'claro'))

  // ---------------------------------------------------------
  // Valores calculados a partir del estado (no se guardan en useState
  // porque siempre se pueden obtener de "equipos" y "filtros").
  // ---------------------------------------------------------
  const equiposFiltrados = filtrarEquipos(equipos, filtros)
  const conteo = contarPorEstado(equipos)

  // Objeto con todo lo que comparte el contexto
  const valor = {
    equipos,
    cargando,
    error,
    equipoSeleccionado,
    filtros,
    tema,
    equiposFiltrados,
    conteo,
    seleccionarEquipo,
    cerrarDetalle,
    aplicarFiltros,
    limpiarFiltros,
    alternarTema,
  }

  return <PrestamosContext.Provider value={valor}>{children}</PrestamosContext.Provider>
}

export default PrestamosProvider
