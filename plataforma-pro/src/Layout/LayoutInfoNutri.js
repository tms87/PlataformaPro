import React from 'react';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import NoteIcon from '@material-ui/icons/Note';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ProfilePic from '../img/lopez.png';

const miniProfileNutri = {picture: ProfilePic, name: "Lautaro Lopez", type: "Nutricionista"};

const optionsListNutri = [
    {label: 'Pacientes', value: 'patients', icon: <PeopleOutlineIcon />,},
    {label: 'Plantillas', value: 'templates', icon: <NoteIcon />,},
    {label: 'Productos', value: 'productos', icon: <ShoppingCartIcon />,},
    {label: 'Recetas', value: 'recetas', icon: <FolderOpenIcon />,},
    {label: 'Mi Perfil', value: 'profileProfesional', icon: <AccountBoxIcon />,},
];

export { miniProfileNutri , optionsListNutri };