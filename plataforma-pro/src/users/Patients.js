import React from 'react';
import Container from '@material-ui/core/Container';
import UsersTable from './UsersTable';

export default function Patients(props) {
  return (
    <Container component="main" style={{paddingTop: '3vh'}}>
      <UsersTable page={props.page} setPage={props.setPage} nroPaciente={props.nroPaciente} setNroPaciente={props.setNroPaciente}/>
    </Container>
  );
}
