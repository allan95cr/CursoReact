import React, { useReducer } from "react";
import { v4 as uuidv4 } from 'uuid';
import TareaContext from "./tareaContext";
import TareaReducer from "./tareaReducer";
import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  ESTADO_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA
} from "../../types";

const TareaState = (props) => {
  const initialState = {
    tareas: [
      { id:1, nombre: "Elegir Plataforma", estado: true, proyectoId: 1 },
      { id:2, nombre: "Elegir Plataforma de pago", estado: true, proyectoId: 2 },
      { id:3, nombre: "Elegir Hosting", estato: false, proyectoId: 2 }
    ],
    listaTareasProyecto: null,
    errorTarea: false,
    tareaSeleccionada: null
  };

  // Crear dispatch y state
  const [state, dispatch] = useReducer(TareaReducer, initialState);

  // Funciones

  // Obtener tareas del proyecto
  const obtenerTareas = (proyectoId) => {
    dispatch({
      type: TAREAS_PROYECTO,
      payload: proyectoId
    });
  };

  //Agregar Tarea al proyecto seleccionado
  const agregarTarea = (tarea) => {
    tarea.id= uuidv4();
    dispatch({
      type: AGREGAR_TAREA,
      payload: tarea
    });
  };

  //Valida y muestra un error en caso que sea necesario
  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA
    });
  };

  //Eliminar tarea
  const eliminarTarea = (id) => {
    dispatch({
      type: ELIMINAR_TAREA,
      payload: id
    });
  };

  // Cambia el estado de cada tarea
  const cambiarEstadoTarea = (tarea) =>{
    dispatch({
      type: ESTADO_TAREA,
      payload: tarea
    })
  }

  //Extrae una tarea para edicion
  const guardarTareaActual = (tarea) => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea
    })
  }

  // Edita una tarea
  const editarTarea = (tarea) => {
    dispatch({
      type: ACTUALIZAR_TAREA,
      payload: tarea
    })
  }

  // Elimina la tarea seleccionada
  const limpiarTarea = () => {
    dispatch({
      type: LIMPIAR_TAREA
    })
  }

  return (
    <TareaContext.Provider
      value={{
        tareas: state.tareas,
        listaTareasProyecto: state.listaTareasProyecto,
        errorTarea: state.errorTarea,
        tareaSeleccionada: state.tareaSeleccionada,
        obtenerTareas,
        agregarTarea,
        validarTarea,
        eliminarTarea,
        cambiarEstadoTarea,
        guardarTareaActual,
        editarTarea,
        limpiarTarea
      }}
    >
      {props.children}
    </TareaContext.Provider>
  );
};

export default TareaState;
