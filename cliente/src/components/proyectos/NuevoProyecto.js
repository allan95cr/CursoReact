import React, { Fragment, useState, useContext } from "react";
import proyectoContext from "../../context/proyectoContext";

const NuevoProyecto = () => {

  // Obtener el state del formulario
  const proyectosContext = useContext(proyectoContext);
  const {formulario,mostrarFormulario} = proyectosContext;

  // State para proyecto
  const [proyecto, GuardarProyecto] = useState({
    nombre: ""
  });

  const { nombre } = proyecto;

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
  };

  const onClickFormulario = () => {
    mostrarFormulario()
  }

  return (
    <Fragment>
      <button 
      type="button" 
      className="btn btn-block btn-primario"
      onClick={onClickFormulario}>
        Nuevo Proyecto
      </button>

{
  formulario
  ? 
  (
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
  )
  : null
}

    </Fragment>
  );
};

export default NuevoProyecto;
