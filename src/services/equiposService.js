// =========================================================
// Servicio de datos: obtiene el inventario y los colaboradores
// desde los archivos JSON de public/data usando fetch (Promesas).
// =========================================================

const URL_EQUIPOS = '/data/equipos.json'
const URL_COLABORADORES = '/data/colaboradores.json'

/**
 * Crea una Promesa que se resuelve después de "ms" milisegundos.
 * Se usa para simular la demora de un servidor real y así poder
 * ver el mensaje de "Cargando…" en la demo.
 */
function esperar(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

/**
 * Pide un archivo JSON y lo convierte en datos de JavaScript.
 * @param {string} url
 * @param {AbortSignal} signal - permite cancelar la petición
 * @returns {Promise<any>}
 */
async function obtenerJSON(url, signal) {
  const respuesta = await fetch(url, { signal })

  // fetch no falla con errores HTTP (404, 500), por eso se revisa "ok"
  if (!respuesta.ok) {
    throw new Error(`No se pudo cargar ${url} (error ${respuesta.status})`)
  }

  // .json() también es una Promesa: convierte el texto en arreglos y objetos
  return respuesta.json()
}

/**
 * Carga la lista de equipos (arreglo de objetos).
 * Incluye la demora simulada para mostrar "Cargando…".
 */
export async function obtenerEquipos(signal) {
  await esperar(600) // demora simulada (solo para la demo)
  return obtenerJSON(URL_EQUIPOS, signal)
}

/**
 * Carga la lista de colaboradores (arreglo de objetos, datos de ejemplo).
 */
export function obtenerColaboradores(signal) {
  return obtenerJSON(URL_COLABORADORES, signal)
}
