import React, { createContext, useState,useEffect } from "react";
import Axios from "axios";

// Create context
export const CategoriasContext = createContext();

// Provider es donde se encuentran las funciones y el state
const CategoriasProvider = (props) => {
  // Crear el state del Context
  const [categorias, guardarCategorias] = useState([]);

  // Ejecutar el llamado al api
  useEffect(() =>{

    const obtenerCategorias = async () => {
        const ulrApiCategorias = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

        const categorias = await Axios.get(ulrApiCategorias);
        guardarCategorias(categorias.data.drinks);

    }
    obtenerCategorias();
  },[]  )


  return (
    <CategoriasContext.Provider value={{
        categorias
    }}>
      {props.children}
    </CategoriasContext.Provider>
  );
};

export default CategoriasProvider;
