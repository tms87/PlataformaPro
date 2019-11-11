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

const url = 'http://355f297c.ngrok.io/api/actividades/profesional/35/cliente/25';
//const url = 'http://www.mocky.io/v2/5da7592b2f00007c0036845c';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    maxWidth: "600px"
  },
}));

export default function Activities(props) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [hasError, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      fetchApi();
  },[]);

  async function fetchApi() {
    try {
      setLoading(true);
      const res = await fetch(url);
      res.json()
        .then(json => {setData(json);console.log("data"+data)});
    
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
  
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

 
  return (<Container>
    <CssBaseline />
    <BottomNavigationAction label="Perfil" value="profile" icon={<AddIcon fontSize= 'large' aria-describedby={id} variant="contained" onClick={handleClick} />} />
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
    {(loading)?"loading...":
      <Grid container spacing={3}>
        {data.map((item,key) => 
          <Grid item xs={12}>
            <ActivityCard 
              title= {(loading)?"loading...":toString(item.titulo)}
              content={(loading)?"loading...":toString(item.contenido)}
              type={(loading)?"loading...":toString(item.tipo_id)}
              extendedContent={(loading)?"loading...":toString(item.descripcion)}
              startDate={(loading)?"loading...":toString(item.fecha_inicio)}
              /* media= {true} */
            />
          </Grid>
        )}
      </Grid>
    }
    
  </Container>);
}
