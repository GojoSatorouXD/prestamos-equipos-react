# Proyecto Final – Interfaces con React (UNIAJC 2026)

Autor: Juan David Paz Trochez
Línea de desarrollo elegida: **3.4 Equipos de computación y accesorios**
Enfoque: **sistema de préstamo de equipos de cómputo** para instituciones educativas (portátiles, proyectores, tablets, periféricos).
El sitio es el portafolio de Juan como desarrollador y soporte IT y presenta esta solución. En la vista de "proyectos", cada elemento es un equipo disponible para préstamo.
Solo es un front-end: no hay backend ni login, y los préstamos no se guardan en una base de datos.

Requisitos completos en `docs/requisitos.pdf`. Ante cualquier duda, ese PDF manda.

## Stack
- Vite + React (JavaScript, sin TypeScript)
- react-router-dom para las 5 vistas
- CSS propio (o Tailwind si se decide), diseño responsive
- Datos en `public/data/equipos.json`, cargados con fetch
- EmailJS (o mailto) para el formulario
- Despliegue en Vercel o Netlify

## Reglas de trabajo
- Código claro y comentado en español: Juan debe poder explicar cada parte en la sustentación.
- Una vista o funcionalidad por paso, con un commit al terminar cada una (el avance vale 10 puntos).
- No inventar experiencia laboral ni testimonios que parezcan reales. Si un dato es de ejemplo, marcarlo como tal.
- Antes de pasar a la siguiente vista, verificar contra el checklist.

## Lo que se evalúa (debe verse en el código)
- [ ] Funciones propias en JS (filtrar, paginar, validar, contar equipos por estado)
- [ ] Arreglos y objetos (equipos, testimonios, experiencias, stack)
- [ ] Gestión de eventos (onClick, onChange, onSubmit)
- [ ] Promesas: carga de productos con fetch/async-await y envío del formulario
- [ ] Componentes y props
- [ ] Ciclo de vida (useEffect para la carga inicial y limpieza)
- [ ] useState
- [ ] useEffect para cargar información
- [ ] useContext: `PrestamosContext` con equipos, equipo seleccionado, filtros y tema

## Modelo de equipo (8 atributos + id)
`id, nombre, imagen, categoria, marca, estado, especificaciones, ubicacion, tiempoMaximo`
- Tarjeta (5 obligatorios): imagen, nombre, categoría, marca, estado (badge de color)
- Sidebar "Ver detalle": los 8 atributos
- Categorías: Portátiles, Proyectores, Tablets, Periféricos, Audio y video, Redes
- Estados: Disponible, Prestado, En mantenimiento
- ubicacion: sede o sala (ej. "Sede Norte – Sala 204"); tiempoMaximo: ej. "4 horas", "3 días"
- Mínimo 25 equipos, para que la paginación tenga 3 páginas

## Vistas y checklist

### 1. Presentación y biografía (`/`)
- [ ] Header (logo o nombre opcional) + navbar hacia todas las vistas
- [ ] Banner de presentación con título de la página
- [ ] Imagen representativa del perfil + descripción
- [ ] 2 botones CTA: "Ver equipos" y "Contacto"
- [ ] Biografía con mínimo 3 elementos
- [ ] Mínimo 2 redes sociales (GitHub GojoSatorouXD, LinkedIn, etc.)
- [ ] Footer con información de resumen (componente reutilizable)

### 2. Equipos (`/equipos`)
- [ ] Título de la página
- [ ] Lista en tarjetas con paginación de 10 por página; al inicio se cargan los 10 primeros
- [ ] Botón "Ver detalle" en cada tarjeta que abre un sidebar con los 8 atributos
- [ ] Filtros arriba: (1) selector de categoría, (2) selector o radio de estado
- [ ] Extra opcional: contador "X disponibles / Y prestados"
- [ ] Botones "Filtrar" y "Limpiar filtros". Los filtros se aplican solo al presionar "Filtrar" (no en vivo); "Limpiar" restablece la lista completa y vuelve a la página 1
- [ ] Estado de "Cargando…" y mensaje cuando no hay resultados

### 3. Stack tecnológico y estudios (`/stack`)
- [ ] Título de la página
- [ ] Sección "Stack implementado en este proyecto": React, Vite, react-router-dom, Context API, EmailJS/CSS
- [ ] Sección "Stack del autor": mínimo 3 tarjetas con imagen y descripción (React, Node.js, MongoDB, Linux, Git…)
- [ ] Mínimo 2 herramientas de IA usadas (Claude Code, etc.)
- [ ] Timeline con mínimo 3 experiencias laborales: Auxiliar de Soporte IT en el Colegio Colombo Británico + las que Juan confirme (no inventar empleos; si faltan, usar proyectos académicos con rol y decirlo así)
- [ ] Estudios: Tecnología en Sistemas de Información, UNIAJC

### 4. Contacto / nuevo proyecto (`/contacto`)
- [ ] Título de la página
- [ ] Campos: nombre, apellidos, correo, teléfono, descripción (textarea)
- [ ] Nombre y apellidos: solo letras (incluye tildes, ñ y espacios), máximo 20 caracteres
- [ ] Correo: validación con regex
- [ ] Teléfono: solo números
- [ ] Todos los campos obligatorios, con mensajes de error visibles
- [ ] Botón "Enviar email" y mensaje de agradecimiento al enviar
- [ ] Mínimo 5 testimonios (marcados como de ejemplo si no son reales)

### 5. Propuesta de valor (`/propuesta`)
- [ ] Título de la página
- [ ] Sección principal: el problema (préstamos en papel o Excel, equipos perdidos, sin trazabilidad) y la solución (inventario visible, estados claros, historial)
- [ ] Sección secundaria: beneficios para la institución y lo que aporta Juan (soporte IT + desarrollo)
- [ ] Footer

## Entregables
- [ ] Repositorio en GitHub con README (módulos, funcionamiento, cómo correrlo)
- [ ] Diapositivas: agenda, introducción, maquetación, línea de diseño, una por vista, demo, conclusiones
- [ ] Enviar diapositivas por correo institucional
- [ ] Código y presentación entregados el domingo antes de la sustentación
- [ ] Demo de 4 minutos ensayada (exposición total: 10 minutos)
