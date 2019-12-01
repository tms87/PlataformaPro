import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ProductosList from './ProductosList';
import UrlInteligente from '../url';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
    zIndex:'999',
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
    display:'flex',
    justifyContent:'center',
  },
  button: {
    border: 1,
    margin: theme.spacing(2),
  },
}));


export default function ResetaForm(props) {
  const [state, setState] = useState(props);
  const classes = useStyles();
  const [productos, setProductos] = useState([]);

  const handleAccept = () => {
    const today = new Date();
    const startDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const endpoint = (state.isBoarding) ? "" : state.resetaId;
    console.log("Este es el end point" + endpoint)

    const form = {
      tipo_id: "49",
      profesional_id: "35",
      contenido: state.content,
      fecha_inicio: startDate,
      titulo: state.title,
    }

    console.log(form);

    fetch(UrlInteligente.obtenerUrl('recetasForm', '/recetas/') + endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
    state.handleAccept();
  }
  const handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    setState(oldState => ({
      ...oldState,
      [name]: value,
    }));

    console.log(state.title + " " + event.target.name + " " + event.target.value)
  };

  const handleAddChip = (chip) => {
    productos.push(chip);
    setProductos(productos);
  }

  const handleDeleteChip = (chip, index) => {
    productos.splice(index, 1);
    setProductos([...productos]);
  }


  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} >
            {props.content}
        </Grid>
          <Grid item xs={12} className={classes.buttons}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<DeleteIcon />}
              onClick={state.handleCancel}
            > Cerrar
            </Button>
          </Grid>
      
      </Grid>
    </div>
  );
}