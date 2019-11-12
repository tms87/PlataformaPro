import React, {useState, useEffect} from './../../node_modules/react';
import CssBaseline from './../../node_modules/@material-ui/core/CssBaseline';
import Container from './../../node_modules/@material-ui/core/Container';
import { makeStyles } from './../../node_modules/@material-ui/core/styles';
import ResetasCard from './ResetasCard';
import BottomNavigationAction from './../../node_modules/@material-ui/core/BottomNavigationAction';
import AddIcon from './../../node_modules/@material-ui/icons/Add';
import Popper from './../../node_modules/@material-ui/core/Popper';
import Typography from './../../node_modules/@material-ui/core/Typography';
import Fade from './../../node_modules/@material-ui/core/Fade';
import Paper from './../../node_modules/@material-ui/core/Paper';
import RecetasForm from './RecetasForm';
import Grid from './../../node_modules/@material-ui/core/Grid';
import Url from '../url';

const url = Url + 'recetas/profesional/35';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    maxWidth: "600px",
  },
}));

export default function Resetas(props) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [hasError, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refresh,setRefresh] = useState(false);
  useEffect(() => {
      fetchApi();
      console.log("data"+data[0])
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
    <BottomNavigationAction label="Perfil" value="profile" icon={<AddIcon fontSize= 'large' aria-describedby={id} variant="contained" onClick={handleClick} />} />
    <Popper id={id} open={open} anchorEl={anchorEl} transition>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
        
          <Paper className={classes.root}>
            <Typography className={classes.typography}>Para crear una nueva receta complete los datos</Typography>
            <RecetasForm 
              handleAccept={handleUpdate}
              handleCancel={handleClose}
              isBoarding= {true}
              setState={setData}
            />
          </Paper>
        </Fade>
      )}
    </Popper>
    {(loading)?"loading...": 
      <Grid container spacing={3}>
        {data.map((item,key) => 
       
          <Grid item xs={12}>
          
            <ResetasCard
              key={key}
              handleUpdate={handleUpdate}
              resetaId={(loading)?"":toString(item.id)}
              title= {(loading)?"loading...":toString(item.titulo)}
              content={(loading)?"loading...":toString(item.contenido)}
              startDate={(loading)?"loading...":toString(item.fecha_inicio)}
            />
          </Grid>
        )}
      </Grid>
    }
  </Container>);
}