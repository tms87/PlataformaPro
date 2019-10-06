import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { useStyles } from './login';
import Activities from './activities/Activities';
import Profile from './users/Profile';

export default function Home(props) {
  const classes = useStyles();
  return (
  <body>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {props.page == "profile"?<Profile/>:<Activities/>}
    </Container>
  </body>);
}
