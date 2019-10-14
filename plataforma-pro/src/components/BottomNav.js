import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AppsRoundedIcon from '@material-ui/icons/AppsRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded';
import Group from '@material-ui/icons/Group';

const useStyles = makeStyles({
  root: {
    width: 450, //150 por icono
  },
});

export default function BottomNav(props) {
  const classes = useStyles();

  function handleChange(event, newValue) {
    props.setPage(newValue)
  }

  return (
    <BottomNavigation value={props.page} onChange={handleChange} className={classes.root}>
      <BottomNavigationAction label="Perfil" value="profile" icon={<AccountCircleRoundedIcon />} />
      <BottomNavigationAction label="Pacientes" value="patients" icon={<Group />} />
      <BottomNavigationAction label="Actividades" value="activities" icon={<AssignmentRoundedIcon />} />
    </BottomNavigation>
  );
}