import React, { useState, useEffect } from "react";
import Header from "./Componentes/Helper";
import Formulario from "./Componentes/Forms";
import Clima from "./Componentes/Clima";
import Error from "./Componentes/Error";
function App() {
  const [busqueda, guardarBusqueda] = useState({
    ciudad: "",
    pais: "",
  });
  const [consultar, guardarConsultar] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [error, guardarError] = useState(false);
  const { ciudad, pais } = busqueda;

  useEffect(() => {
    const consultarAPI = async () => {
      if (consultar) {
        const appId = "10572de6159211e2df5fc34d1b919135";
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        guardarResultado(resultado);
        guardarConsultar(false);

        //detecta si hubo resultado corroecto en la consulta
        if (resultado.cod === "404") {
          guardarError(true);
        } else {
          guardarError(false);
        }
      }
    };

    consultarAPI();
  }, [consultar, ciudad, pais]);

  let componente;
  if (error) {
    componente = <Error mensaje="No hay Resultados" />;
  } else {
    componente = <Clima resultado={resultado} />;
  }
  return (
    <div>
      <Header titulo="Clima React  App" />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsultar={guardarConsultar}
              />
            </div>
            <div className="col m6 s12">{componente}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
