import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import UrlInteligente from '../url';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
    zIndex: '999',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    /* width: 200, */
  },
  inputLabel: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    /* width: 200, */
  },
  dense: {
    marginTop: "0px",
    /* width: 200, */
  },
  menu: {
    width: 200,
  },
  formControl: {
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(1),
    /* margin: theme.spacing(1), */
    minWidth: 300,
    maxWidth: 800,
  },
  template: {
    minWidth: 100,
    maxWidth: 300,
    width: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  buttons: {
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    border: 1,
    margin: theme.spacing(2),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));


export default function ResetaForm(props) {
  const classes = useStyles();
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(UrlInteligente.obtenerUrl('productoReceta', '/recetaproductos/receta/') + props.recetaId, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      const fetchedProducts = await res.json();
      setProductos(fetchedProducts);
    }
    fetchData();
  }, [])

  return (
    <div className={classes.root}>
      <Grid container spacing={3} style={{ maxWidth: '450px' }}>
        <Grid item xs={12} >
          {props.content}
          <IconButton onClick={props.handleCancel} style={{ float: 'right' }}>
            <ClearIcon />
          </IconButton>
        </Grid>
        {(productos.length !== 0) ? "" : <Paper className={classes.paper} style={{ maxWidth: '450px' }}>
          {productos.map(data =>
            <Chip
              key={data.id}
              label={data.nombre}
              className={classes.chip}
            />
          )}
        </Paper>}
      </Grid>
    </div>
  );
}