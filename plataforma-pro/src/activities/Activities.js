import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { useStyles } from '../login';
import ActivityCard from '../components/ActivityCard';

export default function Activities() {
  //const classes = useStyles();
  return (<Container component="main" maxWidth="xs">
    <CssBaseline />
    <h1>Actividades</h1>
    <ActivityCard 
      title='Registro Alimenticio'
      content='contenido breve'
      extendedContent='Detalle de las comidas'
      />
    <br/>
    <ActivityCard 
      title='Solicitud de Estudios'
      content='contenido breve'
      extendedContent='Detalle del estudio'
      />
    <br/>
    <ActivityCard 
      title='Plan Alimenticio'
      content='contenido breve'
      extendedContent='Detalle de la dieta'
      />
    <br/>
  </Container>);
}
