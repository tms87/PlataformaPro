import React, {useState} from 'react';
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
  },
  sectionTitle: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
  },
  checkbox: {
   /*  margin: "auto", */
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
      padding: "10px",
  }
}));
export default function Profile(props) {
  const [state, setState] = useState(props);
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

  const handleAccept = () => {

  }
  return (
    <Container component="main">
      <Grid container spacing={2}>
        <Grid item xs={12}>
            <h1>Perfil</h1>
        </Grid>
        <Grid item direction="row" xs={12} md={6} lg={6}>
            <Paper className={classes.root}>
                <form className={classes.container} noValidate autoComplete="off">
                    <Grid item xs={12}>
                        <Typography variant="h6" className={classes.sectionTitle}>Datos Personales</Typography>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <FormControl>
                            <TextField
                                id="name"
                                name="name"
                                label="Nombre"
                                className={clsx(classes.textField, classes.dense)}
                                margin="normal"
                                value= {state.name || ''}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <FormControl>
                            <TextField
                                id="surname"
                                name="surname"
                                label="Apellido"
                                className={clsx(classes.textField, classes.dense)}
                                margin="normal"
                                value= {state.surname || ''}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <FormControl>
                            <TextField
                                id="email"
                                name="email"
                                label="E-mail"
                                className={clsx(classes.textField, classes.dense)}
                                margin="normal"
                                value= {state.email || ''}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <FormControl>
                            <TextField
                                id="phone"
                                name="phone"
                                label="Telefono"
                                className={clsx(classes.textField, classes.dense)}
                                margin="normal"
                                value= {state.phone || ''}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <FormControl>
                            <TextField
                                id="profesional"
                                name="profesional"
                                label="Nutricionista"
                                disabled= "true"
                                className={clsx(classes.textField, classes.dense)}
                                margin="normal"
                                value= {state.profesional || ''}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <FormControl>
                            <InputLabel htmlFor="type" className={clsx(classes.textField, classes.dense)}>Objetivo</InputLabel>
                            <Select className={clsx(classes.textField, classes.dense, classes.select)}
                                value={state.type || ''}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'type',
                                    id: 'type',
                                }}
                            >
                            <MenuItem value={1}>Reducir mi peso</MenuItem>
                            <MenuItem value={2}>Aumentar mi peso</MenuItem>
                            <MenuItem value={3}>Cuidar mi salud</MenuItem>
                            <MenuItem value={4}>Complementar mi entrenamiento</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={12}>
                        <Typography variant="h6" className={classes.sectionTitle}>Condiciones Especiales</Typography>
                    </Grid>
                    <Grid item xs={6} lg={6}>
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
                    </Grid>
                    <Grid item xs={3} lg={3}>
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
                    </Grid>
                    <Grid item xs={12} lg={12}>
                        <FormControl fullWidth className={classes.textField}>
                            <TextField
                                id="allergyText"
                                name="allergies"
                                label="Alergias"
                                value= {state.allergies || ''}
                                onChange={handleChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                multiline
                                rows="4"
                                placeholder="Ingrese aquí sus alergias"
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
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<DeleteIcon />}
                        onClick={state.handleCancel}
                    > Cancelar
                    </Button>
                </Grid>
            </Paper>
        </Grid>
        <Grid item xs={12} lg={6}>
            <MeasurementTable/>
        </Grid>
      </Grid>
    </Container>
  );
}
