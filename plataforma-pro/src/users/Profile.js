import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import MeasurementTable from './MeasurementTable';
import UrlInteligente from '../url';
import Grafico from './PreGrafico';

import TodoData from './data';
const useStyles = makeStyles(theme => ({
  container: {
      display: 'flex',
      flexWrap: 'wrap',
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
    maxWidth: "800px",
    minWidth: "300px",
    margin: "auto",
    paddingLeft: "10%",
    paddingRight: "10%",
    paddingTop: "2%",
    paddingBottom: "2%",
  },
  sectionTitle: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
  },
  textFieldFullWidth: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  datePicker: {
      minWidth: "200px",
  },
  checkbox: {
    marginLeft: theme.spacing(6),
    marginRight: theme.spacing(1),
  },
  inputLabel: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
  },
  dense: {
      marginTop: "0px",
  },
  menu: {
      width: 200,
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
      color: theme.palette.text.secondary,
  },
  buttons: {
      padding: theme.spacing(1),
  },
  button: {
      border: 1,
      margin: theme.spacing(2),
  },
  select: {
    minWidth: "200px",
  },
  textBox: {
    marginTop: theme.spacing(2),
  }
}));

export default function Profile(props) {
    let { nroPaciente, modoPaciente } = props;
    if (modoPaciente) {
        nroPaciente = "4";
    }
    const url = UrlInteligente.obtenerUrl('pacientes',`/clientes/${nroPaciente}`);
    const [state, setState] = useState(props);
    const [loading, setLoading] = useState(true);
    const classes = useStyles();
    const handleCheck = name => event => {
        setState({ ...state, [name]: event.target.checked });
    };
    const handleChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        setState(oldState => ({
            ...oldState,
            [name]: value,
        }));
    };
    useEffect(() => {
        async function fetchApi() {
            try {
                setLoading(true);
                const res = await fetch(url);
                await res.json()
                .then(json => { setState(json); console.log(json); });
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        }
        fetchApi();
    }, [url]);
    const handleAccept = () => {
        const today = new Date();
        const updateDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const form = {
            nombre: state.nombre,
            apellido: state.apellido,
            dni: state.dni,
            email: state.email,
            telefono: state.telefono,
            direccion: state.direccion,
            fecha_nacimiento: state.fecha_nacimiento,
            genero: state.genero,
            comentarios: state.comentarios,
            obra_social: state.obra_social,
            numero_obra_social: state.numero_obra_social,
            plan_obra_social: state.plan_obra_social,
            updated_at: updateDate,
        }
        fetch( url, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        })
        alert("Sus cambios han sido guardados")
    }
  return (
    <Container component="main">
      <Grid container spacing={2}>
        <Grid item xs={12}>
            <h1>Perfil</h1>
        </Grid>
        <Grid item  xs={12} md={6} lg={6}>
            <Paper className={classes.root}>
                <form className={classes.container} noValidate autoComplete="off">
                    <Grid item xs={12}>
                        <Typography variant="h6" className={classes.sectionTitle}>Datos Personales</Typography>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <FormControl>
                            <TextField
                                id="nombre"
                                name="nombre"
                                label="Nombre"
                                className={clsx(classes.dense)}
                                margin="normal"
                                value= {state.nombre || ''}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <FormControl>
                            <TextField
                                id="apellido"
                                name="apellido"
                                label="Apellido"
                                className={clsx(classes.dense)}
                                margin="normal"
                                value= {state.apellido || ''}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <FormControl>
                            <TextField
                                id="dni"
                                name="dni"
                                label="DNI"
                                className={clsx(classes.dense)}
                                margin="normal"
                                value= {state.dni || ''}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <FormControl>
                            <TextField
                                id="fecha_nacimiento"
                                name="fecha_nacimiento"
                                label="Fecha de nacimiento"
                                type="date"
                                value= {state.fecha_nacimiento || ''}
                                className={clsx(classes.datePicker)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <FormControl>
                        <InputLabel htmlFor="type">Genero</InputLabel>
                            <Select className={clsx(classes.dense, classes.select)}
                                value={state.genero || ''}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'genero',
                                    id: 'genero',
                                }}
                            >
                                <MenuItem value={'male'}>Masculino</MenuItem>
                                <MenuItem value={'female'}>Femenino</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <FormControl>
                            <TextField
                                id="telefono"
                                name="telefono"
                                label="Telefono"
                                margin="normal"
                                className={clsx(classes.dense)}
                                value= {state.telefono || ''}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={12}  className={clsx(classes.textFieldFullWidth)}>
                        <FormControl fullWidth>
                            <TextField
                                id="email"
                                name="email"
                                label="E-mail"
                                margin="normal"
                                value= {state.email || ''}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={12}  className={clsx(classes.textFieldFullWidth)}>
                        <FormControl fullWidth>
                            <TextField
                                id="direccion"
                                name="direccion"
                                label="Domicilio"
                                margin="normal"
                                value= {state.direccion || ''}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={12}>
                        <Typography variant="h6" className={classes.sectionTitle}>Obra Social</Typography>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <FormControl>
                            <InputLabel htmlFor="type" className={clsx(classes.dense)}>Prepaga</InputLabel>
                            <Select className={clsx(classes.dense, classes.select)}
                                value={state.obra_social || ''}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'obra_social',
                                    id: 'obra_social',
                                }}
                            >
                                <MenuItem value={'OSDE'}>OSDE</MenuItem>
                                <MenuItem value={'SWISS MEDICAL'}>Swiss Medical</MenuItem>
                                <MenuItem value={'GALENO'}>Galeno</MenuItem>
                                <MenuItem value={'MEDIFE'}>Medife</MenuItem>
                                <MenuItem value={'OMINT'}>Omint</MenuItem>
                                <MenuItem value={'ACCORD'}>Accord</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <FormControl>
                            <TextField
                                id="plan_obra_social"
                                name="plan_obra_social"
                                label="Plan"
                                className={clsx(classes.dense)}
                                margin="normal"
                                value= {state.plan_obra_social || ''}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <FormControl>
                            <TextField
                                id="numero_obra_social"
                                name="numero_obra_social"
                                label="Numero de Socio"
                                className={clsx(classes.dense)}
                                margin="normal"
                                value= {state.numero_obra_social || ''}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    {/* <Grid item xs={12} lg={12}>
                        <Typography variant="h6" className={classes.sectionTitle}>Condiciones Especiales</Typography>
                    </Grid> */}
                    {/* <Grid item xs={6} lg={6}>
                        <FormControl component="fieldset" >
                            <FormControlLabel className={clsx(classes.checkbox)}  
                                control={
                                    <Checkbox color="primary" 
                                        checked={state.celiac}
                                        onChange={handleCheck("celiac")}
                                        value={"celiac"}
                                        name="celiac"
                                    />
                                }
                                label="Celiaquía"
                                labelPlacement="end"
                            />
                            <FormControlLabel className={clsx(classes.checkbox)}  
                                control={
                                    <Checkbox color="primary" 
                                        checked={state.bulimic}
                                        onChange={handleCheck("bulimic")}
                                        value={"bulimic"}
                                        name="bulimic"
                                    />
                                }
                                label="Bulimia"
                                labelPlacement="end"
                            />
                            <FormControlLabel className={clsx(classes.checkbox)}  
                                control={
                                    <Checkbox color="primary" 
                                        checked={state.diabetic}
                                        onChange={handleCheck("diabetic")}
                                        value={"diabetic"}
                                        name="diabetic"
                                    />
                                }
                                label="Diabetes"
                                labelPlacement="end"
                            />
                        </FormControl>
                    </Grid> */}
                    {/* <Grid item xs={3} lg={3}>
                        <FormControl component="fieldset" >
                            <FormControlLabel className={clsx(classes.checkbox)}  
                                control={
                                    <Checkbox color="primary" 
                                        checked={state.anorexy}
                                        onChange={handleCheck("anorexy")}
                                        value={"anorexy"}
                                        name="anorexy"
                                    />
                                }
                                label="Anorexia"
                                labelPlacement="end"
                            />
                            <FormControlLabel className={clsx(classes.checkbox)}  
                                control={
                                    <Checkbox color="primary" 
                                        checked={state.atherosclerosis}
                                        onChange={handleCheck("atherosclerosis")}
                                        value={"atherosclerosis"}
                                        name="atherosclerosis"
                                    />
                                }
                                label="Aterosclerosis"
                                labelPlacement="end"
                            />
                            <FormControlLabel className={clsx(classes.checkbox)}  
                                control={
                                    <Checkbox color="primary" 
                                        checked={state.obesity}
                                        onChange={handleCheck("obesity")}
                                        value={"obesity"}
                                        name="obesity"
                                    />
                                }
                                label="Obesidad"
                                labelPlacement="end"
                            />
                        </FormControl>
                    </Grid> */}
                    <Grid item xs={12} lg={12}>
                        <FormControl fullWidth className={clsx(classes.textBox)}>
                            <TextField
                                id="comentarios"
                                name="comentarios"
                                label="Comentarios"
                                value= {state.comentarios || ''}
                                onChange={handleChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                multiline
                                rows="4"
                                placeholder="Ingrese aquí cualquier informacion que considere relevante (ej. si tiene alergias, es diabetico, celiaco, etc.)"
                                variant="outlined"
                            />
                        </FormControl>
                    </Grid>
                </form>
                <Grid item xs={12} className={classes.buttons}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<SaveIcon />}
                        onClick={handleAccept}
                        > Guardar
                    </Button>
                </Grid>
            </Paper>
        </Grid>
        <Grid item xs={12} lg={6}>
            <MeasurementTable nroPaciente={nroPaciente}/>
        </Grid>
      </Grid>
        <Grid item xs={12}>
            <Grafico nroPaciente={nroPaciente} />
        </Grid>
    </Container>
  );
}
