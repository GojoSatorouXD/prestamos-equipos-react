// =========================================================
// Funciones para guardar y leer datos en localStorage.
//
// localStorage guarda TEXTO en el navegador y sobrevive a recargar
// la página o cerrar el navegador. Por eso:
//  - al guardar se convierte el dato a texto con JSON.stringify
//  - al leer se convierte de nuevo a objeto/arreglo con JSON.parse
//
// Se usa try/catch porque localStorage puede fallar (navegación
// privada, almacenamiento lleno o datos dañados). Si falla, la
// aplicación sigue funcionando con el valor por defecto.
// =========================================================

// Nombres (claves) con los que se guarda cada dato
export const CLAVES = {
  estados: 'prestatech:estados', // { idEquipo: 'Prestado', ... }
  ubicaciones: 'prestatech:ubicaciones', // { idEquipo: { actual, original }, ... }
  historial: 'prestatech:historial', // arreglo de préstamos
  tema: 'prestatech:tema', // 'claro' | 'oscuro'
}

/**
 * Lee un dato. Si no existe o está dañado, devuelve "valorPorDefecto".
 */
export function leerLocal(clave, valorPorDefecto) {
  try {
    const texto = localStorage.getItem(clave)
    return texto === null ? valorPorDefecto : JSON.parse(texto)
  } catch {
    return valorPorDefecto
  }
}

/**
 * Guarda un dato (objeto, arreglo o texto) convertido a JSON.
 */
export function guardarLocal(clave, valor) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor))
  } catch {
    // Sin espacio o sin permiso: no se guarda, pero la app sigue funcionando
  }
}

/**
 * Borra un dato.
 */
export function borrarLocal(clave) {
  try {
    localStorage.removeItem(clave)
  } catch {
    // Nada que hacer
  }
}
