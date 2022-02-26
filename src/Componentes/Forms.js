import React, {useState} from "react";
import Error from "./Error";

const Formulario = ({busqueda, guardarBusqueda, guardarConsultar}) => {
  //state formulario

  const [error, guardarError] = useState(false);

  //extarer ciudad  y pais
  const {ciudad, pais} = busqueda;

  // funcion que coloca los elementos en el starte
  const handleChange = (e) => {
    // actualizar state +
    guardarBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };

  // cuando el usuario da submit al form
  const handleSubmit = (e) => {
    e.preventDefault();
    /// validar
    if (ciudad.trim() === "" || pais.trim() === "") {
      guardarError(true);
      return;
    }
    guardarError(false);
    guardarConsultar(true);
    //pasar al componentes principal
  };

  ////
  return (
    <form onSubmit={handleSubmit}>
      {error ? <Error mensaje="Ambos Campos Son Obligatorios" /> : null}
      <div className="input-field col s12">
        <input
          type="text"
          name="ciudad"
          id="ciudad"
          value={ciudad}
          onChange={handleChange}
        />
        <label htmlFor="ciudad"> Ciudad: </label>
      </div>

      <div className="input-field col s12">
        <select name="pais" id="pais" value={pais} onChange={handleChange}>
          <option value="">--Sleccione un pais--</option>
          <option value="US">Estados Unidos</option>
          <option value="MX">México</option>
          <option value="AR">Argentina</option>
          <option value="CO">Colombia</option>
          <option value="CR">Costa Rica</option>
          <option value="ES">España</option>
          <option value="PE">Perú</option>
        </select>
        <label htmlFor="pais">Pais:</label>
      </div>

      <div className="imput-field col s12">
        <input
          type="submit"
          value="buscar clima"
          className="waves-effect waves-light btn-large btn-block yellow accent-4 "
        />
      </div>
    </form>
  );
};

export default Formulario;
