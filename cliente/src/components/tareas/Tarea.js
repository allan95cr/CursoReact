import React, {useContext} from "react";
import proyectoContext from "../../context/proyectoContext";
import TareaContext from "../../context/tareas/tareaContext";

const Tarea = ({ tarea }) => {

  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

    // obtener context tarea
    const tareasContext = useContext(TareaContext);
    const { eliminarTarea,obtenerTareas,cambiarEstadoTarea,guardarTareaActual } = tareasContext;

    const [proyectoActual] = proyecto

    // al eliminar la tarea
    const eliminar = (id) => {
      eliminarTarea(id)
      obtenerTareas(proyectoActual.id)
    };

    // Modificar el estado de la tarea
    const cambiarEstado = (tarea) => {
      if(tarea.estado){
        tarea.estado = false;
      }
        else{
          tarea.estado = true;
        }
        cambiarEstadoTarea(tarea);      
    }

    // Selecciona la tarea que el usuario desea editar
    const seleccionarTarea = (tarea) =>
    {
      guardarTareaActual(tarea);
    }

  return (
    <li className="tarea sombra">
      <p>{tarea.nombre}</p>
      <div className="estado">
        {tarea.estado ? (
          <button 
          type="button" 
          className="completo" 
          onClick={() =>cambiarEstado(tarea)}>
            Completo
          </button>
        ) : (
          <button 
          type="button" 
          className="incompleto" 
          onClick={() =>cambiarEstado(tarea)}>
            Incompleto
          </button>
        )}
      </div>

      <div className="acciones">
        <button 
        type="button" 
        className="btn btn-primario"
        onClick={()=> seleccionarTarea(tarea)}>
          Editar
        </button>
        <button 
        type="button" 
        className="btn btn-secundario"
        onClick={()=> eliminar(tarea.id)}>
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default Tarea;
