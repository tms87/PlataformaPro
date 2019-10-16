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

//const url = 'http://b50eae7d.ngrok.io/api/actividades/profesional/3/cliente/20';
const url = 'http://www.mocky.io/v2/5da7592b2f00007c0036845c';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
}));

export default function Activities(props) {
  const classes = useStyles();
  const [data, setData] = useState({
    activities:[{
      id: "",
      cliente_id: "",
      profesional_id: "",
      contenido: "",
      created_at: "",
      updated_at: "",
      tipo_id: "",
    }]
  });
  const [hasError, setErrors] = useState(false);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
      fetchApi();
  },[]);

  async function fetchApi() {
    try {
      setLoading(true);
      const res = await fetch(url);
      res.json()
        .then(json => setData(json))
    } catch (e){
      setErrors(e);
    } finally {
      setLoading(false);
    }
  }
  

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (<Container component="main" maxWidth="xs">
    <CssBaseline />
    <h1>Actividades<BottomNavigationAction label="Perfil" value="profile" icon={<AddIcon fontSize= 'large' aria-describedby={id} variant="contained" onClick={handleClick} />} /></h1>
    <Popper id={id} open={open} anchorEl={anchorEl} transition>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper className={classes.root}>
            <Typography className={classes.typography}>Complete los datos para crear una nueva actividad</Typography>
            <ActivityForm handleCancel={handleClick}/>
          </Paper>
        </Fade>
      )}
    </Popper>
    <ActivityCard 
      title='Registro Alimenticio'
      content={JSON.stringify((loading)?"loading...":data.activities[0].contenido)}
      type='2'
      extendedContent='Detalle de las comidas'
      media= {true}
      />
    <br/>
    <ActivityCard 
      title='Solicitud de Estudios'
      content='contenido breve'
      type='3'
      extendedContent='Detalle del estudio'
      media= {false}
      />
    <br/>
    <ActivityCard 
      title='Plan Alimenticio'
      content='contenido breve'
      type='2'
      extendedContent='Detalle de la dieta'
      media= {true}
      />
    <br/>
    
  </Container>);
}
