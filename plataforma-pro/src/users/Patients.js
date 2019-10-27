import React from 'react';
//import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
//import { useStyles } from '../login';
import UsersTable from './UsersTable';

export default function Patients(props) {
  //const classes = useStyles();

  return (
    <Container component="main">
      {/*<CssBaseline />*/}
      <h1>Patients</h1>
      <UsersTable page={props.page} setPage={props.setPage}/>
      <br/>
    </Container>
  );
}
