import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red, green, blue } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import ResetasForm from './RecetasForm';
import Chip from '@material-ui/core/Chip';
import UrlInteligente from '../url';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import recetaDetalle from'./recetaDetalle';
import Detalle from './recetaDetalle';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    maxWidth: "600px"
  },
  paper: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  card: {
    maxWidth: 600,
    minWidth: 400,
    margin: "auto",
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  greenAvatar: {
    backgroundColor: green[500],
  },
  blueAvatar: {
    backgroundColor: blue[500],
  },
}));

export default function ResetaCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [state, setState] = useState(props);
  const [chipData] = useState([]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  //para el menu
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setAnchorPoper(null);
  };

  const [anchorElDetalle, setAnchorElDetalle] = React.useState(null);

  const handleClickDetalle = event => {
      console.log("gola");
    setAnchorElDetalle(anchorElDetalle ? null : event.currentTarget);
    setAnchorEl(null);
  };

  const handleCloseDetalle = () => {
    setAnchorElDetalle(null);
    setAnchorPoper(null);
  };


  const openDetalle = Boolean(anchorElDetalle);
  const idDetalle = openDetalle ? 'simple-popper' : undefined;


  //para el poper
  const [anchorPoper, setAnchorPoper] = useState(null);
  const handleClickPoper = event => {
    setAnchorPoper(anchorPoper ? null : event.currentTarget);
    setAnchorEl(null);
  };
  const handleEdit = () => {
    setAnchorPoper(null);
    setAnchorEl(null);
    state.handleUpdate();
  };
  const handleDelete = () => {
    setAnchorEl(null);
    fetch(UrlInteligente.obtenerUrl('recetaCard', 'recetas/') + +state.resetaId, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    state.handleUpdate();
  }
  const open = Boolean(anchorPoper);
  const id = open ? 'options-popper' : undefined;

  return (
    <Container>
      <CssBaseline />
   
        <Card className={classes.card}>
         
          <Popper id={id} open={open} anchorEl={anchorPoper} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper className={classes.root}>
                  <Typography className={classes.typography}>Complete los datos para crear una nueva receta</Typography>
                    <ResetasForm
                        handleAccept={handleEdit}
                        handleCancel={handleClose}
                        resetaId={state.resetaId}
                        title={state.title}
                        content={state.content}
                        type={state.type}
                        isBoarding={true}
                        setState={setState} />
                        
                </Paper>
              </Fade>
            )}
          </Popper>
          <Popper id={idDetalle} open={openDetalle} anchorEl={anchorElDetalle} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper className={classes.root}>
                    < Detalle 
                    handleCancel={handleCloseDetalle}
                    content={state.content} />
                </Paper>
              </Fade>
            )}
          </Popper>
          {state.media && (
            <CardMedia
              className={classes.media}
              image="https://material-ui.com/static/images/cards/paella.jpg"
              title="Paella"
            />)
          }
    
    <CardContent>
    
        
        <Typography variant="h5" component="h2">
                {state.title !== "" ? state.title  : "Sin titulo"}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
        {state.startDate}
        </Typography>
    
      </CardContent>
     
            <div>  
               <CardActions>
          
                     <Button size="small" onClick={handleClickDetalle} >Ver detalle</Button>
                     <Button size="small"  onClick={handleClick}>mas opciones</Button>
                </CardActions>
               <Menu
                 id="menu"
                 anchorEl={anchorEl}
                 keepMounted
                 open={Boolean(anchorEl)}
                 onClose={handleClose}
               >
                 <MenuItem variant="contained" onClick={handleClickPoper}>Editar</MenuItem>
                 <MenuItem variant="contained" onClick={handleDelete}>Borrar</MenuItem>
               </Menu>
             </div>
        </Card>
    </Container>
  );
}