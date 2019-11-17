import React, {useState, useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import ActivityCard from '../components/ActivityCard';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AddIcon from '@material-ui/icons/Add';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import ActivityForm from './ActivityForm';
import Grid from '@material-ui/core/Grid';
import UrlInteligente from '../url';
//const url = 'http://b95ec43e.ngrok.io/api';
const url =  UrlInteligente.obtenerUrl('actividades', `/actividades/profesional/35/cliente/`); // 'http://www.mocky.io/v2/5da7592b2f00007c0036845c';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    maxWidth: "600px",
  },
}));

export default function Activities(props) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [templates, setTemplates] = useState(null);
  const [error, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refresh,setRefresh] = useState(false);
  let { nroPaciente , modoPaciente } = props;

  if(modoPaciente) {
    nroPaciente = "4";
  }

  const url = UrlInteligente.obtenerUrl('actividades' ,`/actividades/profesional/35/cliente/${nroPaciente}`) ; //
  console.log(url);
  useEffect(() => {
      fetchApi();
      getTemplates();
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

  async function getTemplates() {
    try {
      setLoading(true);
      const urlT =  UrlInteligente.obtenerUrl('', '/actividades/profesional/35/templates');
      const res = await fetch(urlT);
      await res.json()
      .then(json => {  setTemplates(json); });
    } catch (e){
      setErrors(e);
    } finally {
      /* Agrego un array vacio al estado de los temples porque si no la funcion map del section, tira erro y no abre el pop */
      setTemplates([]) 
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
    {!modoPaciente ? <BottomNavigationAction label="Perfil" value="profile" icon={<AddIcon fontSize= 'large' aria-describedby={id} variant="contained" onClick={handleClick} />} /> : ""}
    <Popper id={id} open={open} anchorEl={anchorEl} transition>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper className={classes.root}>
            <Typography className={classes.typography}>Para crear una nueva actividad complete los datos o seleccione una plantilla</Typography>
            <ActivityForm 
              handleAccept={handleUpdate}
              handleCancel={handleClose}
              isBoarding= {true}
              useTemplate= {false}
              setState={setData}
              templates= {templates}
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
            <ActivityCard 
              key={key}
              handleUpdate={handleUpdate}
              activityId={(loading)?"":toString(item.id)}
              title= {(loading)?"loading...":toString(item.titulo)}
              description={(loading)?"loading...":toString(item.descripcion)}
              content={(loading)?"loading...":toString(item.contenido)}
              type={(loading)?"loading...":toString(item.tipo_id)}
              startDate={(loading)?"loading...":toString(item.fecha_inicio)}
              /* media= {true} */
            />
          </Grid>
        )}
      </Grid>
    }
  </Container>);
}