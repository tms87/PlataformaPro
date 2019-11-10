import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Activities from './activities/Activities';
import Templates from './activities/Templates';
import Profile from './users/Profile';
import Patients from './users/Patients';
import Recetas from './recetas/Recetas';
import { makeStyles } from '@material-ui/core/styles';
import Home from './Home';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    marginBottom: theme.spacing(3, 2),
  },
}));

export default function Body(props) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xl" className={classes.root}>
      {<CssBaseline />}
      {(props.page === "home" && <Home page={props.page} setPage={props.setPage}/>)
        || (props.page === "profile" && <Profile page={props.page} setPage={props.setPage}/>)
        || (props.page === "patients" && <Patients page={props.page} setPage={props.setPage}/>)
        || (props.page === "activities" && <Activities page={props.page} setPage={props.setPage}/>)
        || (props.page === "templates" && <Templates page={props.page} setPage={props.setPage}/>)
        ||  (props.page === "recetas" && <Recetas page={props.page} setPage={props.setPage}/>)
      }
   </Container>
  );
}
