// =========================================================
// Funciones propias para trabajar con el arreglo de equipos.
// Son funciones "puras": reciben datos y devuelven un resultado
// sin modificar el arreglo original. Así son fáciles de probar
// y de explicar.
// =========================================================

// Arreglos con los valores posibles. Se usan para llenar los
// selectores de filtros y para inicializar el conteo por estado.
export const CATEGORIAS = [
  'Portátiles',
  'Proyectores',
  'Tablets',
  'Periféricos',
  'Audio y video',
  'Redes',
]

export const ESTADOS = ['Disponible', 'Prestado', 'En mantenimiento']

// Cantidad de tarjetas por página que pide el proyecto
export const EQUIPOS_POR_PAGINA = 10

/**
 * Filtra los equipos por categoría y estado.
 * Un filtro vacío ('') significa "todos", es decir, no filtra.
 *
 * @param {Array} equipos - lista completa de equipos
 * @param {{categoria: string, estado: string}} filtros
 * @returns {Array} nueva lista solo con los equipos que cumplen ambos filtros
 */
export function filtrarEquipos(equipos, filtros) {
  return equipos.filter((equipo) => {
    const cumpleCategoria = filtros.categoria === '' || equipo.categoria === filtros.categoria
    const cumpleEstado = filtros.estado === '' || equipo.estado === filtros.estado
    return cumpleCategoria && cumpleEstado
  })
}

/**
 * Devuelve solo los elementos de una página.
 * Ejemplo: página 2 con 10 por página -> elementos del índice 10 al 19.
 *
 * @param {Array} lista
 * @param {number} pagina - empieza en 1
 * @param {number} porPagina
 */
export function paginar(lista, pagina, porPagina = EQUIPOS_POR_PAGINA) {
  const inicio = (pagina - 1) * porPagina
  const fin = inicio + porPagina
  return lista.slice(inicio, fin)
}

/**
 * Calcula cuántas páginas hacen falta para mostrar todos los elementos.
 * Siempre devuelve al menos 1 para que la paginación no quede en "página 1 de 0".
 */
export function calcularTotalPaginas(totalElementos, porPagina = EQUIPOS_POR_PAGINA) {
  return Math.max(1, Math.ceil(totalElementos / porPagina))
}

/**
 * Cuenta cuántos equipos hay en cada estado.
 * Resultado: { Disponible: 15, Prestado: 8, 'En mantenimiento': 4 }
 *
 * Se usa reduce: recorre el arreglo y va acumulando el conteo en un objeto.
 * El objeto inicial tiene todos los estados en 0, así ninguno queda sin valor.
 */
export function contarPorEstado(equipos) {
  const conteoInicial = {}
  ESTADOS.forEach((estado) => {
    conteoInicial[estado] = 0
  })

  return equipos.reduce((conteo, equipo) => {
    conteo[equipo.estado] = (conteo[equipo.estado] || 0) + 1
    return conteo
  }, conteoInicial)
}
