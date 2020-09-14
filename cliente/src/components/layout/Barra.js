import React, {useContext,useEffect} from 'react';
import AuthContext from "../../context/autenticacion/authContext";

const Barra = () => {

      // Extraer informacion de la autenticacion
  const authContext = useContext(AuthContext);
  const { usuario,UsuarioAutenticado, CerrarSesion } = authContext;

  useEffect(() => {
    UsuarioAutenticado();
  }, []);


    return ( 
        <header className="app-header">
            { usuario ? <p className="nombre-usuario">Hola <span>{usuario.nombre}</span></p>
            : null
            }
            

            <nav className="nav-principal">
                <button 
                className="btn btn-blank cerrar-sesion"
                onClick={ ()=> CerrarSesion()}
                >Cerrar Sesión</button>
            </nav>

        </header>
     );
}
 
export default Barra;