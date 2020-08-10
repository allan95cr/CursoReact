import React, { useReducer } from "react";
import proyectoContext from "./proyectoContext";
import proyectoReducer from "./proyectoReducer";
import { FORMULARIO_PROYECTO, OBTENER_PROYECTOS } from "../types";

const ProyectoState = (props) => {
  const inicialState = {
    formulario: false,
    listaProyectos: [],
  };

  const listaProyectos = [
    { id: 1, nombre: "Tienda Virtual" },
    { id: 2, nombre: "Desarrollo Sitio React" },
  ];

  //Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(proyectoReducer, inicialState);

  // Funciones para el CRUD
  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO,
    });
  };

  // Obtener los proyectos
  const obtenerProyectos = () => {
    dispatch({
      type: OBTENER_PROYECTOS,
      payload: listaProyectos
    });
  };

  return (
    <proyectoContext.Provider
      value={{
        formulario: state.formulario,
        listaProyectos: state.listaProyectos,
        mostrarFormulario,
        obtenerProyectos,
      }}
    >
      {props.children}
    </proyectoContext.Provider>
  );
};

export default ProyectoState;
