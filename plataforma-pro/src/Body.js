import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { useStyles } from './login';
import Activities from './activities/Activities';
import Profile from './users/Profile';
import Patients from './users/Patients';

export default function Body(props) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xl">
      {<CssBaseline />}  
      {(props.page == "profile" && <Profile/>)
        || (props.page == "patients" && <Patients page={props.page} setPage={props.setPage}/>)
        || (props.page == "activities" && <Activities/>)
      }
   </Container>
  );
}
