import React, { useState } from "react";

const useSelect = (stateInicial, opciones) => {
  // state del custom hook
  const [state, actualizarState] = useState(stateInicial);

  const SelectNoticias = () =>  (
      <select className="browser-default" 
      value={state}
      onChange={e => actualizarState(e.target.value)}>
          {opciones.map(opciones => (
            <option key={opciones.value} value={opciones.value}>{opciones.label}</option>
          ))}
        
      </select>
    );

  return [state, SelectNoticias];
};

export default useSelect;
