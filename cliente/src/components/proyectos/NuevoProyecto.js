import React, { Fragment, useState } from "react";

const NuevoProyecto = () => {
  // State para proyecto
  const [proyecto, GuardarProyecto] = useState({
    nombre: "",
  });

  const {nombre} = proyecto; 

  const onChangeProyecto = (e) => {
    GuardarProyecto({
      ...proyecto,
      [e.target.name]: [e.target.value],
    });
  };

  const handleSubmitProyecto = (e) => {
      e.preventDefault();

      //Validar Proyecto

      // Agregar al state

      //Reiniciar form
  }

  return (
    <Fragment>
      <button type="button" className="btn btn-block btn-primario">
        Nuevo Proyecto
      </button>

      <form 
      className="formulario-nuevo-proyecto"
      onSubmit={handleSubmitProyecto}
      >
        <input
          type="text"
          className="input-text"
          placeholder="Nombre Proyecto"
          name="nombre"
          value={nombre}
          onChange={onChangeProyecto}
        />

        <input
          type="submit"
          className="btn btn-primario btn-block"
          value="Agregar Proyecto"
        />
      </form>
    </Fragment>
  );
};

export default NuevoProyecto;
