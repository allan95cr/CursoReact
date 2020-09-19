import React, { Fragment, useState, useContext } from "react";
import proyectoContext from "../../context/proyectoContext";

const NuevoProyecto = () => {
  // Obtener el state del formulario
  const proyectosContext = useContext(proyectoContext);
  const { 
    formulario,
    errorformulario, 
    mostrarFormulario, 
    agregarProyecto,
    mostrarError } = proyectosContext;

  // State para proyecto
  const [proyecto, GuardarProyecto] = useState({
    nombre: "",
  });

  const { nombre } = proyecto;

  const onChangeProyecto = (e) => {
    GuardarProyecto({
      ...proyecto,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitProyecto = (e) => {
    e.preventDefault();

    //Validar Proyecto
    if (nombre === '') {
      mostrarError();
      return;
    }
    // Agregar al state
    agregarProyecto(proyecto);

    //Reiniciar form
    GuardarProyecto('');
  };

  const onClickFormulario = () => {
    mostrarFormulario();
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={onClickFormulario}
      >
        Nuevo Proyecto
      </button>

      {formulario ? (
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
      ) : null}

      {errorformulario ? 
      <p className="mensaje error">El nombre del proyecto es obligatorio</p>
      : null}
    </Fragment>
  );
};

export default NuevoProyecto;
