import React from 'react';
import cheese from './icons/cheese.png';
import meat from './icons/meat.png';
import peach from './icons/peach.png';
import peanut from './icons/peanut.png';
import wheat from './icons/wheat.png';
import oliveoil from './icons/oliveoil.png';
import fridge from './icons/fridge.png';

export default [
    { key: 0, label: "Todos los productos",categoria:"0", icon: <img src={fridge} alt="fridge" style={{ marginRight: "10px" }} /> },
    { key: 1, label: "Grupo 1: Quesos, Leche y derivados",categoria:"1", icon: <img src={cheese} alt="cheese" style={{ marginRight: "10px" }} /> },
    { key: 2, label: "Grupo 2: Carne, pescado y huevo",categoria:"2", icon: <img src={meat} alt="meat" style={{ marginRight: "10px" }} /> },
    { key: 3, label: "Grupo 3: Papas, legumbres y futos secos",categoria:"3", icon: <img src={peanut} alt="peanut" style={{ marginRight: "10px" }} /> },
    { key: 4, label: "Grupo 4: Frutas, Verduras y hortalizas",categoria:"4", icon: <img src={peach} alt="peach" style={{ marginRight: "10px" }} /> },
    { key: 5, label: "Grupo 5: Cereales y derivados, azucar y dulces",categoria:"5", icon: <img src={wheat} alt="wheat" style={{ marginRight: "10px" }} /> },
    { key: 6, label: "Grupo 6: Grasas, aceites y manteca",categoria:"6", icon: <img src={oliveoil} alt="oliveoil" style={{ marginRight: "10px" }} /> },
]