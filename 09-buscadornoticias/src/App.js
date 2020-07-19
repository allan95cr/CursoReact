import React, { Fragment, useState, useEffect } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import ListadoNoticias from "./components/ListadoNoticias";

function App() {
  const [categoria, guardarCategoria] = useState("");
  const [noticias, guardarNoticias] = useState([]);

  useEffect(() => {
    const consultarApi = async () => {
      const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${categoria}&apiKey=2b6ff793589147bba670a65f2e1c3792`;

      const respuesta = await fetch(apiUrl);
      const news = await respuesta.json();
      guardarNoticias(news.articles);
    };
    consultarApi();
  }, [categoria]);

  return (
    <Fragment>
      <Header titulo="Buscador de Noticias" />

      <div className="container white">
        <Formulario guardarCategoria={guardarCategoria} />
        <ListadoNoticias noticias={noticias}/>
      </div>
    </Fragment>
  );
}

export default App;
