import React, { Fragment, useState,useEffect } from "react";
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";
function App() {

  // Citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem('listaCitas'));

  if(!citasIniciales){
    citasIniciales = [];
  }

  //Arreglo citas
  const [listaCitas, guardarCitas] = useState(citasIniciales);

  // use Effect para realizar ciertas operaciones cuando el state cambia
  useEffect(() => {

    let citasIniciales = JSON.parse(localStorage.getItem('listaCitas'));
    if(citasIniciales)
    {
      localStorage.setItem('listaCitas',JSON.stringify(listaCitas));
    }
    else{
      localStorage.setItem('listaCitas',JSON.stringify([]));
    }
  },[listaCitas]);

  // Funcion que toma las citas y agrega la nueva
  const crearCita = (cita) => {
    guardarCitas([...listaCitas, cita]);
  };

  // Funcion que elimina una cita por su Id
  const eliminarCita = (id) =>{
    const nuevasCitas = listaCitas.filter(cita => cita.id !== id);
    guardarCitas(nuevasCitas);
  };

  // Mensaje condicional
  const titulo = listaCitas.length === 0 ? 'No hay citas': 'Administra tus citas'

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {listaCitas.map((cita) => (
              <Cita key={cita.id} cita={cita} eliminarCita={eliminarCita}/>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
