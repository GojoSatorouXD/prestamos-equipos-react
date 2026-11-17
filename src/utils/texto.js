/**
 * Escribe un número con la palabra en singular o plural.
 *   pluralizar(1, 'préstamo', 'préstamos') -> '1 préstamo'
 *   pluralizar(3, 'préstamo', 'préstamos') -> '3 préstamos'
 */
export function pluralizar(cantidad, singular, plural) {
  return `${cantidad} ${cantidad === 1 ? singular : plural}`
}

/**
 * Igual que pluralizar, pero devuelve solo la palabra (sin el número),
 * útil cuando el número se muestra aparte (por ejemplo en negrita).
 */
export function palabraSegunCantidad(cantidad, singular, plural) {
  return cantidad === 1 ? singular : plural
}
