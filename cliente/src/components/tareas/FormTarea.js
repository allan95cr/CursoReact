import React, { useContext, useState, useEffect } from "react";
import proyectoContext from "../../context/proyectoContext";
import TareaContext from "../../context/tareas/tareaContext";

const FormTarea = () => {
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  // obtener context tarea
  const tareasContext = useContext(TareaContext);
  const {
    tareaSeleccionada, 
    errorTarea, 
    agregarTarea, 
    validarTarea,
    obtenerTareas,
    editarTarea,
    limpiarTarea
   } = tareasContext;

   // Effect que detecta cuando si hay una tarea seleccionada
   useEffect(()=>{
      if(tareaSeleccionada!==null){
        guardarTarea(tareaSeleccionada)
      }
      else{
        guardarTarea({
          nombre:''
        })
      }

   },[tareaSeleccionada]);

  // state del formulario
  const [tarea, guardarTarea] = useState({
    nombre: "",
  });

  const { nombre } = tarea;

  // Si no hay proyecto seleccionado
  if (!proyecto) {
    return null;
  }

  // Array destructuring para obtener el proeycto actual
  const [proyectoActual] = proyecto;

  // Leer valores del formulario
  const handleChange = (e) => {
    guardarTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //Validar
    if (nombre.trim() === "") {
      validarTarea();
      return;
    }
    
    // Revisar si es edicion o nueva tarea
    if(tareaSeleccionada===null){

      //Agregar la tarea al state de tarea
      tarea.proyectoId = proyectoActual.id;
      tarea.estado = false;
      agregarTarea(tarea);
    }
    else {      
      // Actualizar tarea
      editarTarea(tarea);
      // Elimina tarea seleccionada 
      limpiarTarea();
    }    

    //Obtener las tareas actualizadas
    obtenerTareas(proyectoActual.id);
    
    //Reinicar el form
    guardarTarea({
        nombre:''
    })
  };

  return (
    <div className="formulario">
      <form onSubmit={handleSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Tarea..."
            name="nombre"
            value={nombre}
            onChange={handleChange}
          />
        </div>

        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={tareaSeleccionada ? "Editar Tarea":"Agregar Tarea"}
          />
        </div>
      </form>

      {errorTarea 
      ? <p className="mensaje error">El nombre de la tarea es obligatorio</p>
      : null}
    </div>
  );
};

export default FormTarea;
