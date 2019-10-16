import React from 'react';
import DehazeIcon from '@material-ui/icons/Dehaze';
import NotificationsIcon from '@material-ui/icons/Notifications';
import './Header.css'

const Header = props => (
    <header>
        <DehazeIcon onClick={props.click} className="burger-Boton" />
        <img src="" className="logo" alt="Logo de la empresa"/>
        <NotificationsIcon className="notifications" />
    </header>
)


export default Header;
