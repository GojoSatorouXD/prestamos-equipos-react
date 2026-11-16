// =========================================================
// Servicio de datos: obtiene los equipos desde el archivo
// public/data/equipos.json usando fetch (una Promesa).
// =========================================================

const URL_EQUIPOS = '/data/equipos.json'

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
 * Carga la lista de equipos.
 * Es una función async: devuelve una Promesa con el arreglo de equipos.
 *
 * @param {AbortSignal} signal - permite cancelar la petición si el
 *                               componente se desmonta antes de terminar
 * @returns {Promise<Array>}
 */
export async function obtenerEquipos(signal) {
  await esperar(600) // demora simulada (solo para la demo)

  const respuesta = await fetch(URL_EQUIPOS, { signal })

  // fetch no falla con errores HTTP (404, 500), por eso se revisa "ok"
  if (!respuesta.ok) {
    throw new Error(`No se pudo cargar el inventario (error ${respuesta.status})`)
  }

  // .json() también es una Promesa: convierte el texto en un arreglo de objetos
  return respuesta.json()
}
