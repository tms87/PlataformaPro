import React from 'react';
import './SideDrawer.css';
import ImagenUsuario from './../../logo.svg';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import PeopleIcon from '@material-ui/icons/People';
import EventIcon from '@material-ui/icons/Event';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link } from "react-router-dom";
const SideDrawer = props => (
    <nav className="burger-menu">
        <div className="user-panel">
            <img src={ImagenUsuario} alt="pefil" className="user-img" />
            <p className="user-name"> Nombre</p>
            <NavigateBeforeIcon onClick={props.click} className="botton-back" />
        </div>
        <ul>
            <li>
                <a href="/" className="burger-botton-link" >
                    <PeopleIcon className="burger-botton-link-icon" />
                    <span className="burger-botton-link-text">Pacientes</span>
                </a>
            </li>
            <li>
                <Link to="/actividad" className="burger-botton-link">
                    <EventIcon className="burger-botton-link-icon" />
                    <span className="burger-botton-link-text">Actividades</span>
                </Link>
            </li>
            <li>
                <a href="/" className="burger-botton-link" >
                    <ShoppingCartIcon className="burger-botton-link-icon" />
                    <span className="burger-botton-link-text">Productos</span>
                </a>
                
            </li>
        </ul>
    </nav>
);

export default SideDrawer;
