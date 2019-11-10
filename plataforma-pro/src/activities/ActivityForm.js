import React, {useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        flexGrow: 1,
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
    },
    button: {
        border: 1,
        margin: theme.spacing(2),
    },
  }));

  
  export default function ActivityForm(props) {
    const [state, setState] = useState(props);
    const classes = useStyles();

    const handleAccept = () => {
        console.log(state.title)
        const today = new Date();
        const startDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const endpoint = (state.isBoarding)?"":state.activityId;
        const form = {
            titulo: state.title,
            contenido: state.content,
            descripcion: state.description,
            tipo_id: state.type,
            cliente_id: "25",
            profesional_id: "35",
            fecha_inicio: startDate,
        }
        console.log(form)
        console.log('http://beec83ba.ngrok.io/api/actividades/'+endpoint)
        fetch('http://beec83ba.ngrok.io/api/actividades/'+endpoint,{
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        })
        fetch('https://lalalal.free.beeceptor.com/api/actividades/'+endpoint,{
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
        
        console.log(state.title +" "+event.target.name+" "+event.target.value)
    };

    const handleTemplate = event => {
        
    }
    const handleCheck = name => event => {
        setState({ ...state, [name]: event.target.checked });
        console.log(event.target.checked);
    };
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <form className={classes.container} noValidate autoComplete="off">
                    { state.isBoarding && (
                        <Grid className={classes.formControl}>
                            <FormControlLabel className={classes.formControl}  
                                control={
                                    <Checkbox color="primary" 
                                        checked={state.useTemplate}
                                        disabled={(state.newTemplate === true)?true:false}
                                        onChange={handleCheck("useTemplate")}
                                        value={"useTemplate"}
                                    />
                                }
                                label="Crear desde una Plantilla"
                                labelPlacement="end"
                            />
                            <FormControl className={classes.template}>
                                <InputLabel htmlFor="template" className={clsx(classes.textField, classes.dense)}>Template</InputLabel>
                                <Select
                                    value={state.template}
                                    onChange={handleTemplate}
                                    inputProps={{
                                        name: 'template',
                                        id: 'template',
                                    }}
                                    disabled={(state.useTemplate === false)?true:false}
                                >
                                    <MenuItem value={1}>Celiacos</MenuItem>
                                    <MenuItem value={2}>Deportistas</MenuItem>
                                    <MenuItem value={3}>Exceso de peso moderado</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="title"
                                name="title"
                                label="Titulo"
                                className={clsx(classes.textField, classes.dense)}
                                margin="normal"
                                value= {state.title}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="description"
                                name="description"
                                label="Descripcion"
                                className={clsx(classes.textField, classes.dense)}
                                margin="dense"
                                value= {state.description}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="type" className={clsx(classes.textField, classes.dense)}>Tipo</InputLabel>
                            <Select className={clsx(classes.textField, classes.dense)}
                                value={state.type}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'type',
                                    id: 'type',
                                }}
                            >
                            <MenuItem value={1}>Plan Alimenticio</MenuItem>
                            <MenuItem value={2}>Registro Alimenticio</MenuItem>
                            <MenuItem value={3}>Solicitud de Estudio</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                        <TextField
                            id="content"
                            label="Detalle"
                            name="content"
                            style={{ margin: 8, width:500 }}
                            placeholder="Ingrese aquí los detalles de la actividad"
                            fullWidth
                            multiline
                            rows="4"
                            margin="normal"
                            variant="outlined"
                            value={state.content}
                            onChange={handleChange}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                    </FormControl>
                    </Grid>
                    { state.isBoarding && (
                        <Grid>
                            <FormControlLabel className={classes.formControl}
                                control={
                                    <Checkbox color="primary" 
                                        checked={state.newTemplate}
                                        disabled={(state.useTemplate === true)?true:false}
                                        onChange={handleCheck("newTemplate")}
                                        value={"newTemplate"}
                                    />
                                }
                                label="Guardar como Plantilla"
                                labelPlacement="end"
                                />
                        </Grid>
                    )}
                    <Grid item xs={12} className={classes.buttons}>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<SaveIcon />}
                            onClick={handleAccept}
                            > Aceptar
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
                </form>
            </Grid>
        </div>
    );
}