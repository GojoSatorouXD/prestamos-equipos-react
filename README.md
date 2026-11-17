# PrestaTech · Préstamo de equipos de TI

Proyecto final de **Interfaces con React** – Institución Universitaria Antonio José Camacho (UNIAJC), 2026.
Autor: **Juan David Paz Trochez** · Línea de desarrollo: **3.4 Equipos de computación y accesorios**.

PrestaTech **digitaliza la hoja de papel de préstamos** del equipo de soporte TI de una empresa (colegio u oficina).
En la hoja se anotaba a mano el serial, el nombre y modelo del equipo, la fecha y hora del préstamo y el nombre de quien lo recibía.
Ahora el técnico de TI ve el inventario con su estado, registra préstamos y devoluciones con fecha y hora automáticas, consulta el historial y lo exporta a Excel.

El sitio también funciona como portafolio del autor (vistas de Inicio, Stack y Contacto).

> **Solo front-end:** no hay backend ni inicio de sesión. Los estados de los equipos y el historial se guardan en el `localStorage` del navegador. El inventario, los colaboradores y los testimonios son **datos de ejemplo**.

---

## Contenido

- [Vistas](#vistas)
- [Funcionalidades](#funcionalidades)
- [Tecnologías](#tecnologías)
- [Cómo correrlo](#cómo-correrlo)
- [Configurar EmailJS](#configurar-emailjs-opcional)
- [Despliegue en Vercel](#despliegue-en-vercel)
- [Estructura y módulos](#estructura-y-módulos)
- [Cómo funciona](#cómo-funciona)
- [Conceptos evaluados y dónde están](#conceptos-evaluados-y-dónde-están)
- [Datos de ejemplo](#datos-de-ejemplo)
- [Trabajo futuro](#trabajo-futuro)
- [Créditos](#créditos)

---

## Vistas

| Ruta | Vista | Contenido |
|---|---|---|
| `/` | **Presentación y biografía** | Banner con título, foto, descripción del perfil, botones "Ver equipos" y "Contacto", biografía (3 elementos) y redes (GitHub y correo). |
| `/equipos` | **Inventario de equipos** (proyectos) | 60 equipos en tarjetas con paginación de 10, buscador + filtros por categoría y estado, contador por estado y sidebar "Ver detalle" con los 8 atributos y las acciones de préstamo. |
| `/stack` | **Stack tecnológico y estudios** | Stack implementado en este proyecto, stack del autor (Desarrollo y Soporte TI), herramientas de IA, timeline de experiencia y estudios. |
| `/contacto` | **Contacto / nuevo proyecto** | Formulario validado (nombre, apellidos, correo, teléfono, descripción), envío con EmailJS, mensaje de agradecimiento y 5 testimonios de ejemplo. |
| `/propuesta` | **Propuesta de valor** | Antes (hoja de papel) vs. después (PrestaTech), beneficios para la empresa y lo que aporta el autor. |
| `/prestamos` | **Préstamos** (vista extra) | Historial de préstamos y devoluciones, exportar a Excel y restablecer datos de ejemplo. |

Todas comparten el **Header** (nombre, navbar y botón de tema) y el **Footer** con información de resumen.

## Funcionalidades

- **Inventario paginado:** 10 equipos por página. Al entrar se cargan los 10 primeros.
- **Tarjeta de equipo** con los 5 atributos obligatorios: imagen, nombre, categoría, marca y estado (con color).
- **Sidebar "Ver detalle"** con los 8 atributos: imagen, nombre, serial, categoría, marca, estado, ubicación y especificaciones. Se cierra con ✕, con la tecla Esc o con un clic en el fondo.
- **Filtros:**
  - Buscador de texto que busca en nombre, marca, serial y especificaciones, sin distinguir mayúsculas ni tildes.
  - Selector de categoría y selector de estado.
  - Se aplican solo al presionar **Filtrar** (o Enter). **Limpiar filtros** deja todo en blanco. Los dos botones vuelven a la página 1.
- **Préstamo** (equipo Disponible): se elige el colaborador y se escribe la condición de entrega. La fecha y la hora son automáticas. El equipo pasa a **Prestado**.
- **Devolución** (equipo Prestado):
  - Se escribe la condición de devolución y se marca si llegó en las mismas condiciones.
  - Si llegó igual, el equipo queda **Disponible**; si no, queda **En mantenimiento**.
- **Marcar como reparado** (equipo En mantenimiento): vuelve a **Disponible**.
- **Historial** con 13 columnas: serial, equipo, categoría, colaborador, cargo, área, fecha y hora de préstamo, fecha y hora de devolución, condición de entrega, condición de devolución, ¿mismas condiciones?, duración calculada y estado (Activo / Devuelto).
- **Exportar a Excel** (.xlsx) con las mismas columnas de la tabla.
- **Restablecer datos de ejemplo**, con confirmación previa.
- **Formulario de contacto validado:**
  - Nombre y apellidos: solo letras, máximo 20 caracteres.
  - Correo: validado con regex.
  - Teléfono: solo números.
  - Todos los campos son obligatorios.
- **Tema claro / oscuro**, que se guarda en el navegador.
- **Diseño responsive:** celular, tablet y escritorio.

## Tecnologías

| Tecnología | Uso |
|---|---|
| **React 19** | Componentes, props y hooks (`useState`, `useEffect`, `useContext`, `useCallback`). |
| **Vite** | Servidor de desarrollo y build de producción. |
| **react-router-dom 7** | Navegación entre las vistas sin recargar la página. |
| **Context API** | `PrestamosContext`: estado global compartido. |
| **localStorage** | Persistencia de estados de equipos, historial y tema. |
| **EmailJS** (`@emailjs/browser`) | Envío del formulario de contacto sin servidor propio. |
| **SheetJS** (`xlsx` 0.20.3) | Exportación del historial a Excel. Instalado desde el **CDN oficial** (`cdn.sheetjs.com`), no desde el paquete `xlsx` del registro de npm, que está desactualizado. |
| **CSS propio con variables** | Estilos responsive y temas claro/oscuro, sin frameworks. |
| **ESLint** | Revisión de calidad del código. |

## Cómo correrlo

Requisitos: **Node.js 20.19+ o 22.12+** (probado con Node 24) y npm.

```bash
# 1. Clonar el repositorio
git clone https://github.com/GojoSatorouXD/prestamos-equipos-react.git
cd prestamos-equipos-react

# 2. Instalar dependencias
npm install

# 3. Servidor de desarrollo -> http://localhost:5173
npm run dev
```

Otros comandos:

| Comando | Qué hace |
|---|---|
| `npm run build` | Genera la versión de producción en `dist/`. |
| `npm run preview` | Sirve la carpeta `dist/` para probar el build. |
| `npm run lint` | Revisa el código con ESLint. |

## Configurar EmailJS (opcional)

Sin configuración, el formulario de contacto funciona en **modo demo**: valida los campos y muestra el agradecimiento, pero no envía el correo. Para enviar correos reales:

1. Crear una cuenta gratuita en [emailjs.com](https://www.emailjs.com).
2. Agregar un **Email Service** (por ejemplo Gmail) y crear un **Email Template** con estas variables:
   `{{nombre}}`, `{{apellidos}}`, `{{correo}}`, `{{telefono}}`, `{{descripcion}}`.
3. Copiar `.env.example` como `.env` y completar los tres valores:
   ```
   VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
   VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
   VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxx
   ```
4. Reiniciar `npm run dev`.

El archivo `.env` está en `.gitignore`: las claves no se suben a GitHub.

## Despliegue en Vercel

1. Entrar a [vercel.com](https://vercel.com) con la cuenta de GitHub y elegir **Add New → Project**.
2. Importar el repositorio `prestamos-equipos-react`. Vercel detecta Vite automáticamente: el comando de build es `npm run build` y la carpeta de salida es `dist`.
3. *(Opcional)* En **Settings → Environment Variables**, agregar las tres variables `VITE_EMAILJS_*` y volver a desplegar.
4. Presionar **Deploy**.

El archivo `vercel.json` redirige todas las rutas a `index.html`. Así, recargar la página en `/equipos` u otra ruta no da error 404, porque las rutas las maneja React Router en el navegador.

## Estructura y módulos

```
prestamos-equipos-react/
├── public/
│   ├── data/
│   │   ├── equipos.json          # 60 equipos (8 atributos + id)
│   │   └── colaboradores.json    # 11 colaboradores de ejemplo
│   └── img/
│       ├── categorias/           # 1 ilustración SVG por categoría
│       ├── stack/                # logos e íconos de la vista Stack
│       └── perfil-placeholder.svg
├── src/
│   ├── main.jsx                  # Punto de entrada: BrowserRouter + PrestamosProvider
│   ├── App.jsx                   # Rutas de las vistas
│   ├── context/
│   │   ├── PrestamosContext.js   # createContext + hook usePrestamos()
│   │   └── PrestamosProvider.jsx # Estado global y acciones
│   ├── services/
│   │   ├── equiposService.js     # fetch de equipos y colaboradores
│   │   └── correoService.js      # envío con EmailJS
│   ├── utils/                    # Funciones propias (lógica sin interfaz)
│   │   ├── equipos.js            # filtrar, normalizar texto, paginar, contar por estado
│   │   ├── prestamos.js          # crear préstamo, validar condición, fechas, duración
│   │   ├── historial.js          # columnas del historial (tabla y Excel)
│   │   ├── exportarExcel.js      # generar el .xlsx con SheetJS
│   │   ├── validaciones.js       # validaciones del formulario de contacto (regex)
│   │   ├── almacenamiento.js     # leer/guardar en localStorage
│   │   └── texto.js              # plurales
│   ├── data/                     # Contenido fijo (arreglos de objetos)
│   │   ├── perfil.js  stack.js  testimonios.js  propuesta.js  navegacion.js
│   ├── components/
│   │   ├── layout/               # Layout, Header, Navbar, Footer, BotonTema
│   │   ├── comunes/              # TituloPagina, Cargando, BadgeEstado, CampoFormulario, RedesSociales
│   │   ├── equipos/              # TarjetaEquipo, ListaEquipos, Paginacion, Filtros, ContadorEstados, SidebarDetalle
│   │   ├── prestamos/            # AccionesEquipo, FormularioPrestamo, FormularioDevolucion, RelojActual, TablaHistorial
│   │   ├── inicio/               # Banner, Biografia
│   │   ├── stack/                # TarjetaStack, Timeline, ItemTimeline
│   │   └── contacto/             # FormularioContacto, Testimonio
│   ├── pages/                    # Inicio, Equipos, Stack, Contacto, Propuesta, Prestamos, NoEncontrado
│   └── styles/index.css          # Variables de color (temas) y estilos globales
├── docs/requisitos.pdf           # Enunciado del proyecto
├── .env.example                  # Plantilla de claves de EmailJS
└── vercel.json                   # Rutas para el despliegue
```

**Organización:**
- **`pages/`**: una vista por ruta. Arma las secciones con componentes.
- **`components/`**: piezas reutilizables que reciben datos por **props**.
- **`context/`**: estado global compartido con **useContext**.
- **`services/`**: comunicación con el exterior (fetch, EmailJS).
- **`utils/`**: funciones propias de JavaScript, sin interfaz, fáciles de probar.
- **`data/`**: contenido fijo de las vistas como arreglos de objetos.

## Cómo funciona

### 1. Carga de datos
1. `PrestamosProvider` envuelve toda la app.
2. Al montarse, un `useEffect` con `[]` llama en paralelo a `obtenerEquipos()` y `obtenerColaboradores()` con `Promise.all`. Las dos funciones usan `fetch` + `async/await`.
3. Mientras tanto, `cargando` es `true` y las vistas muestran "Cargando…".
4. Si el componente se desmonta antes de terminar, la función de limpieza cancela las peticiones con `AbortController`.

### 2. Estado global (`PrestamosContext`)
**Guarda:**
- el inventario (`equipos`), `colaboradores` e `historial`
- el `equipoSeleccionado` del sidebar
- los `filtros` aplicados
- el `tema`

**Ofrece estas acciones:**
- `seleccionarEquipo`, `cerrarDetalle`
- `aplicarFiltros`, `limpiarFiltros`
- `registrarPrestamo`, `registrarDevolucion`, `marcarReparado`, `restablecerDatos`
- `alternarTema`

Cualquier componente las usa con `usePrestamos()`.

### 3. Estados de los equipos y persistencia
- `equipos.json` trae el estado inicial: la mayoría Disponible y 5 En mantenimiento.
- Los cambios se guardan aparte, en un objeto `{ idEquipo: estado }`. La función `aplicarEstadosGuardados()` los combina con el JSON.
- Dos `useEffect` guardan ese objeto y el historial en `localStorage` cada vez que cambian. Al recargar la página, se leen otra vez.

### 4. Filtros y paginación
- **Filtros:** lo que el usuario escribe vive en un estado *borrador* dentro de `Filtros`. Solo al presionar Filtrar se copia a los filtros del contexto, y `filtrarEquipos()` recalcula la lista.
- **Paginación:** `Equipos` guarda `paginaActual` con `useState`. `paginar()` corta la lista filtrada con `slice()` para mostrar 10 equipos.

### 5. Préstamo y devolución
- `registrarPrestamo()`:
  - valida los datos
  - crea un registro con `crearPrestamo()` (copia de los datos del equipo y del colaborador, y fecha `new Date()`)
  - lo agrega al inicio del historial
  - cambia el equipo a Prestado
- `registrarDevolucion()`:
  - completa el préstamo activo con la fecha de devolución, la condición y si llegó en las mismas condiciones
  - cambia el estado del equipo según esa casilla

### 6. Historial y Excel
- `utils/historial.js` define las 13 columnas **una sola vez**. Las usan tanto `TablaHistorial` como `exportarHistorialExcel()`, así la tabla y el Excel siempre coinciden.
- SheetJS se carga con `import()` dinámico, solo cuando se presiona "Exportar a Excel".

## Conceptos evaluados y dónde están

| Concepto | Dónde verlo |
|---|---|
| Funciones propias | `src/utils/*.js` (filtrar, paginar, validar, contar, calcular duración…) |
| Arreglos y objetos | `public/data/*.json`, `src/data/*.js`, historial en el contexto |
| Eventos | `onClick` (Ver detalle, paginación, tema), `onChange` y `onSubmit` (filtros y formularios), `keydown` (Esc en el sidebar), `onError` (foto) |
| Promesas | `services/equiposService.js` (fetch, `Promise.all`), `services/correoService.js` (EmailJS), `utils/exportarExcel.js` (`import()`) |
| Componentes y props | `src/components/**` (por ejemplo `TarjetaEquipo`, `Paginacion`, `CampoFormulario`, `TarjetaStack`) |
| Ciclo de vida | `useEffect` con limpieza: carga inicial (`AbortController`), sidebar (listener de Esc), `RelojActual` (`setInterval`) |
| `useState` | página actual, borrador de filtros, formularios, mensajes |
| `useEffect` para cargar información | carga inicial en `PrestamosProvider.jsx` |
| `useContext` | `PrestamosContext` + hook `usePrestamos()` |

## Datos de ejemplo

- **Inventario:** 60 equipos de ejemplo (Portátiles 12, Tablets 6, Proyectores 5, Periféricos 12, Audio y video 8, Redes 5, Accesorios 12). Seriales con formato `TI-<prefijo>-0000`.
- **Colaboradores:** 11 personas de ejemplo con documento, cargo y área inventados. Los correos usan el dominio reservado `.example`, que nunca corresponde a una dirección real.
- **Testimonios:** 5 testimonios ilustrativos, marcados con la etiqueta "Ejemplo".
- **Historial:** empieza vacío. Los préstamos se registran en vivo desde la app.

## Trabajo futuro

- **Inicio de sesión** para técnicos de TI, con roles (administrador / técnico) y registro de quién hizo cada préstamo.
- **Backend y base de datos** (por ejemplo Node.js + Express + PostgreSQL o MongoDB). Así el inventario y el historial se comparten entre varios equipos y no dependen del navegador.
- **Firma o confirmación** del colaborador al recibir el equipo.
- **Alertas** de préstamos vencidos y **notificaciones por correo** al colaborador.
- **Fotos reales** de cada equipo y lectura del serial con código de barras o QR.
- **Pruebas automatizadas** (Vitest + Testing Library).

## Créditos

- Logos de tecnologías: [Devicon](https://devicon.dev) (licencia MIT).
- Ilustraciones de categorías e íconos genéricos: elaboración propia (SVG).
- [SheetJS Community Edition](https://sheetjs.com) (licencia Apache 2.0).
- Desarrollado con apoyo de Claude (chat) para planificación y Claude Code para programación asistida.
