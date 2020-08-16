import React, { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import proyectoContext from "./proyectoContext";
import proyectoReducer from "./proyectoReducer";
import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  AGREGAR_PROYECTO,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO
} from "../types";

const ProyectoState = (props) => {
  const inicialState = {
    formulario: false,
    listaProyectos: [],
    errorformulario: false,
    proyecto: null,
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
      payload: listaProyectos,
    });
  };

  //Agregar nuevo proyecto
  const agregarProyecto = (proyecto) => {
    proyecto.id = uuidv4();

    //Proyecto en el state con un dispatch
    dispatch({
      type: AGREGAR_PROYECTO,
      payload: proyecto,
    });
  };

  // Valida el formulario por errores
  const mostrarError = () => {
    dispatch({
      type: VALIDAR_FORMULARIO,
    });
  };

  // Selecciona el proyecto actual
  const proyectoActual = (proyectoId) => {
    dispatch({
      type: PROYECTO_ACTUAL,
      payload: proyectoId,
    });
  };

  //Elimina un proyecto
  const eliminarProyecto = (proyectoId) => {
    dispatch({
      type: ELIMINAR_PROYECTO,
      payload: proyectoId
    });
  };

  return (
    <proyectoContext.Provider
      value={{
        formulario: state.formulario,
        listaProyectos: state.listaProyectos,
        errorformulario: state.errorformulario,
        proyecto: state.proyecto,
        mostrarFormulario,
        obtenerProyectos,
        agregarProyecto,
        mostrarError,
        proyectoActual,
        eliminarProyecto
      }}
    >
      {props.children}
    </proyectoContext.Provider>
  );
};

export default ProyectoState;
