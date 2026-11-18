// =========================================================
// Funciones propias para préstamos, devoluciones e historial.
// =========================================================

export const MIN_CONDICION = 5
export const MAX_CONDICION = 200

// Dónde queda un equipo que llega dañado y pasa a mantenimiento
export const UBICACION_REPARACION = 'Oficina TI – Mesa de reparación'

/**
 * Ubicación de un equipo prestado: el área del colaborador y su nombre.
 *   -> 'Área de Educación Física – José Luis Oviedo Camacho'
 */
export function ubicacionColaborador(colaborador) {
  return `Área de ${colaborador.area} – ${colaborador.nombreCompleto}`
}

/**
 * Aplica sobre el inventario del JSON lo guardado en localStorage:
 * el estado y la ubicación actual de cada equipo.
 * Ejemplo: si estados = { 3: 'Prestado' } y
 * ubicaciones = { 3: { actual: 'Área de Contabilidad – …', original: 'Bodega TI – Estante B2' } },
 * el equipo 3 queda Prestado y en el área de Contabilidad.
 *
 * El equipo sigue teniendo los mismos 8 atributos: solo cambian los
 * VALORES de "estado" y "ubicacion". La ubicación original no se pierde:
 * está guardada en "ubicaciones" (y en el JSON).
 *
 * @param {Array} equiposBase - equipos tal como vienen del JSON
 * @param {object} estados - { idEquipo: estado }
 * @param {object} ubicaciones - { idEquipo: { actual, original } }
 * @returns {Array} nuevo arreglo con los equipos actualizados
 */
export function aplicarEstadosGuardados(equiposBase, estados, ubicaciones = {}) {
  return equiposBase.map((equipo) => {
    const estadoGuardado = estados[equipo.id]
    const ubicacionGuardada = ubicaciones[equipo.id]
    // Si no hay nada guardado, el equipo queda igual que en el JSON
    if (!estadoGuardado && !ubicacionGuardada) return equipo
    // Si hay algo guardado se crea una COPIA del equipo con esos valores
    return {
      ...equipo,
      estado: estadoGuardado ?? equipo.estado,
      ubicacion: ubicacionGuardada?.actual ?? equipo.ubicacion,
    }
  })
}

/**
 * Ubicación a la que debe volver un equipo: la original guardada o,
 * si nunca se ha movido, la que tiene en el JSON.
 */
export function obtenerUbicacionOriginal(equipoBase, ubicaciones) {
  return ubicaciones[equipoBase.id]?.original ?? equipoBase.ubicacion
}

/**
 * Busca el préstamo que sigue abierto (sin devolución) de un equipo.
 * @returns {object|undefined}
 */
export function buscarPrestamoActivo(historial, equipoId) {
  return historial.find((prestamo) => prestamo.equipoId === equipoId && prestamo.fechaDevolucion === null)
}

/**
 * Crea el registro de un préstamo nuevo.
 * Guarda una COPIA de los datos del equipo y del colaborador: así el
 * historial queda igual aunque luego cambien esos datos (como la hoja de papel).
 *
 * También guarda las ubicaciones: la original (a donde vuelve) y la del
 * préstamo (área del colaborador). La de devolución se completa al devolver.
 *
 * @param {object} equipo
 * @param {object} colaborador
 * @param {string} condicionEntrega
 * @param {Date} fecha - fecha y hora del préstamo (automática)
 * @param {string} ubicacionOriginal - ubicación de bodega/oficina del equipo
 */
export function crearPrestamo(equipo, colaborador, condicionEntrega, fecha = new Date(), ubicacionOriginal = equipo.ubicacion) {
  return {
    id: `${equipo.id}-${fecha.getTime()}`, // identificador único
    equipoId: equipo.id,
    serial: equipo.serial,
    equipo: equipo.nombre,
    categoria: equipo.categoria,
    colaboradorId: colaborador.id,
    colaborador: colaborador.nombreCompleto,
    documento: colaborador.documento,
    cargo: colaborador.cargo,
    area: colaborador.area,
    fechaPrestamo: fecha.toISOString(), // texto, para poder guardarlo en localStorage
    condicionEntrega: condicionEntrega.trim(),
    ubicacionOriginal,
    ubicacionPrestamo: ubicacionColaborador(colaborador),
    fechaDevolucion: null,
    condicionDevolucion: null,
    mismasCondiciones: null,
    ubicacionDevolucion: null, // original (buen estado) o mesa de reparación
  }
}

/**
 * Devuelve el estado de un préstamo para la tabla: 'Activo' o 'Devuelto'.
 */
export function estadoPrestamo(prestamo) {
  return prestamo.fechaDevolucion === null ? 'Activo' : 'Devuelto'
}

/**
 * Valida el texto de "Condición de entrega" o "Condición de devolución".
 * @returns {string} '' si es válido, o el mensaje de error
 */
export function validarCondicion(texto, campo = 'La condición') {
  const limpio = texto.trim()
  if (limpio === '') return `${campo} es obligatoria.`
  if (limpio.length < MIN_CONDICION) return `${campo} debe tener al menos ${MIN_CONDICION} caracteres.`
  if (limpio.length > MAX_CONDICION) return `${campo} admite máximo ${MAX_CONDICION} caracteres.`
  return ''
}

/**
 * Convierte una fecha ISO en texto legible en español de Colombia.
 * '2026-11-17T15:30:00.000Z' -> '17/11/2026, 10:30 a. m.'
 */
export function formatearFechaHora(fechaISO) {
  if (!fechaISO) return '—'
  return new Date(fechaISO).toLocaleString('es-CO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Calcula cuánto duró un préstamo, en texto: '2 d 3 h', '1 h 15 min', '8 min'.
 * Si todavía no se devuelve (fin = null), calcula hasta "ahora".
 *
 * @param {string} inicioISO
 * @param {string|null} finISO
 * @param {Date} ahora - se puede pasar para pruebas
 */
export function calcularDuracion(inicioISO, finISO, ahora = new Date()) {
  const inicio = new Date(inicioISO)
  const fin = finISO ? new Date(finISO) : ahora
  const minutosTotales = Math.floor((fin - inicio) / 60000) // 60000 ms = 1 minuto

  if (minutosTotales < 1) return 'menos de 1 min'

  const dias = Math.floor(minutosTotales / 1440) // 1440 min = 1 día
  const horas = Math.floor((minutosTotales % 1440) / 60)
  const minutos = minutosTotales % 60

  // Se muestran máximo las 2 unidades más grandes
  if (dias > 0) return horas > 0 ? `${dias} d ${horas} h` : `${dias} d`
  if (horas > 0) return minutos > 0 ? `${horas} h ${minutos} min` : `${horas} h`
  return `${minutos} min`
}
