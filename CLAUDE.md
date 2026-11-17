# Proyecto Final – Interfaces con React (UNIAJC 2026)

Autor: Juan David Paz Trochez
Línea de desarrollo elegida: **3.4 Equipos de computación y accesorios**

## Contexto
Somos el **equipo de soporte TI de una empresa (colegio u oficina)** y prestamos equipos a nuestros colaboradores.
El proyecto **digitaliza la hoja de papel de préstamos**, donde se anotaba: serial, nombre y modelo del equipo, fecha y hora del préstamo y nombre completo de quien lo recibe.
Juan David Paz Trochez es el **técnico de TI que registra los préstamos**. Nombre del sitio: **PrestaTech**. El sitio también es su portafolio (vistas de Inicio, Stack y Contacto).
En la vista de "proyectos" del PDF, cada elemento es un equipo del inventario de TI.

Solo es un front-end: **sin login ni backend**. Los estados de los equipos y el historial se guardan en `localStorage` del navegador. Login y backend quedan como **trabajo futuro** en el README.

Requisitos completos en `docs/requisitos.pdf`. Ante cualquier duda, ese PDF manda.

## Stack
- Vite + React (JavaScript, sin TypeScript)
- react-router-dom: 5 vistas obligatorias + 1 vista extra ("Préstamos")
- CSS propio con variables (tema claro/oscuro), diseño responsive
- Datos en `public/data/equipos.json` y `public/data/colaboradores.json`, cargados con fetch
- localStorage para estados de equipos e historial de préstamos
- EmailJS para el formulario de contacto (claves en `.env`, plantilla en `.env.example`)
- SheetJS instalado desde su CDN oficial (`npm i https://cdn.sheetjs.com/xlsx-0.20.3/xlsx-0.20.3.tgz`), **no** el paquete `xlsx` del registro de npm, para exportar el historial a Excel
- Despliegue en Vercel (con `vercel.json` para las rutas del router)

## Reglas de trabajo
- Código claro y comentado en español: Juan debe poder explicar cada parte en la sustentación.
- Una vista o funcionalidad por paso, con un commit al terminar cada una (el avance vale 10 puntos). Sin líneas `Co-Authored-By` en los commits.
- Primero todo lo obligatorio del PDF; después lo extra (préstamos, historial, Excel).
- No inventar experiencia laboral ni testimonios que parezcan reales. Si un dato es de ejemplo, marcarlo como tal (colaboradores, testimonios, inventario).
- Antes de pasar a la siguiente vista, verificar contra el checklist.

## Lo que se evalúa (debe verse en el código)
- [x] Funciones propias en JS: `utils/equipos.js` (filtrar, normalizar texto, paginar, contar por estado), `utils/validaciones.js`, `utils/prestamos.js` (crear préstamo, calcular duración, formatear fecha), `utils/historial.js`, `utils/exportarExcel.js`
- [x] Arreglos y objetos: equipos, colaboradores, historial, testimonios, experiencias, stack, propuesta, navegación
- [x] Gestión de eventos: onClick (ver detalle, paginación, tema, exportar), onChange (filtros, formularios), onSubmit (filtros, contacto, préstamo, devolución), onError (foto), keydown (Esc)
- [x] Promesas: fetch con async/await, Promise.all (equipos + colaboradores), envío con EmailJS, import() dinámico de SheetJS, new Promise con setTimeout
- [x] Componentes y props (TarjetaEquipo, Paginacion, Filtros, SidebarDetalle, CampoFormulario, TarjetaStack, Timeline…)
- [x] Ciclo de vida: useEffect con limpieza (AbortController en la carga, listener de Esc, setInterval del reloj, cerrar sidebar al salir de la vista)
- [x] useState (página actual, borrador de filtros, formularios, mensajes)
- [x] useEffect para cargar información (carga inicial) y para guardar en localStorage
- [x] useContext: `PrestamosContext` con equipos, equipo seleccionado, filtros, tema, colaboradores e historial

## Modelo de equipo (exactamente 8 atributos + id)
`id, nombre, imagen, categoria, marca, estado, especificaciones, ubicacion, serial`
- Tarjeta (5 obligatorios): imagen, nombre, categoría, marca, estado (badge de color)
- Sidebar "Ver detalle": los 8 atributos
- 60 equipos: Portátiles 12, Tablets 6, Proyectores 5, Periféricos 12, Audio y video 8, Redes 5, Accesorios 12
- Accesorios: cargadores, adaptadores HDMI/USB-C, extensiones, punteros láser, memorias USB, discos externos
- Estados: Disponible, Prestado, En mantenimiento. En el JSON **ningún equipo arranca como Prestado**: la mayoría Disponible y unos pocos En mantenimiento. Los préstamos solo se registran en vivo desde la app.
- serial: `TI-<prefijo>-<4 dígitos>` (ej. `TI-PT-0012`). Prefijos: PT, TB, PY, PF, AV, RD, AC
- ubicacion: bodega u oficina de TI (ej. "Bodega TI – Estante A2")
- imagen: una ilustración SVG por categoría en `public/img/categorias/` (reemplazable por fotos cambiando la ruta en el JSON)

## Modelo de colaborador (`public/data/colaboradores.json`, datos de ejemplo)
`id, nombreCompleto, documento, correo, cargo, area`
- 11 colaboradores: Diego Alejandro Cano Muñoz, Andrés Felipe Colonia Ocampo, Juan José Cruz Serna, Carlos Esneider Espitia Paz, Kenneth Ibarra Velasco, Mauricio López Tamayo, Natalia Martínez Arévalo, Lizeth Tatiana Moreno Rosero, Carolina Muñoz Quintero, José Luis Oviedo Camacho, Deyby Alejandro Rodríguez Castillo
- Correo con dominio reservado `.example` (ej. `diego.cano@colegio-ejemplo.example`); documento, cargo y área inventados y variados (docentes, coordinación, administrativo, RR. HH., contabilidad)

## Préstamo y devolución (desde el sidebar, debajo de los 8 atributos)
- **Registrar préstamo** (solo si está Disponible): elegir colaborador, fecha y hora automáticas, "Condición de entrega" obligatoria → estado pasa a **Prestado**
- **Registrar devolución** (solo si está Prestado): fecha y hora automáticas, "Condición de devolución" obligatoria y casilla "¿Llegó en las mismas condiciones?" → Sí: **Disponible**; No: **En mantenimiento**
- **Marcar como reparado** (solo si está En mantenimiento) → vuelve a **Disponible**
- El historial **empieza vacío** (no hay préstamos de ejemplo)
- Todo desde `PrestamosContext`, persistido en localStorage (estados de equipos + historial)
- Es un formulario aparte del de Contacto

## Vistas y checklist

### 1. Presentación y biografía (`/`)
- [x] Header (logo o nombre opcional) + navbar hacia todas las vistas
- [x] Banner de presentación con título de la página
- [x] Imagen representativa del perfil + descripción (Juan, técnico de TI). Foto real pendiente: `public/img/perfil.jpg` (si no existe, se ve el placeholder)
- [x] 2 botones CTA: "Ver equipos" y "Contacto"
- [x] Biografía con 3 elementos: bachiller técnico (2022), Auxiliar de Soporte IT en el Colegio Colombo Británico (abr 2024 – abr 2025), Tecnología en Sistemas de Información UNIAJC (2023 – 2026)
- [x] 2 redes: GitHub (GojoSatorouXD) y correo. Sin LinkedIn, sin teléfono ni referencias
- [x] Footer con información de resumen (componente reutilizable)

### 2. Equipos (`/equipos`)
- [x] Título de la página
- [x] Lista en tarjetas con paginación de 10 por página; al inicio se cargan los 10 primeros
- [x] Botón "Ver detalle" en cada tarjeta que abre un sidebar con los 8 atributos (se cierra con ✕, Esc o clic en el fondo)
- [x] Filtros arriba: buscador de texto (nombre, marca, serial y especificaciones, sin distinguir mayúsculas ni tildes) + selector de categoría (el obligatorio del PDF, incluye Accesorios) + selector de estado; se combinan
- [x] Contador de disponibles / prestados / en mantenimiento sobre el inventario total
- [x] Botones "Filtrar" y "Limpiar filtros". Los filtros se aplican solo al presionar "Filtrar" o Enter en el buscador (no en vivo); "Limpiar" deja todo en blanco; ambos vuelven a la página 1
- [x] Estado de "Cargando…" y mensaje cuando no hay resultados

### 3. Stack tecnológico y estudios (`/stack`)
- [x] Título de la página
- [x] Sección "Stack implementado en este proyecto": React, Vite, react-router-dom, Context API, localStorage, SheetJS, EmailJS, CSS con variables
- [x] Sección "Stack del autor" en 2 grupos: Desarrollo (React, Node.js/Express, MongoDB, SQLite, Git/GitHub, Linux, Docker) y Soporte TI (GLPI, AnyDesk/TeamViewer, Windows, Microsoft 365). Logos de Devicon (MIT) + íconos genéricos propios
- [x] 2 herramientas de IA: Claude (chat) y Claude Code
- [x] Timeline con 3 experiencias: Auxiliar de Soporte IT en el Colegio Colombo Británico + "Desarrollador – Sistema de préstamos de equipos TI (UNIAJC)" + "Desarrollador – APA Interactivo, proyecto de grado (UNIAJC)" (los dos últimos marcados como proyectos académicos)
- [x] Estudios: Tecnología en Sistemas de Información, UNIAJC sede Norte (ago 2023 – dic 2026, en curso) y Bachiller Técnico en Mantenimiento de Hardware (2022)

### 4. Contacto / nuevo proyecto (`/contacto`) — como lo pide el PDF
- [x] Título de la página
- [x] Campos: nombre, apellidos, correo, teléfono, descripción (textarea)
- [x] Nombre y apellidos: solo letras (incluye tildes, ñ y espacios), máximo 20 caracteres
- [x] Correo: validación con regex
- [x] Teléfono: solo números (7 a 10 dígitos)
- [x] Todos los campos obligatorios, con mensajes de error visibles
- [x] Botón "Enviar email" y mensaje de agradecimiento al enviar (EmailJS; sin `.env` funciona en modo demo)
- [x] 5 testimonios inventados sobre los beneficios de PrestaTech (inventario, adiós al papel, quién tiene cada equipo, historial, Excel), cargos variados, con etiqueta "Ejemplo" visible

### 5. Propuesta de valor (`/propuesta`)
- [x] Título de la página
- [x] Sección principal: **antes** (hoja de papel: sin trazabilidad, letra ilegible, equipos sin ubicar, sin condición registrada) vs **después** (registro digital, estados claros, historial, exportación a Excel)
- [x] Sección secundaria: beneficios para la empresa y lo que aporta Juan (soporte TI + desarrollo)
- [x] Footer

### 6. Préstamos (`/prestamos`) — vista extra
- [x] Título de la página y enlace en el navbar
- [x] Tabla del historial: serial, equipo, categoría, colaborador, cargo, área, fecha y hora de préstamo, fecha y hora de devolución, condición de entrega, condición de devolución, ¿mismas condiciones?, duración calculada, estado (Activo / Devuelto)
- [x] Botón "Exportar a Excel" que descarga un .xlsx con todas esas columnas (mismas columnas que la tabla; SheetJS se carga con import() dinámico)
- [x] Botón "Restablecer datos de ejemplo" (borra localStorage) con mensaje de confirmación antes de borrar

## Orden de trabajo (un commit por paso)
1. ✅ Router, layout, 5 vistas base, variables CSS
2. ✅ Datos, PrestamosContext, funciones utilitarias
3. ✅ Vista Equipos: tarjetas, paginación, cargando, sin resultados
4. ✅ Datos v2: 60 equipos con serial, categoría Accesorios + SVG, ubicaciones de TI
5. ✅ Buscador + filtros (categoría + estado), Filtrar / Limpiar, contador
6. ✅ Sidebar de detalle (8 atributos)
7. ✅ Vista Inicio
8. ✅ Vista Stack
9. ✅ Vista Contacto (validaciones + EmailJS + testimonios)
10. ✅ Vista Propuesta de valor (antes / después)
11. ✅ Colaboradores + historial en el contexto con localStorage
12. ✅ Formularios de préstamo y devolución + "Marcar como reparado" en el sidebar
13. ✅ Vista Préstamos: tabla del historial + "Restablecer datos de ejemplo"
14. ✅ Exportar a Excel con SheetJS
15. ✅ Botón de tema, revisión responsive y checklist completo
16. README (módulos, funcionamiento, cómo correrlo, trabajo futuro) + vercel.json + despliegue

## Entregables
- [ ] Repositorio en GitHub con README (módulos, funcionamiento, cómo correrlo, trabajo futuro: login y backend)
- [ ] Diapositivas: agenda, introducción, maquetación, línea de diseño, una por vista, demo, conclusiones
- [ ] Enviar diapositivas por correo institucional
- [ ] Código y presentación entregados el domingo antes de la sustentación
- [ ] Demo de 4 minutos ensayada (exposición total: 10 minutos)
