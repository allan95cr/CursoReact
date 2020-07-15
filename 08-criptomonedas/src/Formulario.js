import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import useMoneda from "./hooks/useMoneda";
import useCriptomoneda from "./hooks/useCriptomoneda";
import Error from './Error';
import axios from "axios";

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;

const Formulario = ({guardarMoneda,guardarCriptomoneda}) => {
  // state del listado de criptomonedas
  const [listaCripto, guardarCriptomonedas] = useState([]);
  const [error, guardarError] = useState(false);

  // listado monedas
  const MONEDAS = [
    { codigo: "CRC", nombre: "Colón Costarricense " },
    { codigo: "USD", nombre: "Dolar de Estados Unidos" },
    { codigo: "MXN", nombre: "Peso Mexicano" },
    { codigo: "EUR", nombre: "Euro" },
    { codigo: "GBP", nombre: "Libra Esterlina" },
  ];

  // Utilizar useMoneda
  const [moneda, SelectMonedas] = useMoneda("Elige tu moneda", "", MONEDAS);

  // Utilizar useCriptomoneda
  const [criptoMoneda, SelectCripto] = useCriptomoneda(
    "Elige tu criptomoneda",
    "",
    listaCripto
  );

  // Ejecutar llamado a la API
  useEffect(() => {
    const consultarApi = async () => {
      const apiUrl =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=CRC";
      const resultado = await axios.get(apiUrl);
      guardarCriptomonedas(resultado.data.Data);
    };
    consultarApi();
  }, []);

  // Cuando el usuario hace submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // validar campos
    if (moneda === "" || criptoMoneda === "") {
      guardarError(true);
      return;
    }

    // pasar los datos  al componente principal
    guardarError(false);
    guardarMoneda(moneda);
    guardarCriptomoneda(criptoMoneda);

  };

  return (
    <form onSubmit={handleSubmit}>
      {error ? <Error mensaje="Todos los mensajes son obligatorios" /> : null}
      <SelectMonedas />
      <SelectCripto />
      <Boton type="submit" value="Calcular" />
    </form>
  );
};

export default Formulario;
