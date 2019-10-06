import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { useStyles } from '../login';

export default function Activities() {
  const classes = useStyles();
  return (<Container component="main" maxWidth="xs">
    <CssBaseline />
    <h1>Activities</h1>
  </Container>);
}
