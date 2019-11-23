import React from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import TodayIcon from '@material-ui/icons/Today';
import ProfilePic from '../img/julian.jpg';

const miniProfilePaciente = {picture: ProfilePic, name: "Julian Perez", type: "Paciente"};

const optionsListPaciente = [
    {label: 'Actividades', value: 'activities', icon: <TodayIcon />,},
    {label: 'Productos', value: 'productos', icon: <ShoppingCartIcon />,},
    {label: 'Recetas', value: 'recetas', icon: <FolderOpenIcon />,},
    {label: 'Perfil', value: 'profile', icon: <AccountBoxIcon />,},
];

export { miniProfilePaciente , optionsListPaciente };