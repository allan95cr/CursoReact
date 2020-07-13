import React from "react";

const Producto = ({ producto, carrito, agregarProducto, productos }) => {
  
  // Agregar producto al carrito
  const seleccionarProducto = (id) => {
    const producto = productos.filter(producto => producto.id === id)[0];
    agregarProducto(
      [
        ...carrito,
        producto
      ]
      );
    };
    const { nombre, precio, id } = producto;
  
  return (
    <div>
      <h2>{nombre}</h2>
      <p>${precio}</p>
      <button 
      type="button"
      onClick= { () => seleccionarProducto(id) }
      >Comprar</button>
    </div>
  );
};

export default Producto;
