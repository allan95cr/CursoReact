import React, { createContext, useState, useEffect } from "react";
import Axios from "axios";

export const RecetaContext = createContext();

const RecetasProvider = (props) => {
  const [recetas, guardarRecetas] = useState([]);

  const [busqueda, buscarRecetas] = useState({
    nombre: "",
    categoria: "",
  });

  const [consultar, guardarConsultar] = useState(false);

  useEffect(() => {
    if (consultar) {
      const obtenerRecetas = async () => {
        const urlApiRecetas = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${busqueda.nombre}&c=${busqueda.categoria}`;
        
        const resultado = await Axios.get(urlApiRecetas);
        //console.log(resultado.data.drinks);
        guardarRecetas(resultado.data.drinks);
    };
      obtenerRecetas();
      
    }
  }, [busqueda,consultar]);

  return (
    <RecetaContext.Provider
      value={{
        recetas,
        buscarRecetas,
        guardarConsultar
      }}
    >
      {props.children}
    </RecetaContext.Provider>
  );
};

export default RecetasProvider;
