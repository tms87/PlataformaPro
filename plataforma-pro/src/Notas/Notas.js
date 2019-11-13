import React, {useState, useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AddIcon from '@material-ui/icons/Add';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import NotasForm from './NotasForm'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import UrlNgrok from 'url';

const url = UrlNgrok + '/recetas/';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    maxWidth: "600px",
  },
}));

export default function Notas(props) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [templates, setTemplates] = useState(null);
  const [error, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refresh,setRefresh] = useState(false);
  const { nroPaciente } = props;
  console.log(nroPaciente);

  const url =UrlNgrok +  '/profesional/35/cliente/${nroPaciente}';

  useEffect(() => {
      fetchApi();
      setRefresh(false);
  },[refresh]);

  async function fetchApi() {
    try {
      setLoading(true);
      const res = await fetch(url);
      await res.json()
      .then(json => {setData(json);});
    } catch (e){
      setErrors(e);
    } finally {
      setLoading(false);
    }
  }

 
  function toString(json){
    if (json != null){
      return JSON.stringify(json).replace(/"/g,'')
    }
    return "";
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const handleUpdate = () => {
    setAnchorEl(null);
    /* setData([]); */
    setTimeout(()=>setRefresh(true),1000);
  }
 
  return (<Container>
    <CssBaseline />
    <h1>Actividades</h1>
    <BottomNavigationAction label="Perfil" value="profile" icon={<AddIcon fontSize= 'large' aria-describedby={id} variant="contained" onClick={handleClick} />} />
    <Popper id={id} open={open} anchorEl={anchorEl} transition>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper className={classes.root}>
            <Typography className={classes.typography}>Para modificar las notas haga click </Typography>
            <NotasForm 
              handleAccept={handleUpdate}
              handleCancel={handleClose}
              isBoarding= {true}
              useTemplate= {false}
              setState={setData}
            /*  templates= {templates}*/
              nroPaciente={props.nroPaciente}
            />
          </Paper>
        </Fade>
      )}
    </Popper>
    {(loading)?"loading...":
      <Grid container spacing={3}
        >
        {data.map((item,key) => 
          <Grid item xs={12}>
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
                    value={toString(data.contenido)}
                    disabled="true"
                    />
                    <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                    onClick={handleClick}
                    > Modificar
                    </Button>
          </Grid>
        )}
      </Grid>
    }
  </Container>);
}