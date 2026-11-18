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
  'Accesorios',
]

export const ESTADOS = ['Disponible', 'Prestado', 'En mantenimiento']

// Cantidad de tarjetas por página que pide el proyecto
export const EQUIPOS_POR_PAGINA = 10

// Ilustración SVG de cada categoría. Se usa como respaldo cuando
// la foto real de un equipo no existe o no carga.
const ILUSTRACIONES = {
  Portátiles: 'portatiles',
  Proyectores: 'proyectores',
  Tablets: 'tablets',
  Periféricos: 'perifericos',
  'Audio y video': 'audio-video',
  Redes: 'redes',
  Accesorios: 'accesorios',
}

/**
 * Ruta de la ilustración SVG de una categoría.
 *   imagenRespaldo('Redes') -> '/img/categorias/redes.svg'
 */
export function imagenRespaldo(categoria) {
  return `/img/categorias/${ILUSTRACIONES[categoria] ?? 'accesorios'}.svg`
}

/**
 * Manejador del evento onError de una <img> de equipo: si la foto falla,
 * la cambia por la ilustración de su categoría. Se comprueba la ruta
 * para no entrar en un ciclo si también fallara la ilustración.
 */
export function usarImagenRespaldo(evento, categoria) {
  const imagen = evento.currentTarget
  const respaldo = imagenRespaldo(categoria)
  if (!imagen.src.endsWith(respaldo)) imagen.src = respaldo
}

// Filtros vacíos = mostrar todos los equipos
export const FILTROS_INICIALES = { texto: '', categoria: '', estado: '' }

/**
 * Prepara un texto para compararlo sin importar mayúsculas ni tildes.
 *   "Portátil LENOVO" -> "portatil lenovo"
 *
 * Pasos:
 *  1. toLowerCase(): todo a minúsculas.
 *  2. normalize('NFD'): separa cada letra de su tilde ("á" pasa a ser "a" + "´").
 *  3. replace(...): borra esas tildes sueltas (rango Unicode ̀-ͯ).
 */
export function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
}

/**
 * Indica si un equipo contiene el texto buscado en su nombre,
 * marca, serial o especificaciones.
 */
export function coincideConBusqueda(equipo, texto) {
  const busqueda = normalizarTexto(texto.trim())
  if (busqueda === '') return true // sin texto: todos coinciden

  // Se juntan los 4 campos en un solo texto y se busca ahí
  const contenido = normalizarTexto(
    [equipo.nombre, equipo.marca, equipo.serial, equipo.especificaciones].join(' '),
  )
  return contenido.includes(busqueda)
}

/**
 * Filtra los equipos por texto, categoría y estado (los tres a la vez).
 * Un filtro vacío ('') significa "todos", es decir, no filtra.
 *
 * @param {Array} equipos - lista completa de equipos
 * @param {{texto: string, categoria: string, estado: string}} filtros
 * @returns {Array} nueva lista solo con los equipos que cumplen los tres filtros
 */
export function filtrarEquipos(equipos, filtros) {
  return equipos.filter((equipo) => {
    const cumpleTexto = coincideConBusqueda(equipo, filtros.texto)
    const cumpleCategoria = filtros.categoria === '' || equipo.categoria === filtros.categoria
    const cumpleEstado = filtros.estado === '' || equipo.estado === filtros.estado
    return cumpleTexto && cumpleCategoria && cumpleEstado
  })
}

/**
 * Indica si hay algún filtro aplicado (para mostrar "de 60 en total").
 */
export function hayFiltrosActivos(filtros) {
  return filtros.texto.trim() !== '' || filtros.categoria !== '' || filtros.estado !== ''
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
 * Resultado: { Disponible: 55, Prestado: 0, 'En mantenimiento': 5 }
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
