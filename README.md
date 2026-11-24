# PrestaTech · Préstamo de equipos de TI

Proyecto final de **Interfaces con React** – Institución Universitaria Antonio José Camacho (UNIAJC), 2026.
Autor: **Juan David Paz Trochez** · Línea de desarrollo: **3.4 Equipos de computación y accesorios**.

🔗 **Demo en vivo:** [prestamos-equipos-react.vercel.app](https://prestamos-equipos-react.vercel.app)

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
| `/` | **Presentación y biografía** | Saludo directo arriba de todo ("Hola, soy Juan David 👋", técnico de soporte TI y desarrollador). Banner con título, foto, descripción del perfil, botones "Ver equipos" y "Contacto", biografía (3 elementos) y redes (GitHub y correo). |
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
  - **Atajo:** las tarjetas de Disponibles, Prestados y En mantenimiento son botones que filtran por ese estado (vuelven a la página 1 y actualizan el selector "Estado"). Un segundo clic en la tarjeta activa quita ese filtro.
- **Préstamo** (equipo Disponible): se elige el colaborador y se escribe la condición de entrega. La fecha y la hora son automáticas. El equipo pasa a **Prestado** y su ubicación cambia al área del colaborador (por ejemplo "Área de Educación Física – José Luis Oviedo Camacho").
- **Devolución** (equipo Prestado):
  - Se escribe la condición de devolución y se marca si llegó en las mismas condiciones.
  - Si llegó igual, el equipo queda **Disponible** y vuelve a su ubicación original; si no, queda **En mantenimiento** en "Oficina TI – Mesa de reparación".
- **Marcar como reparado** (equipo En mantenimiento): vuelve a **Disponible** y a su ubicación original.
- **Historial** con 16 columnas: serial, equipo, categoría, colaborador, cargo, área, fecha y hora de préstamo, fecha y hora de devolución, condición de entrega, condición de devolución, ¿mismas condiciones?, duración calculada, ubicación original, ubicación durante el préstamo, ubicación tras la devolución y estado (Activo / Devuelto).
- **Mini dashboard** en Préstamos: gráficas de barras de préstamos por categoría y de los 5 equipos más prestados.
- **Exportar a Excel** (.xlsx) con las mismas columnas de la tabla.
- **Restablecer datos de ejemplo**, con confirmación previa.
- **Formulario de contacto validado:**
  - Nombre y apellidos: solo letras, máximo 20 caracteres.
  - Correo: validado con regex.
  - Teléfono: solo números.
  - Todos los campos son obligatorios.
- **Animaciones con Framer Motion:** transiciones entre vistas, entrada al hacer scroll, contadores animados, tarjetas que entran escalonadas y avisos flotantes (toasts) al registrar préstamo, devolución, reparación y al exportar a Excel.
- **Skeletons** (tarjetas esqueleto) mientras cargan los equipos.
- **Tema oscuro / claro** ("Tech oscuro con neón": vidrio esmerilado y degradado violeta → cian), que se guarda en el navegador.
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
| **Framer Motion** | Animaciones: transiciones entre vistas, scroll, contadores, toasts y barras del dashboard. |
| **CSS propio con variables** | Estilos responsive, vidrio esmerilado (`backdrop-filter`) y temas oscuro/claro, sin frameworks. Tipografías Inter y Space Grotesk (Google Fonts). |
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
│       ├── equipos/              # 59 fotos reales optimizadas (nombre = serial, ej. ti-pt-0001.jpg)
│       ├── categorias/           # 1 ilustración SVG por categoría (respaldo si falta la foto)
│       ├── stack/                # logos e íconos de la vista Stack
│       ├── perfil.jpg            # foto del autor (Inicio)
│       └── perfil-placeholder.svg  # respaldo si la foto no carga
├── src/
│   ├── main.jsx                  # Punto de entrada: BrowserRouter + MotionConfig + proveedores
│   ├── App.jsx                   # Rutas de las vistas
│   ├── context/
│   │   ├── PrestamosContext.js   # createContext + hook usePrestamos()
│   │   ├── PrestamosProvider.jsx # Estado global y acciones
│   │   ├── NotificacionesContext.js   # contexto de avisos + hook useNotificaciones()
│   │   └── NotificacionesProvider.jsx # lista de toasts y función notificar()
│   ├── services/
│   │   ├── equiposService.js     # fetch de equipos y colaboradores
│   │   └── correoService.js      # envío con EmailJS
│   ├── utils/                    # Funciones propias (lógica sin interfaz)
│   │   ├── equipos.js            # filtrar, normalizar texto, paginar, contar por estado
│   │   ├── prestamos.js          # crear préstamo, validar condición, fechas, duración
│   │   ├── historial.js          # columnas del historial (tabla y Excel) y datos del dashboard
│   │   ├── exportarExcel.js      # generar el .xlsx con SheetJS
│   │   ├── validaciones.js       # validaciones del formulario de contacto (regex)
│   │   ├── almacenamiento.js     # leer/guardar en localStorage
│   │   └── texto.js              # plurales
│   ├── data/                     # Contenido fijo (arreglos de objetos)
│   │   ├── perfil.js  stack.js  testimonios.js  propuesta.js  navegacion.js
│   ├── components/
│   │   ├── layout/               # Layout, Header, Navbar, Footer, BotonTema
│   │   ├── animaciones/          # Revelar (entrada al hacer scroll), NumeroAnimado (contador)
│   │   ├── comunes/              # TituloPagina, Cargando, BadgeEstado, CampoFormulario, RedesSociales, Notificaciones
│   │   ├── equipos/              # TarjetaEquipo, ListaEquipos, ListaSkeleton, Paginacion, Filtros, ContadorEstados, SidebarDetalle
│   │   ├── prestamos/            # AccionesEquipo, FormularioPrestamo, FormularioDevolucion, RelojActual, TablaHistorial, GraficaBarras
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
3. Mientras tanto, `cargando` es `true` y las vistas muestran "Cargando…" (en Equipos, con tarjetas esqueleto).
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
- `equipos.json` trae el estado inicial: los 60 equipos arrancan **Disponibles**, cada uno en su ubicación de bodega u oficina de TI. Los préstamos, devoluciones y mantenimientos se registran en vivo desde la app.
- Los cambios se guardan aparte, en un objeto `{ idEquipo: estado }`. La función `aplicarEstadosGuardados()` los combina con el JSON.
- Las ubicaciones que cambian se guardan en otro objeto, `{ idEquipo: { actual, original } }`. Se guarda la **original** para poder restaurarla; al volver a ella, la entrada se borra y el equipo usa otra vez la ubicación del JSON.
- Unos `useEffect` guardan esos objetos y el historial en `localStorage` cada vez que cambian. Al recargar la página, se leen otra vez.
- El equipo sigue teniendo los mismos 8 atributos: solo cambian los valores de `estado` y `ubicacion`.

### 4. Filtros y paginación
- **Filtros:** lo que el usuario escribe vive en un estado *borrador* dentro de `Filtros`. Solo al presionar Filtrar se copia a los filtros del contexto, y `filtrarEquipos()` recalcula la lista.
- **Paginación:** `Equipos` guarda `paginaActual` con `useState`. `paginar()` corta la lista filtrada con `slice()` para mostrar 10 equipos.

### 5. Préstamo y devolución
- `registrarPrestamo()`:
  - valida los datos
  - crea un registro con `crearPrestamo()` (copia de los datos del equipo y del colaborador, y fecha `new Date()`)
  - lo agrega al inicio del historial
  - cambia el equipo a Prestado y lo mueve al área del colaborador (`ubicacionColaborador()`)
- `registrarDevolucion()`:
  - completa el préstamo activo con la fecha de devolución, la condición y si llegó en las mismas condiciones
  - cambia el estado del equipo según esa casilla y lo mueve: a su ubicación original (buen estado) o a la mesa de reparación (`UBICACION_REPARACION`)
- `marcarReparado()`: el equipo vuelve a Disponible y a su ubicación original.
- Cada préstamo guarda tres ubicaciones (`ubicacionOriginal`, `ubicacionPrestamo`, `ubicacionDevolucion`) que se ven en la tabla y en el Excel.

### 6. Historial y Excel
- `utils/historial.js` define las 16 columnas **una sola vez**. Las usan tanto `TablaHistorial` como `exportarHistorialExcel()`, así la tabla y el Excel siempre coinciden.
- SheetJS se carga con `import()` dinámico, solo cuando se presiona "Exportar a Excel".
- El dashboard usa `contarAgrupado()` (con `reduce`) para calcular los préstamos por categoría y el ranking de equipos. Las barras son HTML + CSS; su ancho es el valor dividido entre el máximo.

### 7. Animaciones y avisos
- `Layout` envuelve la vista actual en `AnimatePresence` con `key={pathname}`: al cambiar de ruta, la vista anterior sale y la nueva entra.
- `Revelar` usa `whileInView` para animar las secciones cuando aparecen al hacer scroll.
- `NumeroAnimado` usa `animate()` de Framer Motion dentro de un `useEffect`; la limpieza detiene la animación.
- `NotificacionesProvider` guarda los avisos en un arreglo. Cada aviso se cierra solo con un `setTimeout` (limpiado con `clearTimeout`).
- `MotionConfig reducedMotion="user"` respeta la preferencia de "reducir movimiento" del sistema.

## Conceptos evaluados y dónde están

| Concepto | Dónde verlo |
|---|---|
| Funciones propias | `src/utils/*.js` (filtrar, paginar, validar, contar, calcular duración…) |
| Arreglos y objetos | `public/data/*.json`, `src/data/*.js`, historial en el contexto |
| Eventos | `onClick` (Ver detalle, paginación, tema), `onChange` y `onSubmit` (filtros y formularios), `keydown` (Esc en el sidebar), `onError` (foto) |
| Promesas | `services/equiposService.js` (fetch, `Promise.all`), `services/correoService.js` (EmailJS), `utils/exportarExcel.js` (`import()`) |
| Componentes y props | `src/components/**` (por ejemplo `TarjetaEquipo`, `Paginacion`, `CampoFormulario`, `TarjetaStack`) |
| Ciclo de vida | `useEffect` con limpieza: carga inicial (`AbortController`), sidebar (listener de Esc), `RelojActual` (`setInterval`), `NumeroAnimado` (detener animación), avisos (`setTimeout`) |
| `useState` | página actual, borrador de filtros, formularios, mensajes |
| `useEffect` para cargar información | carga inicial en `PrestamosProvider.jsx` |
| `useContext` | `PrestamosContext` + hook `usePrestamos()`; `NotificacionesContext` + hook `useNotificaciones()` |

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
- **Lectura del serial** con código de barras o QR.
- **Pruebas automatizadas** (Vitest + Testing Library).

## Créditos

- Logos de tecnologías: [Devicon](https://devicon.dev) (licencia MIT), incluido el de Framer Motion.
- Animaciones: [Framer Motion](https://motion.dev) (licencia MIT).
- Tipografías: [Inter](https://fonts.google.com/specimen/Inter) y [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) (SIL Open Font License).
- Ilustraciones de categorías e íconos genéricos: elaboración propia (SVG).
- Fotos de los equipos: Wikimedia Commons, con licencias libres. Detalle en [Créditos de imágenes](#créditos-de-imágenes).
- [SheetJS Community Edition](https://sheetjs.com) (licencia Apache 2.0).
- Desarrollado con apoyo de Claude (chat) para planificación y Claude Code para programación asistida.

## Créditos de imágenes

Las fotos de los equipos son **fotos reales con licencia libre** tomadas de [Wikimedia Commons](https://commons.wikimedia.org). Cuando fue posible se eligió el **modelo exacto** (por ejemplo ThinkPad E14, Logitech M185, Shure PG58, Canon EOS Rebel T7, Galaxy Tab S6 Lite, Wacom Intuos S, SanDisk Ultra Flair, WD Elements, MacBook Air M2). Si no, se usó una foto de la misma marca o del mismo tipo de producto.

- Se descargaron con un ancho de 800 px y se optimizaron con FFmpeg a **800 × 520 px en JPG (máximo 79 KB cada una)**. Así quedan en la proporción de la tarjeta: la foto completa va centrada sobre una versión difuminada de sí misma, para no recortar el producto.
- El archivo se llama como el serial del equipo (`public/img/equipos/ti-pt-0001.jpg`) y la ruta está en el atributo `imagen` de `equipos.json`.
- **Tablet Lenovo Tab P11 (TI-TB-0006):** no se encontró una foto con licencia libre adecuada, así que usa la ilustración SVG de su categoría.
- **Respaldo:** si una foto no carga, el evento `onError` la cambia por la ilustración SVG de la categoría (`usarImagenRespaldo()` en `utils/equipos.js`).
- **Licencias:** CC0 y dominio público no exigen atribución. Las CC BY y CC BY-SA exigen dar crédito al autor y enlazar la licencia, como se hace en esta tabla. Las CC BY-SA además piden compartir con la misma licencia las versiones modificadas: las fotos optimizadas de esta carpeta se comparten bajo la misma licencia de su original.

| Serial | Equipo | Foto (Wikimedia Commons) | Autor | Licencia |
|---|---|---|---|---|
| TI-PT-0001 | Portátil Lenovo ThinkPad E14 Gen 5 | [Lenovo ThinkPad E14 G7 14 WUXGA.jpg](https://commons.wikimedia.org/wiki/File:Lenovo_ThinkPad_E14_G7_14_WUXGA.jpg) | Rakoon | [CC0](http://creativecommons.org/publicdomain/zero/1.0/deed.en) |
| TI-TB-0001 | Tablet Samsung Galaxy Tab A9+ | [Samsung galaxy tab A9+ Bagian depan.jpg](https://commons.wikimedia.org/wiki/File:Samsung_galaxy_tab_A9%2B_Bagian_depan.jpg) | MobilGalantsuper1999PS | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) |
| TI-PY-0001 | Proyector Epson PowerLite X49 | [EPSON CH-TW5400 LCD PROJECTOR.jpg](https://commons.wikimedia.org/wiki/File:EPSON_CH-TW5400_LCD_PROJECTOR.jpg) | Dinkun Chen | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| TI-PF-0001 | Mouse inalámbrico Logitech M185 | [Logitech M185 mouse HS05.jpg](https://commons.wikimedia.org/wiki/File:Logitech_M185_mouse_HS05.jpg) | Hayden Schiff | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) |
| TI-AV-0001 | Parlante Bluetooth JBL Flip 6 | [Głośnik JBL Flip 3.jpg](https://commons.wikimedia.org/wiki/File:G%C5%82o%C5%9Bnik_JBL_Flip_3.jpg) | Przemek Pietrak | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| TI-RD-0001 | Router TP-Link Archer C6 | [TP-LINK Archer C9 AC1900Gigabit無線AP (23494189080).jpg](https://commons.wikimedia.org/wiki/File:TP-LINK_Archer_C9_AC1900Gigabit%E7%84%A1%E7%B7%9AAP_(23494189080).jpg) | Kenming Wang from Taipei, Taiwan | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| TI-AC-0001 | Cargador USB-C Lenovo 65 W | [Apple 96W USB Type-C Power Adapter for new 16 inch MacBook Pro (49165128252).jpg](https://commons.wikimedia.org/wiki/File:Apple_96W_USB_Type-C_Power_Adapter_for_new_16_inch_MacBook_Pro_(49165128252).jpg) | Tony Webster from Minneapolis, Minnesota, United States | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| TI-PT-0002 | Portátil HP ProBook 440 G10 | [IMG-20190927-WA0014.jpg](https://commons.wikimedia.org/wiki/File:IMG-20190927-WA0014.jpg) | Allan Kibe | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| TI-TB-0002 | iPad 10.ª generación | [Ipadtenthgen.jpg](https://commons.wikimedia.org/wiki/File:Ipadtenthgen.jpg) | Wiikiipediia | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| TI-PY-0002 | Proyector BenQ MS560 | [BenQ DLP projector MP515 20101213.jpg](https://commons.wikimedia.org/wiki/File:BenQ_DLP_projector_MP515_20101213.jpg) | Aivar Luist | Public domain |
| TI-PF-0002 | Teclado USB Genius KB-117 | [KYE Systems Genius KB-06XE-0534.jpg](https://commons.wikimedia.org/wiki/File:KYE_Systems_Genius_KB-06XE-0534.jpg) | Raimond Spekking | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| TI-AV-0002 | Micrófono inalámbrico Shure BLX24/PG58 | [Shure PG58 with PG2 wireless microphone - on.jpg](https://commons.wikimedia.org/wiki/File:Shure_PG58_with_PG2_wireless_microphone_-_on.jpg) | Christian Dahlqvist | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| TI-RD-0002 | Switch Cisco CBS110 de 16 puertos | [Netgear ProSafe 16-Port 10-Gigabit Smart Managed Switch XS716T.jpg](https://commons.wikimedia.org/wiki/File:Netgear_ProSafe_16-Port_10-Gigabit_Smart_Managed_Switch_XS716T.jpg) | Sergklim | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| TI-AC-0002 | Cargador HP 65 W punta azul | [Notebook-Computer-AC-Adapter.jpg](https://commons.wikimedia.org/wiki/File:Notebook-Computer-AC-Adapter.jpg) | Evan-Amos | Public domain |
| TI-PT-0003 | Portátil Dell Latitude 3440 | [Dell Latitude E6540.jpg](https://commons.wikimedia.org/wiki/File:Dell_Latitude_E6540.jpg) | PolarisLakewell | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| TI-TB-0003 | Tablet Lenovo Tab M10 (3.ª gen.) | [Lenovo Tab M10 FHD Plus (2026).jpg](https://commons.wikimedia.org/wiki/File:Lenovo_Tab_M10_FHD_Plus_(2026).jpg) | Gpkp | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| TI-PY-0003 | Proyector ViewSonic PA503W | [Benq Projector 03.jpg](https://commons.wikimedia.org/wiki/File:Benq_Projector_03.jpg) | Hp.Baumeler | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| TI-PF-0003 | Cámara web Logitech C920 | [Webcam (Logitech c922).jpg](https://commons.wikimedia.org/wiki/File:Webcam_(Logitech_c922).jpg) | Zsinytwiki | [CC0](http://creativecommons.org/publicdomain/zero/1.0/deed.en) |
| TI-AV-0003 | Diadema HyperX Cloud Stinger | [Headphones with Microphone.jpg](https://commons.wikimedia.org/wiki/File:Headphones_with_Microphone.jpg) | Zephyris at English Wikipedia | [CC BY-SA 3.0](http://creativecommons.org/licenses/by-sa/3.0/) |
| TI-RD-0003 | Punto de acceso Ubiquiti UniFi U6 Lite | [Ubiquiti Unifi AP.jpg](https://commons.wikimedia.org/wiki/File:Ubiquiti_Unifi_AP.jpg) | L3u | [CC0](http://creativecommons.org/publicdomain/zero/1.0/deed.en) |
| TI-AC-0003 | Adaptador USB-C a HDMI Ugreen | [USB-C Digital AV Multiport Adapter.jpeg](https://commons.wikimedia.org/wiki/File:USB-C_Digital_AV_Multiport_Adapter.jpeg) | Thefreeencyclopedia1 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| TI-PT-0004 | Portátil Acer Aspire 5 | [Acer Aspire One A150 - open.jpg](https://commons.wikimedia.org/wiki/File:Acer_Aspire_One_A150_-_open.jpg) | Ajgelado | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| TI-TB-0004 | Tablet Samsung Galaxy Tab S6 Lite | [Samsung Galaxy Tab S6.png](https://commons.wikimedia.org/wiki/File:Samsung_Galaxy_Tab_S6.png) | AnVuong1222004 (11) | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| TI-PY-0004 | Proyector Epson PowerLite E20 | [Epson EB-U04-5357.jpg](https://commons.wikimedia.org/wiki/File:Epson_EB-U04-5357.jpg) | Raimond Spekking | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| TI-PF-0004 | Combo teclado y mouse Logitech MK270 | [Computerhardware und Peripherie 20240203 HOF07063 RAW-Export.png](https://commons.wikimedia.org/wiki/File:Computerhardware_und_Peripherie_20240203_HOF07063_RAW-Export.png) | PantheraLeo1359531 | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) |
| TI-AV-0004 | Cámara Canon EOS Rebel T7 | [The Canon EOS Rebel T7 (2000D) being held by a lake.jpg](https://commons.wikimedia.org/wiki/File:The_Canon_EOS_Rebel_T7_(2000D)_being_held_by_a_lake.jpg) | Greyfiveys | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| TI-RD-0004 | Switch TP-Link TL-SG108 de 8 puertos | [TP-Link LS1005G.jpg](https://commons.wikimedia.org/wiki/File:TP-Link_LS1005G.jpg) | Piotr Doroszewski | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) |
| TI-AC-0004 | Adaptador HDMI a VGA Ugreen | [HDMI轉VGA轉接頭.jpg](https://commons.wikimedia.org/wiki/File:HDMI%E8%BD%89VGA%E8%BD%89%E6%8E%A5%E9%A0%AD.jpg) | 7blackrats | [CC0](http://creativecommons.org/publicdomain/zero/1.0/deed.en) |
| TI-PT-0005 | Portátil Asus VivoBook 15 | [Asus Vivobook 15.jpg](https://commons.wikimedia.org/wiki/File:Asus_Vivobook_15.jpg) | LeopardWin | [CC0](http://creativecommons.org/publicdomain/zero/1.0/deed.en) |
| TI-TB-0005 | Tablet Xiaomi Redmi Pad SE | [Redmi Pad Pro VHU4746JP.jpg](https://commons.wikimedia.org/wiki/File:Redmi_Pad_Pro_VHU4746JP.jpg) | Kyu3a | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| TI-PY-0005 | Proyector Optoma S343 | [InFocus IN34.jpg](https://commons.wikimedia.org/wiki/File:InFocus_IN34.jpg) | Dave Pape | Public domain |
| TI-PF-0005 | Monitor Samsung 24" S3 | [Samsung DeX dock with S8, plugged into monitor.jpg](https://commons.wikimedia.org/wiki/File:Samsung_DeX_dock_with_S8,_plugged_into_monitor.jpg) | Maurizio Pesce from Milan, Italia | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| TI-AV-0005 | Diadema USB Logitech H390 | [Logitech PC Headset 960 USB A-00011 (24181923271).jpg](https://commons.wikimedia.org/wiki/File:Logitech_PC_Headset_960_USB_A-00011_(24181923271).jpg) | I G | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) |
| TI-RD-0005 | Kit de ponchadora y probador de red | [Cable stripper, cable tester (RJ45, RJ11), LSA-Tool and crimping tool.jpg](https://commons.wikimedia.org/wiki/File:Cable_stripper,_cable_tester_(RJ45,_RJ11),_LSA-Tool_and_crimping_tool.jpg) | www.heimnetzwerke.net | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) |
| TI-AC-0005 | Hub USB-C 7 en 1 Anker | [Anker PowerExpand 8-in-1-2188.jpg](https://commons.wikimedia.org/wiki/File:Anker_PowerExpand_8-in-1-2188.jpg) | Raimond Spekking | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| TI-PT-0006 | Portátil Lenovo IdeaPad 3 | [Lenovo IdeaPad 110.jpg](https://commons.wikimedia.org/wiki/File:Lenovo_IdeaPad_110.jpg) | EEIM | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| TI-PF-0006 | Mouse USB Genius DX-120 | [HP Mouse M-U0031-O-1680.jpg](https://commons.wikimedia.org/wiki/File:HP_Mouse_M-U0031-O-1680.jpg) | Raimond Spekking | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| TI-AV-0006 | Parlantes Logitech Z313 | [Logitech-usb-speakers.jpg](https://commons.wikimedia.org/wiki/File:Logitech-usb-speakers.jpg) | Evan-Amos | Public domain |
| TI-AC-0006 | Extensión eléctrica Belkin de 6 tomas | [(20241007) APC power strip.jpg](https://commons.wikimedia.org/wiki/File:(20241007)_APC_power_strip.jpg) | Roy Zuo | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| TI-PT-0007 | Portátil HP 250 G9 | [HP Laptop Notebook.png](https://commons.wikimedia.org/wiki/File:HP_Laptop_Notebook.png) | Walkercaki12 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| TI-PF-0007 | Teclado inalámbrico Logitech K380 | [Logitech K380 CJK Keyboard.jpg](https://commons.wikimedia.org/wiki/File:Logitech_K380_CJK_Keyboard.jpg) | Cangjie6 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| TI-AV-0007 | Micrófono de solapa Boya BY-M1 | [GA100 Mic.png](https://commons.wikimedia.org/wiki/File:GA100_Mic.png) | 多多123 | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) |
| TI-AC-0007 | Presentador con puntero láser Logitech R400 | [August LP205R Wireless Presenter.jpg](https://commons.wikimedia.org/wiki/File:August_LP205R_Wireless_Presenter.jpg) | Katie Chan | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| TI-PT-0008 | Portátil Dell Vostro 3520 | [Dell Vostro 14 5000 Series Laptop.jpg](https://commons.wikimedia.org/wiki/File:Dell_Vostro_14_5000_Series_Laptop.jpg) | Vostrouser | [CC0](http://creativecommons.org/publicdomain/zero/1.0/deed.en) |
| TI-PF-0008 | Cámara web Logitech C270 | [Fancy webcam on computer screen.jpg](https://commons.wikimedia.org/wiki/File:Fancy_webcam_on_computer_screen.jpg) | Peter Placzek | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| TI-AV-0008 | Micrófono USB Fifine K669B | [Rode NT-USB.jpg](https://commons.wikimedia.org/wiki/File:Rode_NT-USB.jpg) | Nicolas Rück (WMDE) | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| TI-AC-0008 | Presentador con puntero láser Targus AMP13 | [Inateck WP1002 Wireless Presenter (16593914759).jpg](https://commons.wikimedia.org/wiki/File:Inateck_WP1002_Wireless_Presenter_(16593914759).jpg) | Mack Male from Edmonton, AB, Canada | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) |
| TI-PT-0009 | Portátil Lenovo ThinkPad L14 Gen 4 | [Lenovo ThinkPad T470.jpg](https://commons.wikimedia.org/wiki/File:Lenovo_ThinkPad_T470.jpg) | NickW1129 | [CC0](http://creativecommons.org/publicdomain/zero/1.0/deed.en) |
| TI-PF-0009 | Monitor LG 22" 22MR410 | [Monitor lcd lg de frente.jpeg](https://commons.wikimedia.org/wiki/File:Monitor_lcd_lg_de_frente.jpeg) | EEIM | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |
| TI-AC-0009 | Memoria USB Kingston DataTraveler 64 GB | [Kingston Technology DataTraveler G4 USB flash drive USB 3.0 32 Gb.jpg](https://commons.wikimedia.org/wiki/File:Kingston_Technology_DataTraveler_G4_USB_flash_drive_USB_3.0_32_Gb.jpg) | Dmitry Makeev | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| TI-PT-0010 | MacBook Air 13" M2 | [M2 Macbook Air Starlight model.jpg](https://commons.wikimedia.org/wiki/File:M2_Macbook_Air_Starlight_model.jpg) | KKPCW（Kyu3） | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| TI-PF-0010 | Lector de código de barras Honeywell Voyager 1250g | [Honeywell 4600g-8665.jpg](https://commons.wikimedia.org/wiki/File:Honeywell_4600g-8665.jpg) | Raimond Spekking | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| TI-AC-0010 | Memoria USB SanDisk Ultra Flair 32 GB | [SanDisk Ultra Fair USB 3.0.jpg](https://commons.wikimedia.org/wiki/File:SanDisk_Ultra_Fair_USB_3.0.jpg) | Raspberry3783 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| TI-PT-0011 | Portátil HP EliteBook 840 G9 | [HP EliteBook 840 G8.png](https://commons.wikimedia.org/wiki/File:HP_EliteBook_840_G8.png) | Infinatious | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| TI-PF-0011 | Tableta digitalizadora Wacom Intuos S | [Wacom Intuos S.jpg](https://commons.wikimedia.org/wiki/File:Wacom_Intuos_S.jpg) | Smitop | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| TI-AC-0011 | Disco externo Seagate One Touch 1 TB | [Seagate SRD0NF1 portable hard drive HS3.jpg](https://commons.wikimedia.org/wiki/File:Seagate_SRD0NF1_portable_hard_drive_HS3.jpg) | Hayden Schiff | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) |
| TI-PT-0012 | Portátil Acer TravelMate P2 | [Acer TravelMate P253-M-32344G50Maks-93688.jpg](https://commons.wikimedia.org/wiki/File:Acer_TravelMate_P253-M-32344G50Maks-93688.jpg) | Raimond Spekking | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| TI-PF-0012 | Base refrigerante para portátil Klip Xtreme | [Laptop cooler.JPG](https://commons.wikimedia.org/wiki/File:Laptop_cooler.JPG) | User:Littletung | [CC BY-SA 3.0](http://creativecommons.org/licenses/by-sa/3.0/) |
| TI-AC-0012 | Disco externo WD Elements 2 TB | [2TB WD Elements Portable 1 2016-07-03.jpg](https://commons.wikimedia.org/wiki/File:2TB_WD_Elements_Portable_1_2016-07-03.jpg) | FASTILY | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
