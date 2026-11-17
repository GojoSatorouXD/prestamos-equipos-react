import { useCallback, useEffect, useState } from 'react'
import { PrestamosContext } from './PrestamosContext'
import { obtenerEquipos, obtenerColaboradores } from '../services/equiposService'
import { filtrarEquipos, contarPorEstado, FILTROS_INICIALES } from '../utils/equipos'
import { CLAVES, leerLocal, guardarLocal, borrarLocal } from '../utils/almacenamiento'
import {
  aplicarEstadosGuardados,
  buscarPrestamoActivo,
  crearPrestamo,
  validarCondicion,
} from '../utils/prestamos'

/**
 * Proveedor del estado global. Envuelve toda la aplicación (main.jsx),
 * así cualquier componente puede leer estos datos con usePrestamos().
 *
 * Maneja:
 *  - equipos, colaboradores, cargando, error -> carga inicial con fetch
 *  - estadosGuardados, historial              -> préstamos (en localStorage)
 *  - equipoSeleccionado                       -> equipo que se muestra en el sidebar
 *  - filtros                                  -> filtros aplicados (al presionar "Filtrar")
 *  - tema                                     -> 'claro' u 'oscuro'
 */
function PrestamosProvider({ children }) {
  // Datos que llegan de los archivos JSON
  const [equiposBase, setEquiposBase] = useState([])
  const [colaboradores, setColaboradores] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  // Datos que se guardan en localStorage. La función dentro de useState
  // (inicialización perezosa) lee localStorage UNA sola vez, al montar.
  const [estadosGuardados, setEstadosGuardados] = useState(() => leerLocal(CLAVES.estados, {}))
  const [historial, setHistorial] = useState(() => leerLocal(CLAVES.historial, []))

  // Se guarda solo el id: el equipo se busca en la lista actualizada,
  // así el sidebar muestra al instante el estado nuevo tras un préstamo
  const [equipoSeleccionadoId, setEquipoSeleccionadoId] = useState(null)
  const [filtros, setFiltros] = useState(FILTROS_INICIALES)
  const [tema, setTema] = useState('claro')

  // ---------------------------------------------------------
  // Ciclo de vida: carga inicial (se ejecuta una sola vez al montar,
  // por eso el arreglo de dependencias está vacío []).
  // ---------------------------------------------------------
  useEffect(() => {
    // AbortController permite cancelar los fetch si el componente se desmonta
    const controlador = new AbortController()

    async function cargarDatos() {
      try {
        // Promise.all lanza las dos peticiones A LA VEZ y espera a que
        // terminen ambas. Devuelve un arreglo con los dos resultados.
        const [datosEquipos, datosColaboradores] = await Promise.all([
          obtenerEquipos(controlador.signal),
          obtenerColaboradores(controlador.signal),
        ])
        setEquiposBase(datosEquipos)
        setColaboradores(datosColaboradores)
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

    cargarDatos()

    // Función de limpieza: React la ejecuta al desmontar el componente
    return () => controlador.abort()
  }, [])

  // ---------------------------------------------------------
  // Persistencia: cada vez que cambian los estados o el historial,
  // se guardan en localStorage.
  // ---------------------------------------------------------
  useEffect(() => {
    guardarLocal(CLAVES.estados, estadosGuardados)
  }, [estadosGuardados])

  useEffect(() => {
    guardarLocal(CLAVES.historial, historial)
  }, [historial])

  // ---------------------------------------------------------
  // Efecto del tema: cada vez que cambia "tema" se actualiza el
  // atributo data-theme de <html>, y el CSS cambia los colores.
  // ---------------------------------------------------------
  useEffect(() => {
    document.documentElement.dataset.theme = tema
  }, [tema])

  // ---------------------------------------------------------
  // Valores calculados a partir del estado (no se guardan en useState
  // porque siempre se pueden obtener de otros estados).
  // ---------------------------------------------------------
  const equipos = aplicarEstadosGuardados(equiposBase, estadosGuardados)
  const equiposFiltrados = filtrarEquipos(equipos, filtros)
  // El conteo usa el inventario TOTAL, no la lista filtrada
  const conteo = contarPorEstado(equipos)
  const equipoSeleccionado = equipos.find((equipo) => equipo.id === equipoSeleccionadoId) ?? null

  // ---------------------------------------------------------
  // Acciones: sidebar, filtros y tema
  // ---------------------------------------------------------
  const seleccionarEquipo = (equipo) => setEquipoSeleccionadoId(equipo.id)
  // useCallback mantiene la MISMA función entre renders. Es necesario porque
  // la vista Equipos la usa dentro de un useEffect (si cambiara en cada
  // render, el efecto se volvería a ejecutar y cerraría el sidebar).
  const cerrarDetalle = useCallback(() => setEquipoSeleccionadoId(null), [])

  // Recibe un objeto { texto, categoria, estado } (se guarda una copia)
  const aplicarFiltros = (nuevosFiltros) => setFiltros({ ...nuevosFiltros })
  const limpiarFiltros = () => setFiltros(FILTROS_INICIALES)

  const alternarTema = () => setTema((temaActual) => (temaActual === 'claro' ? 'oscuro' : 'claro'))

  // Cambia el estado de un equipo (se guarda en el objeto de estados)
  const cambiarEstado = (equipoId, nuevoEstado) => {
    setEstadosGuardados((anteriores) => ({ ...anteriores, [equipoId]: nuevoEstado }))
  }

  // ---------------------------------------------------------
  // Acciones: préstamo, devolución, reparación y restablecer.
  // Si algo no es válido lanzan un Error con el mensaje para el usuario.
  // ---------------------------------------------------------

  /**
   * Registra un préstamo: el equipo pasa a Prestado y se agrega al historial.
   * La fecha y la hora se toman automáticamente (new Date()).
   */
  const registrarPrestamo = ({ equipoId, colaboradorId, condicionEntrega }) => {
    const equipo = equipos.find((e) => e.id === equipoId)
    const colaborador = colaboradores.find((c) => c.id === colaboradorId)

    if (!equipo || equipo.estado !== 'Disponible') throw new Error('Este equipo no está disponible para préstamo.')
    if (!colaborador) throw new Error('Selecciona el colaborador que recibe el equipo.')
    const errorCondicion = validarCondicion(condicionEntrega, 'La condición de entrega')
    if (errorCondicion) throw new Error(errorCondicion)

    const nuevoPrestamo = crearPrestamo(equipo, colaborador, condicionEntrega, new Date())
    // El más reciente va primero en el historial
    setHistorial((anterior) => [nuevoPrestamo, ...anterior])
    cambiarEstado(equipoId, 'Prestado')
    return nuevoPrestamo
  }

  /**
   * Registra la devolución del préstamo activo del equipo.
   * Si llegó en las mismas condiciones -> Disponible; si no -> En mantenimiento.
   * @returns {string} el nuevo estado del equipo
   */
  const registrarDevolucion = ({ equipoId, condicionDevolucion, mismasCondiciones }) => {
    const prestamoActivo = buscarPrestamoActivo(historial, equipoId)
    if (!prestamoActivo) throw new Error('Este equipo no tiene un préstamo activo.')
    const errorCondicion = validarCondicion(condicionDevolucion, 'La condición de devolución')
    if (errorCondicion) throw new Error(errorCondicion)

    const fechaDevolucion = new Date().toISOString()
    // map devuelve un arreglo nuevo: se cambia solo el préstamo activo
    setHistorial((anterior) =>
      anterior.map((prestamo) =>
        prestamo.id === prestamoActivo.id
          ? {
              ...prestamo,
              fechaDevolucion,
              condicionDevolucion: condicionDevolucion.trim(),
              mismasCondiciones,
            }
          : prestamo,
      ),
    )

    const nuevoEstado = mismasCondiciones ? 'Disponible' : 'En mantenimiento'
    cambiarEstado(equipoId, nuevoEstado)
    return nuevoEstado
  }

  /**
   * Un equipo En mantenimiento vuelve a estar Disponible.
   */
  const marcarReparado = (equipoId) => {
    const equipo = equipos.find((e) => e.id === equipoId)
    if (!equipo || equipo.estado !== 'En mantenimiento') throw new Error('Este equipo no está en mantenimiento.')
    cambiarEstado(equipoId, 'Disponible')
  }

  /**
   * Borra lo guardado en localStorage y vuelve a los datos de ejemplo:
   * estados del JSON e historial vacío.
   */
  const restablecerDatos = () => {
    borrarLocal(CLAVES.estados)
    borrarLocal(CLAVES.historial)
    setEstadosGuardados({})
    setHistorial([])
    setEquipoSeleccionadoId(null)
  }

  // Busca el préstamo activo de un equipo (para el formulario de devolución)
  const obtenerPrestamoActivo = (equipoId) => buscarPrestamoActivo(historial, equipoId)

  // Objeto con todo lo que comparte el contexto
  const valor = {
    equipos,
    colaboradores,
    historial,
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
    registrarPrestamo,
    registrarDevolucion,
    marcarReparado,
    restablecerDatos,
    obtenerPrestamoActivo,
  }

  return <PrestamosContext.Provider value={valor}>{children}</PrestamosContext.Provider>
}

export default PrestamosProvider
