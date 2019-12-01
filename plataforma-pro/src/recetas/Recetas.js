import React, { useState, useEffect } from './../../node_modules/react';
import CssBaseline from './../../node_modules/@material-ui/core/CssBaseline';
import Container from './../../node_modules/@material-ui/core/Container';
import { makeStyles } from './../../node_modules/@material-ui/core/styles';
import ResetasCard from './ResetasCard';
import Popper from './../../node_modules/@material-ui/core/Popper';
import Typography from './../../node_modules/@material-ui/core/Typography';
import Fade from './../../node_modules/@material-ui/core/Fade';
import Paper from './../../node_modules/@material-ui/core/Paper';
import RecetasForm from './RecetasForm';
import Grid from './../../node_modules/@material-ui/core/Grid';
import UrlInteligente from '../url';
import Button from '@material-ui/core/Button';
import CardResetasDos from './ResetasCard2';
import Box from '@material-ui/core/Box';

//const pr = 'http://b95ec43e.ngrok.io/api/recetas/profesional/35';
const url = UrlInteligente.obtenerUrl('recetas', '/recetas/profesional/35');

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    maxWidth: "600px",
  },
}));

export default function Resetas(props) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  let { modoPaciente } = props;

  useEffect(() => {
    async function fetchApi() {
      try {
        setLoading(true);
        const res = await fetch(url);
        await res.json()
          .then(json => { setData(json); });
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    fetchApi();
    setRefresh(false);
  }, [refresh]);

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

  return (<Container>
    <CssBaseline />
    <h1>Recetas</h1>
    {!modoPaciente ? <Button value="profile" color="primary" variant="contained" onClick={handleClick} >Agregar nueva Receta</Button> : ""}
    <br /><br />
    <Popper id={id} open={open} anchorEl={anchorEl} transition>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper className={classes.root}>
            <Typography className={classes.typography}>Para crear una nueva receta complete los datos</Typography>
            <RecetasForm
              handleAccept={handleUpdate}
              handleCancel={handleClose}
              isBoarding={true}
              setState={setData}
            />
          </Paper>
        </Fade>
      )}
    </Popper>
    <Container >
    <Box display="flex" p={1} bgcolor="background.paper">
        
        {(loading) ? "Loading..." :
        <div style={{flex:'1'}}>
          <Grid container spacing={3}   >
            {data.map((item, key) =>

              <Grid item xs={12}>

                  <CardResetasDos 
                        key={key}
                        handleUpdate={handleUpdate}
                        resetaId={(loading) ? "" : item.id}
                        title={(loading) ? "loading..." : item.titulo}
                        content={(loading) ? "loading..." : item.contenido}
                        startDate={(loading) ? "loading..." : item.fecha_inicio}
                  />
              
              </Grid>
            )}
          </Grid>
          </div>
        }
         </Box>
         </Container>
  </Container>);
}

/**
   <ResetasCard
              key={key}
              handleUpdate={handleUpdate}
              resetaId={(loading) ? "" : item.id}
              title={(loading) ? "loading..." : item.titulo}
              content={(loading) ? "loading..." : item.contenido}
              startDate={(loading) ? "loading..." : item.fecha_inicio}
              modoPaciente={props.modoPaciente}
            />
 */