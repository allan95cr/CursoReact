import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from '../../context/autenticacion/authContext';

const NuevaCuenta = (props) => {
  // Extraer los valores del context
  const alertaContext = useContext(AlertaContext);

  const { alerta, mostrarAlerta } = alertaContext;

  const authContext = useContext(AuthContext);
  const { mensaje,autenticado,RegistrarUsuario} = authContext;

  // En caso de que el usuario se haya autenticado o registrado o sea
  // un registro duplicado
  useEffect(()=>{
    if(autenticado){
      props.history.push('/proyectos');
    }
    if(mensaje){
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }

  },[mensaje, autenticado, props.history]);

  // State del Login
  const [usuario, GuardarUsuario] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmar: ''
  });

  const { nombre, email, password, confirmar } = usuario;

  const onChange = (e) => {
    GuardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que no hayan campos vacios
    if(nombre === '' || email === '' || password === '' || confirmar === '') {
        mostrarAlerta('Todos los campos son obligatorios','alerta-error');
        return;
    }

    // Password minimo 6 caracteres
    if(password.length < 6){
      console.log(password.length)
      mostrarAlerta('El password debe tener al menos 6 caracteres','alerta-error');
      return;
    }

    // Password y confirmar iguales
    if(password !== confirmar){
      mostrarAlerta('Los passwords no son iguales','alerta-error');
      return;
    }

    // Pasar al action
    RegistrarUsuario({
      nombre,
      email,
      password
    });
  };

  return (
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Obtener una cuenta</h1>

        <form onSubmit={handleSubmit}>
          <div className="campo-form">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Tu nombre"
              value={nombre}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu Email"
              value={email}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Tu Password"
              value={password}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="confirmar">Confirmar Password</label>
            <input
              type="password"
              id="confirmar"
              name="confirmar"
              placeholder="Repite tu Password"
              value={confirmar}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Iniciar Sesión"
            />
          </div>
        </form>
        <Link to={"/"} className="enlace-cuenta">
          Volver a Iniciar Sesión
        </Link>
      </div>
    </div>
  );
};

export default NuevaCuenta;
