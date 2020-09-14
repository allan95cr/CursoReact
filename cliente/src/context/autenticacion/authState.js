import React, { useReducer } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/tokenAuth";
import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION
} from "../../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    autenticado: null,
    usuario: null,
    mensaje: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Registrar usuario
  const RegistrarUsuario = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("/api/users", datos);
      console.log(respuesta.data);
      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data,
      });

      UsuarioAutenticado();
    } catch (error) {
      //console.log(error.response.data.msg);
      const alerta = {
        msg: error.response.data.msg,
        categoria: "alerta-error",
      };
      dispatch({
        type: REGISTRO_ERROR,
        payload: alerta,
      });
    }
  };

  // Retorna el usuario autenticado
  const UsuarioAutenticado = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.get("/api/auth");
      dispatch({
        type: OBTENER_USUARIO,
        payload: respuesta.data.user,
      });
    } catch (error) {
      const alerta = {
        msg: error.response.data.msg,
        categoria: "alerta-error"
      };
      dispatch({
        type: LOGIN_ERROR,
        payload: alerta
      });
    }
  };

  // Iniciar Sesion
  const IniciarSesion = async (datos) => {
    try {
        const respuesta = await clienteAxios.post('/api/auth',datos);
        dispatch({
            type:LOGIN_EXITOSO,
            payload: respuesta.data
        })
        UsuarioAutenticado();
    } 
    catch (error) {
        console.log(error.response);
        const alerta = {
            msg: error.response.data.msg,
            categoria: "alerta-error"
          };
          dispatch({
            type: LOGIN_ERROR,
            payload: alerta
          });
    }
  };

  // Cierra la sesion del usuario
  const CerrarSesion = () => {
    dispatch({
      type: CERRAR_SESION
    });
  }

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        RegistrarUsuario,
        IniciarSesion,
        UsuarioAutenticado,
        CerrarSesion
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
