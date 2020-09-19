import React,{ useContext} from "react";
import proyectoContext from "../../context/proyectoContext";
import TareaContext from "../../context/tareas/tareaContext";

const Proyecto = ({ proyecto }) => {

  const proyectosContext = useContext(proyectoContext);
  const { proyectoActual } = proyectosContext;

  // obtener context tarea
  const tareasContext = useContext(TareaContext);
  const { obtenerTareas } = tareasContext;

  //Funcion para agregar el proyecto actual
  const seleccionarProyecto = id => {
    proyectoActual(id); // Fijar proyecto actual
    obtenerTareas(id); // Fijar las tareas del proyecto
  }

  return (
    <li>
      <button 
      type="button" 
      className="btn btn-blank"
      onClick={() =>seleccionarProyecto(proyecto._id)}
      >{proyecto.nombre}</button>
    </li>
  );
};

export default Proyecto;
