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
import UrlNgrok from 'url';


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

  
  export default function NotasForm(props) {
    const [state, setState] = useState(props);
    const classes = useStyles();

    function toString(json){
        if (json != null){
            return JSON.stringify(json).replace(/"/g,'')
        }
        return "";
    }
    
    const handleAccept = () => {
        //console.log(state.title)
        const today = new Date();
        const startDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const endpoint = (state.isBoarding)?"":state.activityId;
        //console.log("Este es el end point" + endpoint);
        //console.log("INSERTAR " + state.description + state.type + state.content);
        const form = {
            titulo: state.title,
            contenido: state.content,
            descripcion: state.description,
            tipo_id: state.type,
            cliente_id: props.nroPaciente,
            profesional_id: "35",
            template: state.newTemplate,
            fecha_inicio: startDate,
        }
        fetch(UrlNgrok + '/Notas',{
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
    };

    const handleUseTemplate = event => {
        const name = event.target.name;
        const value = event.target.value;
        const te = props.templates.filter(temp=> temp.id == value)
        setState(oldState => ({
          ...oldState,
          [name]: value,
          title: te[0].titulo,
          description: te[0].descripcion,
          type: te[0].tipo_id,
          content: te[0].contenido,
        }));
    }
    
    const handleCheck = name => event => {
        setState({ ...state, [name]: event.target.checked });
    };
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <form className={classes.container} noValidate autoComplete="off">
             
                    <Grid item xs={12}>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="title"
                                name="title"
                                label="Titulo"
                                className={clsx(classes.textField, classes.dense)}
                                margin="normal"
                                value= {state.title || ''}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
              
                 
                    { state.isBoarding && (
                        <Grid>
                           <TextField
                                id="outlined-multiline-static"
                                label="Notas"
                                multiline
                                rows="15"
                                fullWidth="true"
                                placeholder="Escribe algunas notas..."
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                value={state.contenido}
                                disabled="true"
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