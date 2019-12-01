import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import ActivityCard from '../components/ActivityCard';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import ActivityForm from './ActivityForm';
import Grid from '@material-ui/core/Grid';
import UrlInteligente from '../url';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CircularProgress from '@material-ui/core/CircularProgress';

//const url = 'http://b95ec43e.ngrok.io/api';
//const url = UrlInteligente.obtenerUrl('actividades', `/actividades/profesional/35/cliente/`); // 'http://www.mocky.io/v2/5da7592b2f00007c0036845c';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    maxWidth: "600px",
  },
}));

export default function Activities(props) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  //const [data2] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [switchState, setSwitchState] = useState(false);
  let url = "";
  let { nroPaciente, modoPaciente } = props;

  if (modoPaciente) {
    nroPaciente = "4";
  }

  if (modoPaciente) {
    url = UrlInteligente.obtenerUrl('actividades', `/actividades/cliente/4`);
  } else {
    url = UrlInteligente.obtenerUrl('actividades', `/actividades/profesional/35/cliente/${nroPaciente}`);
  }
  console.log(url);
  useEffect(() => {
    async function fetchApi() {
      try {
        setLoading(true);
        const res = await fetch(url);
        await res.json()
          .then(json => { setData(json); console.log(json); });
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    fetchApi();
    getTemplates();
    setRefresh(false);
  }, [refresh, url]);


  async function getTemplates() {
    try {
      setLoading(true);
      const urlT = UrlInteligente.obtenerUrl('templates', '/actividades/profesional/35/templates');
      const res = await fetch(urlT);
      const response = await res.json();
      setTemplates(response);
    } catch (e) {
      console.log(e);
    } finally {
      /* Agrego un array vacio al estado de los temples porque si no la funcion map del section, tira erro y no abre el pop */
      //setTemplates([])
      setLoading(false);
    }
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
    setTimeout(() => setRefresh(true), 1000);
  }

  const handleChangeSwitch = (swcState) => {
    setSwitchState(swcState);
  }

  return (<Container>
    <CssBaseline />
    <h1>{modoPaciente ? "Actividades de Julian Perez" : "Actividades de " + props.nombrePaciente }</h1>
    {!modoPaciente ? /* <BottomNavigationAction label="Perfil" value="profile" icon={<AddIcon fontSize= 'large' aria-describedby={id} variant="contained" onClick={handleClick} />} />  */
      <div>
        <Button variant="contained" color="primary" onClick={handleClick} className={classes.button}>
          Agregar nueva actividad
      </Button>
        <FormControlLabel style={{ marginLeft: "15px" }}
          control={
            <Switch
              onChange={() => handleChangeSwitch(!switchState)}
              value={switchState}
              color="primary"
            />
          }
          label={switchState ? "Actividades Realizadas" : "Actividades a Realizar"} />
      </div>
      :
      <FormControlLabel
        control={
          <Switch
            onChange={() => handleChangeSwitch(!switchState)}
            value={switchState}
            color="primary"
          />
        }
        label={switchState ? "Actividades Realizadas" : "Actividades a realizar"} />
    }
    <br /><br />
    <Popper id={id} open={open} anchorEl={anchorEl} transition>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper className={classes.root}>
            <Typography className={classes.typography}>Para crear una nueva actividad complete los datos o seleccione una plantilla</Typography>
            {console.log(templates)}
            <ActivityForm
              handleAccept={handleUpdate}
              handleCancel={handleClose}
              isBoarding={true}
              useTemplate={false}
              setState={setData}
              templates={templates}
              nroPaciente={props.nroPaciente}
            />
          </Paper>
        </Fade>
      )}
    </Popper>
    {(loading) ? <CircularProgress /> :
      <Grid container spacing={3}>
        {switchState ?
          data.map((item, key) =>
            item.finalizada ?
              <Grid item xs={12}>
                <ActivityCard
                  key={key}
                  handleUpdate={handleUpdate}
                  activityId={(loading) ? "" : item.id}
                  title={(loading) ? "loading..." : item.titulo}
                  description={(loading) ? "loading..." : item.descripcion}
                  content={(loading) ? "loading..." : item.contenido}
                  type={(loading) ? "loading..." : item.tipo_id}
                  startDate={(loading) ? "loading..." : item.fecha_inicio}
                  switchState={switchState}
                  modoPaciente={modoPaciente}
                />
              </Grid>
              : ""
          )
          :
          data.map((item, key) =>
            item.finalizada ? "" :
              <Grid item xs={12}>
                <ActivityCard
                  key={key}
                  handleUpdate={handleUpdate}
                  activityId={(loading) ? "" : item.id}
                  title={(loading) ? "loading..." : item.titulo}
                  description={(loading) ? "loading..." : item.descripcion}
                  content={(loading) ? "loading..." : item.contenido}
                  type={(loading) ? "loading..." : item.tipo_id}
                  startDate={(loading) ? "loading..." : item.fecha_inicio}
                  switchState={switchState}
                  modoPaciente={modoPaciente}
                />
              </Grid>
          )
        }
      </Grid>
    }
  </Container>);
}