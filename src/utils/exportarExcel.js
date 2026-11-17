// =========================================================
// Exportar el historial de préstamos a Excel (.xlsx) con SheetJS.
// SheetJS se instaló desde su CDN oficial (cdn.sheetjs.com), no desde
// el paquete "xlsx" del registro de npm, que está desactualizado.
// =========================================================
import { COLUMNAS_HISTORIAL } from './historial'

// Ancho aproximado de cada columna en Excel (en caracteres), mismo orden
const ANCHOS = [13, 34, 14, 32, 28, 26, 22, 24, 36, 36, 12, 18, 10]

/**
 * Convierte el historial en filas para Excel.
 * Cada fila es un objeto { 'Serial': 'TI-PT-0001', 'Equipo': '…', … }
 * usando las MISMAS columnas que la tabla de la vista Préstamos.
 *
 * @param {Array} historial
 * @returns {Array<object>}
 */
export function construirFilasExcel(historial) {
  return historial.map((prestamo) => {
    const fila = {}
    COLUMNAS_HISTORIAL.forEach((columna) => {
      fila[columna.titulo] = columna.valor(prestamo)
    })
    return fila
  })
}

/**
 * Nombre del archivo con la fecha de hoy: historial-prestamos-2026-11-17.xlsx
 */
export function nombreArchivoExcel(fecha = new Date()) {
  const anio = fecha.getFullYear()
  const mes = String(fecha.getMonth() + 1).padStart(2, '0')
  const dia = String(fecha.getDate()).padStart(2, '0')
  return `historial-prestamos-${anio}-${mes}-${dia}.xlsx`
}

/**
 * Crea el archivo .xlsx y lo descarga en el navegador.
 * Es async porque SheetJS se carga con import() dinámico: la librería
 * solo se descarga cuando alguien presiona "Exportar a Excel"
 * (import() devuelve una Promesa).
 *
 * @param {Array} historial
 */
export async function exportarHistorialExcel(historial) {
  const XLSX = await import('xlsx')

  const filas = construirFilasExcel(historial)
  const encabezados = COLUMNAS_HISTORIAL.map((columna) => columna.titulo)

  // 1. Hoja de cálculo a partir del arreglo de objetos
  const hoja = XLSX.utils.json_to_sheet(filas, { header: encabezados })
  hoja['!cols'] = ANCHOS.map((ancho) => ({ wch: ancho }))

  // 2. Libro de Excel con esa hoja
  const libro = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(libro, hoja, 'Historial')

  // 3. Descarga del archivo
  XLSX.writeFile(libro, nombreArchivoExcel())
}
