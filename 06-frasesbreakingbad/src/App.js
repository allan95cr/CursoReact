import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Frase from "./components/Frase";

// Styled components
const Boton = styled.button`
  background: -webkit-linear-gradient(
    top left,
    #007d35 0%,
    #007d35 40%,
    #0f574e 100%
  );
  background-size: 300px;
  font-family: Arial, Helvetica, sans-serif;
  color: #fff;
  margin-top: 3rem;
  padding: 1rem 3rem;
  font-size: 2rem;
  border: 2px solid black;
  transition: backgound-size 0.8s ease;

  :hover {
    cursor: pointer;
    background-size: 400px;
  }
`;

const Contenedor = styled.div`
  display: flex;
  align-items: center;
  padding-top: 5rem;
  flex-direction: column;
`;

function App() {
  // state de frases
  const [frase, guardarFrase] = useState({});

  // useEffect Cargar una frase la primera vez que carga una pagina
  useEffect(() => {
    consultarApi();
  }, []);

  const consultarApi = async () => {
    const apiUrl = await fetch(
      "https://breaking-bad-quotes.herokuapp.com/v1/quotes"
    );
    const frase = await apiUrl.json();
    guardarFrase(frase[0]);
  };

  return (
    <Contenedor>
      <Frase frase={frase} />

      <Boton onClick={consultarApi}>Obtener Frase</Boton>
    </Contenedor>
  );
}

export default App;
