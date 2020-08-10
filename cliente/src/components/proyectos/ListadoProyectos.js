import React, { useContext, useEffect } from "react";
import Proyecto from "./Proyecto";
import proyectoContext from "../../context/proyectoContext";

const ListadoProyectos = () => {

  // Extraer proyectos del state inicial
  const proyectosContext = useContext(proyectoContext);
  const{listaProyectos,obtenerProyectos} = proyectosContext;

  // Obtener Proyectos cuando carga el componente
  useEffect(() =>{
    obtenerProyectos();
  },[])

    // Revisar si existe contenido
    if(listaProyectos.length === 0 ) return null;

  return (
    <ul className="listado-proyectos">
      {listaProyectos.map((proyecto) => (
        <Proyecto 
        key={proyecto.id}
        proyecto={proyecto} 
        />
      ))}
    </ul>
  );
};

export default ListadoProyectos;
