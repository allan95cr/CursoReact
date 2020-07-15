import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import imagen from "./cryptomonedas.png";
import Formulario from "./Formulario";
import Cotizacion from "./Cotizacion";
import axios from 'axios';
import Spinner from "./Spinner";

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: "Bebas Neue", cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 8-px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`;

function App() {
  const [moneda, guardarMoneda] = useState("");
  const [criptomoneda, guardarCriptomoneda] = useState("");
  const [resultado, guardarResultado] = useState({})
  const [spinner, activarSpinner] = useState(false);

  useEffect(() => {
    
const cotizarCriptoMoneda = async () => {
  // evitamos la primer ejecucion
  if (moneda === "") {
    return;
  }
  // Cotizar la api para obtener la cotizacion
  const apiUrl = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

  const resultado = await axios.get(apiUrl);

  // Mostrar spinner
  activarSpinner(true);

  // Ocultar spinner
  setTimeout(() => {
    activarSpinner(false);

    guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
    
  }, 2000);

}
cotizarCriptoMoneda();

  }, [moneda, criptomoneda]);

  // Mostrar Spinner o resultado
const componente = (spinner) ? <Spinner/> :  <Cotizacion resultado={resultado}/>


  return (
    <Contenedor>
      <div>
        <Imagen src={imagen} alt="imagen cripto" />
      </div>
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
        />
       {componente}
      </div>
    </Contenedor>
  );
}

export default App;
