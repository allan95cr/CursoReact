import React from "react";
import Proyecto from "./Proyecto";

const ListadoProyectos = () => {

  const listaProyectos = [
    { nombre: "Tienda Virtual" },
    { nombre: "Desarrollo Sitio React" },
  ];

  return (
    <ul className="listado-proyectos">
      {listaProyectos.map((proyecto) => (
        <Proyecto proyecto={proyecto} />
      ))}
    </ul>
  );
};

export default ListadoProyectos;
