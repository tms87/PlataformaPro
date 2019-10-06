import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AppsRoundedIcon from '@material-ui/icons/AppsRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

export default function BottomNav(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.page);

  function handleChange(event, newValue) {
    console.log("lala: "+newValue);
    setValue(newValue);
    props.handleChange(newValue)
  }

  return (
    <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
      <BottomNavigationAction label="Perfil" value="profile" icon={<AccountCircleRoundedIcon />} />
      <BottomNavigationAction label="Actividades" value="activities" icon={<AppsRoundedIcon />} />
    </BottomNavigation>
  );
}