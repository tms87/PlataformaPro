import React, {useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
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
        width: 200,
    },
    dense: {
        marginTop: 19,
        width: 200,
    },
    menu: {
        width: 200,
    },
    formControl: {
        margin: theme.spacing(2),
        minWidth: 120,
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
    /* const [state, setState] = useState(props); */
    const classes = useStyles();

    const handleChange = event => {
        props.setState(oldState => ({
          ...oldState,
          [event.target.name]: event.target.value,
        }));
    };
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <form className={classes.container} noValidate autoComplete="off">
                    <Grid item xs={12}>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="title"
                                label="Titulo"
                                className={clsx(classes.textField, classes.dense)}
                                margin="dense"
                                defaultValue= {props.title}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="type">Tipo</InputLabel>
                        <Select
                        value={props.type}
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
                    <Grid item xs={12} className={classes.buttons}>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<SaveIcon />}
                            onClick={props.handleCancel}
                            > Aceptar
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            startIcon={<DeleteIcon />}
                            onClick={props.handleCancel}
                            > Cancelar
                        </Button>
                    </Grid>
                </form>
            </Grid>
        </div>
    );
}