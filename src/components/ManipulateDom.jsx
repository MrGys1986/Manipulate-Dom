import React, { useState } from 'react';
import './ManipulateDom.css';
import { FaRegSmile } from 'react-icons/fa'; // Icono para la cabecera de cada tarjeta

// Función para generar un color aleatorio en formato hexadecimal
const generarColorAleatorio = () => {
  const color = Math.floor(Math.random() * 16777215).toString(16);
  return '#' + ('000000' + color).slice(-6);
};

const ManipulateDom = () => {
  const [elementos, setElementos] = useState([]);

  // Agrega un nuevo elemento con un tipo aleatorio (div, badge, icon) y color aleatorio
  const agregarElemento = () => {
    const tipos = ['div', 'badge', 'icon'];
    const tipoAleatorio = tipos[Math.floor(Math.random() * tipos.length)];
    const nuevoElemento = {
      id: Date.now(), // ID único basado en timestamp
      tipo: tipoAleatorio,
      color: generarColorAleatorio(),
    };
    setElementos(prev => [...prev, nuevoElemento]);
  };

  // Elimina el elemento al hacer clic sobre él
  const eliminarElemento = (id) => {
    setElementos(prev => prev.filter(el => el.id !== id));
  };

  // Vacía todos los elementos agregados
  const vaciarElementos = () => {
    setElementos([]);
  };

  return (
    <div className="container">
      <h1 className="header">Manipulación de DOM con React 18</h1>
      <div className="button-group">
        <button className="btn" onClick={agregarElemento}>Agregar Elemento</button>
        <button className="btn" onClick={vaciarElementos}>Vaciar Elementos</button>
      </div>
      <div className="elements-container">
        {elementos.map((elemento) => (
          <div
            key={elemento.id}
            className="card"
            onClick={() => eliminarElemento(elemento.id)}
            style={{ backgroundColor: elemento.color }}
          >
            <div className="card-header">
              <FaRegSmile />
              <span>Elemento</span>
            </div>
            <div className="card-content">
              {elemento.tipo === 'div' && <div>DIV</div>}
              {elemento.tipo === 'badge' && (
                <span className="badge">
                  Badge
                </span>
              )}
              {elemento.tipo === 'icon' && (
                <i className="fa fa-star" aria-hidden="true"></i>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManipulateDom;
