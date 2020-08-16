import React, {useContext} from 'react';
import proyectoContext from "../../context/proyectoContext";


const FormTarea = () => {
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

      // Si no hay proyecto seleccionado
  if(!proyecto){
    return null;
  }

  // Array destructuring para obtener el proeycto actual
  const [proyectoActual] = proyecto;

    return ( 
        <div className="formulario">
            <form>
                <div className="contenedor-input">
                    <input
                    type="text"
                    className="input-text"
                    placeholder="Nombre Tarea..."
                    name="nombre"
                    />
                </div>

                <div className="contenedor-input">
                    <input
                    type="submit"
                    className="btn btn-primario btn-submit btn-block"
                    value="Agregar Tarea"
                    />
                </div>
            </form>

        </div>
     );
}
 
export default FormTarea;