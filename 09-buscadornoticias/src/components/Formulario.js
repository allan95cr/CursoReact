import React from "react";
import styles from "./Formulario.module.css";
import useSelect from "../Hooks/useSelect";
import { findAllByLabelText } from "@testing-library/react";

const Formulario = () => {

// Categoria de las noticias
const OPCIONES =  [
     {value:'general', label: 'General'},
     {value:'business', label: 'Negocios'},
     {value:'entertainment', label: 'Entretenimiento'},
     {value:'health', label: 'Salud'},
     {value:'science', label: 'Ciencia'},
     {value:'sports', label: 'Deportes'},
     {value:'technology', label: 'Tecnología'},
    ]

  // usar Custom Hook
  const [categoria, SelectNoticias] = useSelect('general',OPCIONES);

  return (
    <div className={`${styles.buscador} row`}>
      <div className="col s12 m8 offset-m2">
        <form>
          <h2 className={styles.heading}>Encuentra Noticias por Categoria</h2>

          <SelectNoticias/>

          <div className="input-field col s12">
            <input
              type="submit"
              className={`${styles["btn-block"]} btn-large amber darken-2`}
              value="Buscar"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Formulario;
