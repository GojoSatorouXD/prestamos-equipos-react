import { useState } from 'react'
import { FILTROS_INICIALES } from '../../utils/equipos'
import './Filtros.css'

/**
 * Formulario de filtros: buscador de texto, selector de categoría
 * y selector de estado.
 *
 * Props:
 *  - categorias: arreglo con las categorías para el selector
 *  - estados: arreglo con los estados para el selector
 *  - filtrosAplicados: filtros que ya están aplicados (valor inicial del formulario)
 *  - onFiltrar: función que recibe el objeto { texto, categoria, estado }
 *  - onLimpiar: función que quita todos los filtros
 *
 * Lo que el usuario escribe se guarda en un "borrador" (estado local).
 * La lista NO cambia hasta que se presiona "Filtrar" o Enter.
 */
function Filtros({ categorias, estados, filtrosAplicados, onFiltrar, onLimpiar }) {
  const [borrador, setBorrador] = useState(filtrosAplicados)

  // Evento onChange compartido por los 3 campos.
  // Usa el atributo "name" del campo para saber qué propiedad actualizar.
  const manejarCambio = (evento) => {
    const { name, value } = evento.target
    setBorrador({ ...borrador, [name]: value })
  }

  // Evento onSubmit: se dispara con el botón "Filtrar" y con Enter en el buscador
  const manejarEnvio = (evento) => {
    evento.preventDefault() // evita que el navegador recargue la página
    onFiltrar(borrador)
  }

  // Evento onClick de "Limpiar filtros": vacía el formulario y la lista
  const manejarLimpiar = () => {
    setBorrador(FILTROS_INICIALES)
    onLimpiar()
  }

  return (
    <form className="filtros" onSubmit={manejarEnvio} role="search">
      <div className="filtros-campo filtros-campo-texto">
        <label htmlFor="filtro-texto">Buscar</label>
        <input
          id="filtro-texto"
          name="texto"
          type="search"
          placeholder="Nombre, marca, serial o especificación"
          value={borrador.texto}
          onChange={manejarCambio}
        />
      </div>

      <div className="filtros-campo">
        <label htmlFor="filtro-categoria">Categoría</label>
        <select id="filtro-categoria" name="categoria" value={borrador.categoria} onChange={manejarCambio}>
          <option value="">Todas</option>
          {categorias.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
      </div>

      <div className="filtros-campo">
        <label htmlFor="filtro-estado">Estado</label>
        <select id="filtro-estado" name="estado" value={borrador.estado} onChange={manejarCambio}>
          <option value="">Todos</option>
          {estados.map((estado) => (
            <option key={estado} value={estado}>
              {estado}
            </option>
          ))}
        </select>
      </div>

      <div className="filtros-botones">
        <button type="submit" className="boton boton-primario">
          Filtrar
        </button>
        {/* type="button" para que este botón NO envíe el formulario */}
        <button type="button" className="boton boton-secundario" onClick={manejarLimpiar}>
          Limpiar filtros
        </button>
      </div>
    </form>
  )
}

export default Filtros
