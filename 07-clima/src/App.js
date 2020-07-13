import React, { Fragment, useState, useEffect } from "react";
import Header from "./components/Header.js";
import Formulario from "./components/Formulario.js";
import Clima from "./components/Clima.js";
import Error from "./components/Error.js";

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
    const consultarApi = async () => {
      if (consultar) {
        const appId = "c6d86908cad1e1e49936da5f84976698";
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

        const respuesta = await fetch(apiUrl);
        const resultado = await respuesta.json();
        guardarResultado(resultado);
        guardarConsultar(false);

        // Detecta si hubo resultados corretos en la consulta
        if (resultado.cod === "404") {
          guardarError(true);
        } else {
          guardarError(false);
        }
      }
    };
    consultarApi();
    // esta linea elimina el warning de dependencias
    // eslint-disable-next-line
  }, [consultar]);

  // Carga condicional de componentes, si no hubo error al consumir el
  //api, retornamos el clima
  let componente;
  if (error) {
    componente = <Error mensaje="No hay resultados" />;
  } else {
    componente = <Clima resultado={resultado} />;
  }

  return (
    <Fragment>
      <Header titulo="Clima React App" />

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
    </Fragment>
  );
}

export default App;
