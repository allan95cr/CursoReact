import React, { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import axios from "axios";
import Cancion from "./components/Cancion";
import Info from "./components/Info";

function App() {
  // Definir el state
  const [busquedaletra, guardarBusquedaLetra] = useState({});
  const [letra, guardarLetra] = useState("");
  const [info, guardarInfo] = useState({});
  useEffect(() => {
    if (Object.keys(busquedaletra).length === 0) {
      return;
    }

    const consultarApiLetra = async () => {
      const { artista, cancion } = busquedaletra;
      const urlApiLetra = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const urlApiArtista = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

      // Llamar dos apis a la vez
      const [letra, informacion] = await Promise.all([
        axios.get(urlApiLetra),
        axios.get(urlApiArtista),
      ]);
      console.log("Prueba");
      guardarLetra(letra.data.lyrics);
      guardarInfo(informacion.data.artists[0]);
    };

    consultarApiLetra();
  }, [busquedaletra]);

  return (
    <Fragment>
      <Formulario guardarBusquedaLetra={guardarBusquedaLetra} />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Info info={info} />
          </div>
          <div className="col-md-6">
            <Cancion letra={letra} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
