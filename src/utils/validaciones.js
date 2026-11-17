// =========================================================
// Validaciones del formulario de contacto (funciones propias).
// Cada función recibe el valor del campo y devuelve:
//   - ''  (texto vacío) si el valor es válido
//   - un mensaje de error si no lo es
// =========================================================

export const MAX_NOMBRE = 20
export const MAX_TELEFONO = 10
export const MIN_DESCRIPCION = 10
export const MAX_DESCRIPCION = 500

// Solo letras (con tildes, ü y ñ) y espacios.
//  ^ y $  -> la regla aplica a TODO el texto, de principio a fin
//  [...]  -> conjunto de caracteres permitidos
//  +      -> uno o más de esos caracteres
const REGEX_LETRAS = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]+$/

// Correo: algo@algo.dominio
//  [^\s@]+   -> uno o más caracteres que no sean espacio ni @
//  @         -> una arroba
//  \.        -> un punto literal
//  [A-Za-z]{2,} -> terminación de al menos 2 letras (.co, .com, .edu)
const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/

// Teléfono: solo dígitos (\d), entre 7 y 10
const REGEX_TELEFONO = /^\d{7,10}$/

/**
 * Valida nombre o apellidos: obligatorio, solo letras, máximo 20 caracteres.
 * @param {string} valor
 * @param {string} campo - 'El nombre' o 'Los apellidos' (para el mensaje)
 * @param {boolean} plural - true para "Los apellidos" (concordancia del mensaje)
 */
export function validarNombre(valor, campo = 'El nombre', plural = false) {
  const texto = valor.trim()
  if (texto === '') return plural ? `${campo} son obligatorios.` : `${campo} es obligatorio.`
  if (!REGEX_LETRAS.test(texto)) return `${campo} solo ${plural ? 'pueden' : 'puede'} tener letras y espacios.`
  if (texto.length > MAX_NOMBRE) return `${campo} ${plural ? 'admiten' : 'admite'} máximo ${MAX_NOMBRE} caracteres.`
  return ''
}

export function validarCorreo(valor) {
  const texto = valor.trim()
  if (texto === '') return 'El correo es obligatorio.'
  if (!REGEX_CORREO.test(texto)) return 'Escribe un correo válido, por ejemplo nombre@empresa.com.'
  return ''
}

export function validarTelefono(valor) {
  if (valor === '') return 'El teléfono es obligatorio.'
  if (!REGEX_TELEFONO.test(valor)) return 'El teléfono debe tener solo números, entre 7 y 10 dígitos.'
  return ''
}

export function validarDescripcion(valor) {
  const texto = valor.trim()
  if (texto === '') return 'La descripción es obligatoria.'
  if (texto.length < MIN_DESCRIPCION) return `Cuéntanos un poco más (mínimo ${MIN_DESCRIPCION} caracteres).`
  if (texto.length > MAX_DESCRIPCION) return `Máximo ${MAX_DESCRIPCION} caracteres.`
  return ''
}

/**
 * Valida un solo campo según su nombre. La usa el formulario
 * tanto al enviar como al corregir un campo con error.
 */
export function validarCampo(nombreCampo, valor) {
  switch (nombreCampo) {
    case 'nombre':
      return validarNombre(valor, 'El nombre')
    case 'apellidos':
      return validarNombre(valor, 'Los apellidos', true)
    case 'correo':
      return validarCorreo(valor)
    case 'telefono':
      return validarTelefono(valor)
    case 'descripcion':
      return validarDescripcion(valor)
    default:
      return ''
  }
}

/**
 * Valida todo el formulario.
 * @param {object} valores - { nombre, apellidos, correo, telefono, descripcion }
 * @returns {object} errores - mismo formato; solo trae los campos con error
 */
export function validarFormulario(valores) {
  const errores = {}
  Object.keys(valores).forEach((campo) => {
    const mensaje = validarCampo(campo, valores[campo])
    if (mensaje !== '') errores[campo] = mensaje
  })
  return errores
}

/**
 * Limpian lo que el usuario escribe, para que solo se puedan
 * INGRESAR los caracteres permitidos (además de la validación final).
 */
export function soloLetras(valor) {
  return valor.replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]/g, '').slice(0, MAX_NOMBRE)
}

export function soloNumeros(valor) {
  return valor.replace(/\D/g, '').slice(0, MAX_TELEFONO)
}
