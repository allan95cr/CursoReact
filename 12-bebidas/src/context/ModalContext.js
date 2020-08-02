import React, {createContext,useEffect,useState} from 'react';
import  Axios  from "axios";

// Crear el context
export const ModalContext = createContext();

const ModalProvider = (props) => {

    // State del provider
    const [idReceta, guardarIdReceta] = useState(null);
    const [receta, guardarReceta] = useState({});

    // Una vez tenemos la receta llamamos el api
    useEffect(()=>{

        const obtenerReceta = async () =>{
            if(!idReceta) return null;

            const urlApiDetalleReceta = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceta}`
            const detalleReceta = await Axios.get(urlApiDetalleReceta);
            
            guardarReceta(detalleReceta.data.drinks[0])
        }
        obtenerReceta();

    },[idReceta])
return (
    <ModalContext.Provider
    value={{
        guardarIdReceta
    }}>
        {props.children}
    </ModalContext.Provider>
)
}

export default ModalProvider;
