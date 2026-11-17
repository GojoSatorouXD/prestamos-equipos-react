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
