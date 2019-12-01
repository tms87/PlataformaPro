import React, {useState} from 'react';
import Container from '@material-ui/core/Container';
import Activities from './activities/Activities';
import Templates from './activities/Templates';
import Profile from './users/Profile';
import Patients from './users/Patients';
import Recetas from './recetas/Recetas';
import { makeStyles } from '@material-ui/core/styles';
import Home from './HomeMenu/Home';
import Producto from './productos/productos';
import Notas from './Notas/Notas';
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    marginBottom: theme.spacing(3, 2),
  },
}));

export default function Body(props) {
  const classes = useStyles();

  const [nroPaciente, setNroPaciente] = useState("");

  return (
    <Container component="main" maxWidth="xl" className={classes.root}>
      {(props.page === "home" && <Home page={props.page} setPage={props.setPage} modoPaciente={props.modoPaciente}/>)
        || (props.page === "profile" && <Profile page={props.page} setPage={props.setPage} nroPaciente={nroPaciente} setNroPaciente={setNroPaciente} modoPaciente={props.modoPaciente}/>)
        || (props.page === "patients"  && <Patients page={props.page} setPage={props.setPage} nroPaciente={nroPaciente} setNroPaciente={setNroPaciente}/>)
        || (props.page === "activities" && <Activities page={props.page} setPage={props.setPage} nroPaciente={nroPaciente} modoPaciente={props.modoPaciente}/>)
        || (props.page === "templates" && <Templates page={props.page} setPage={props.setPage}/>)
        ||  (props.page === "recetas" && <Recetas page={props.page} setPage={props.setPage} modoPaciente={props.modoPaciente}/>)
        || (props.page === "productos" && <Producto   page={props.page} setPage={props.setPage} modoPaciente={props.modoPaciente}/>)
        || (props.page === "notas" && <Notas   page={props.page} setPage={props.setPage} nroPaciente={nroPaciente} modoPaciente={props.modoPaciente}/>)
      }
   </Container>
  );
}
