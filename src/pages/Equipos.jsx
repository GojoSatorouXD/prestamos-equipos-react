import { useState } from 'react'
import TituloPagina from '../components/comunes/TituloPagina'
import Cargando from '../components/comunes/Cargando'
import ContadorEstados from '../components/equipos/ContadorEstados'
import Filtros from '../components/equipos/Filtros'
import ListaEquipos from '../components/equipos/ListaEquipos'
import Paginacion from '../components/equipos/Paginacion'
import { usePrestamos } from '../context/PrestamosContext'
import {
  paginar,
  calcularTotalPaginas,
  hayFiltrosActivos,
  CATEGORIAS,
  ESTADOS,
  EQUIPOS_POR_PAGINA,
} from '../utils/equipos'
import './Equipos.css'

/**
 * Vista: Inventario de equipos (/equipos)
 *
 * 1. Lee del contexto el inventario, la lista ya filtrada y los filtros aplicados.
 * 2. Guarda en un estado local la página actual (empieza en 1).
 * 3. Recorta la lista filtrada con paginar() para mostrar solo 10 tarjetas.
 */
function Equipos() {
  const { equipos, equiposFiltrados, filtros, conteo, cargando, error, aplicarFiltros, limpiarFiltros } =
    usePrestamos()

  // Estado local: solo esta vista necesita saber en qué página está
  const [paginaActual, setPaginaActual] = useState(1)

  const totalPaginas = calcularTotalPaginas(equiposFiltrados.length)
  const equiposDeLaPagina = paginar(equiposFiltrados, paginaActual)

  // Rango que se está viendo, por ejemplo "11–20 de 60"
  const desde = (paginaActual - 1) * EQUIPOS_POR_PAGINA + 1
  const hasta = desde + equiposDeLaPagina.length - 1

  // Evento de la paginación: cambia de página y sube al inicio de la lista
  const cambiarPagina = (nuevaPagina) => {
    setPaginaActual(nuevaPagina)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Filtrar y Limpiar actualizan el contexto y vuelven a la página 1
  const manejarFiltrar = (nuevosFiltros) => {
    aplicarFiltros(nuevosFiltros)
    setPaginaActual(1)
  }

  const manejarLimpiar = () => {
    limpiarFiltros()
    setPaginaActual(1)
  }

  // Contenido según el estado de la carga
  let contenido
  if (cargando) {
    contenido = <Cargando mensaje="Cargando equipos…" />
  } else if (error) {
    contenido = (
      <p className="equipos-error" role="alert">
        {error}. Intenta recargar la página.
      </p>
    )
  } else {
    contenido = (
      <>
        <ContadorEstados conteo={conteo} total={equipos.length} />

        <Filtros
          categorias={CATEGORIAS}
          estados={ESTADOS}
          filtrosAplicados={filtros}
          onFiltrar={manejarFiltrar}
          onLimpiar={manejarLimpiar}
        />

        {/* aria-live: el lector de pantalla anuncia el cambio de resultados */}
        <p className="equipos-rango" aria-live="polite">
          {equiposFiltrados.length > 0
            ? `Mostrando ${desde}–${hasta} de ${equiposFiltrados.length} equipos`
            : '0 resultados'}
          {hayFiltrosActivos(filtros) && ` (filtrados de ${equipos.length} en total)`}
        </p>

        <ListaEquipos equipos={equiposDeLaPagina} />

        <Paginacion
          paginaActual={paginaActual}
          totalPaginas={totalPaginas}
          onCambiarPagina={cambiarPagina}
        />
      </>
    )
  }

  return (
    <section className="contenedor">
      <TituloPagina
        titulo="Inventario de equipos"
        subtitulo="Inventario de equipos de TI para préstamo a los colaboradores, con su estado actual."
      />
      {contenido}
    </section>
  )
}

export default Equipos
