// =========================================================
// Columnas del historial de préstamos.
// La tabla de la vista Préstamos y el archivo de Excel usan este
// MISMO arreglo, así siempre muestran las mismas columnas.
//
// Cada columna es un objeto con:
//  - titulo: encabezado
//  - valor: función que recibe un préstamo y devuelve el texto de la celda
// =========================================================
import { formatearFechaHora, calcularDuracion, estadoPrestamo } from './prestamos'

// Convierte true/false/null en Sí / No / — (aún no se ha devuelto)
function textoMismasCondiciones(valor) {
  if (valor === null) return '—'
  return valor ? 'Sí' : 'No'
}

export const COLUMNAS_HISTORIAL = [
  { titulo: 'Serial', valor: (p) => p.serial },
  { titulo: 'Equipo', valor: (p) => p.equipo },
  { titulo: 'Categoría', valor: (p) => p.categoria },
  { titulo: 'Colaborador', valor: (p) => p.colaborador },
  { titulo: 'Cargo', valor: (p) => p.cargo },
  { titulo: 'Área', valor: (p) => p.area },
  { titulo: 'Fecha y hora de préstamo', valor: (p) => formatearFechaHora(p.fechaPrestamo) },
  { titulo: 'Fecha y hora de devolución', valor: (p) => formatearFechaHora(p.fechaDevolucion) },
  { titulo: 'Condición de entrega', valor: (p) => p.condicionEntrega },
  { titulo: 'Condición de devolución', valor: (p) => p.condicionDevolucion ?? '—' },
  { titulo: '¿Mismas condiciones?', valor: (p) => textoMismasCondiciones(p.mismasCondiciones) },
  {
    titulo: 'Duración',
    valor: (p) => {
      const duracion = calcularDuracion(p.fechaPrestamo, p.fechaDevolucion)
      // Si sigue activo, la duración es "hasta ahora"
      return p.fechaDevolucion ? duracion : `${duracion} (en curso)`
    },
  },
  { titulo: 'Estado', valor: (p) => estadoPrestamo(p) },
]

/**
 * Cuenta los préstamos activos y devueltos.
 * @returns {{ total: number, activos: number, devueltos: number }}
 */
export function resumenHistorial(historial) {
  const activos = historial.filter((p) => p.fechaDevolucion === null).length
  return { total: historial.length, activos, devueltos: historial.length - activos }
}

// =========================================================
// Datos para el mini dashboard de la vista Préstamos
// =========================================================

/**
 * Agrupa una lista y cuenta cuántos elementos hay en cada grupo.
 * Devuelve un arreglo ordenado de mayor a menor cantidad.
 *
 * @param {Array} lista
 * @param {(elemento) => string} obtenerClave - a qué grupo pertenece cada elemento
 * @param {(elemento) => object} [obtenerDatos] - datos extra del grupo (etiqueta, detalle)
 * @returns {Array<{ clave: string, valor: number }>}
 */
export function contarAgrupado(lista, obtenerClave, obtenerDatos = () => ({})) {
  // reduce recorre la lista y va llenando un objeto { clave: grupo }
  const grupos = lista.reduce((acumulado, elemento) => {
    const clave = obtenerClave(elemento)
    if (!acumulado[clave]) acumulado[clave] = { clave, valor: 0, ...obtenerDatos(elemento) }
    acumulado[clave].valor += 1
    return acumulado
  }, {})

  // Object.values pasa el objeto a arreglo; sort ordena de mayor a menor
  // (si empatan, por orden alfabético para que el orden no cambie al azar)
  return Object.values(grupos).sort((a, b) => b.valor - a.valor || a.clave.localeCompare(b.clave, 'es'))
}

/**
 * Préstamos por categoría: [{ clave: 'Portátiles', etiqueta: 'Portátiles', valor: 4 }, …]
 */
export function prestamosPorCategoria(historial) {
  return contarAgrupado(
    historial,
    (prestamo) => prestamo.categoria,
    (prestamo) => ({ etiqueta: prestamo.categoria }),
  )
}

/**
 * Los equipos que más veces se han prestado (por defecto, los 5 primeros).
 * Se agrupa por id del equipo: dos equipos con el mismo nombre no se mezclan.
 */
export function equiposMasPrestados(historial, limite = 5) {
  const ranking = contarAgrupado(
    historial,
    (prestamo) => String(prestamo.equipoId),
    (prestamo) => ({ etiqueta: prestamo.equipo, detalle: prestamo.serial }),
  )
  return ranking.slice(0, limite)
}
