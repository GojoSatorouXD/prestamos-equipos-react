import emailjs from '@emailjs/browser'

// =========================================================
// Envío del formulario de contacto con EmailJS.
// Las claves se leen de variables de entorno (archivo .env, que NO
// se sube a GitHub). Vite solo expone las que empiezan con VITE_.
// Ver .env.example para saber cuáles hay que crear.
// =========================================================

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

// true solo si las 3 claves existen
export const emailjsConfigurado = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY)

/**
 * Envía los datos del formulario.
 * Devuelve una Promesa que se resuelve con { modo: 'real' } o { modo: 'demo' }.
 *
 * Si EmailJS todavía no está configurado, simula el envío (modo demo)
 * para que el formulario se pueda probar igual en la sustentación.
 *
 * @param {{nombre, apellidos, correo, telefono, descripcion}} datos
 */
export async function enviarCorreo(datos) {
  if (!emailjsConfigurado) {
    // Promesa que se resuelve sola después de 1 segundo
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return { modo: 'demo' }
  }

  // emailjs.send también devuelve una Promesa. Si falla, lanza un error
  // que el formulario atrapa con try/catch.
  await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      nombre: datos.nombre,
      apellidos: datos.apellidos,
      correo: datos.correo,
      telefono: datos.telefono,
      descripcion: datos.descripcion,
    },
    { publicKey: PUBLIC_KEY },
  )
  return { modo: 'real' }
}
