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
import Tooltip from '@material-ui/core/Tooltip';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import ActivityForm from '../activities/ActivityForm';
import UrlInteligente from '../url';
import DoneIcon from '@material-ui/icons/Done';
import UnarchiveIcon from '@material-ui/icons/Unarchive';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    maxWidth: "600px"
  },
  card: {
    maxWidth: 600,
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
  button: {
    margin: theme.spacing(1),
  },
}));

export default function ActivityCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [state, setState] = useState(props);
  const [loading, setLoading] = useState(false);
  const { modoPaciente } = props;

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
  const handleRealizado = async () => {
    setLoading(true);
    await fetch(UrlInteligente.obtenerUrl('actividadCard', '/actividades/finalizar/') + state.activityId, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    state.handleUpdate();
    setLoading(false);
  };

  const handleDesarchivar = async () => {
    setLoading(true);
    await fetch(UrlInteligente.obtenerUrl('actividadCard', '/actividades/comenzar/') + state.activityId, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    state.handleUpdate();
    setLoading(false);
  }
  const handleDelete = () => {
    setAnchorEl(null);
    fetch(UrlInteligente.obtenerUrl('actividadCard', '/actividades/') + state.activityId, {
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
        <CardHeader id={id}
          avatar={
            // eslint-disable-next-line
            (state.type == '1' && <Avatar aria-label="recipe" className={classes.avatar}><AssignmentIcon /></Avatar>) ||
            // eslint-disable-next-line
            (state.type == '2' && <Avatar aria-label="recipe" className={classes.greenAvatar}><FastfoodIcon /></Avatar>) ||
            // eslint-disable-next-line
            (state.type == '3' && <Avatar aria-label="recipe" className={classes.blueAvatar}><LocalHospitalIcon /></Avatar>)
          }
          action={
            modoPaciente ? "" :
              <div>
                <MoreVertIcon aria-describedby={id} variant="contained" aria-controls="activity-menu" aria-haspopup="true" onClick={handleClick} />
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
          }
          title={state.title}
          subheader={state.startDate}
        />
        <Popper id={id} open={open} anchorEl={anchorPoper} transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper className={classes.root}>
                <Typography className={classes.typography}>Complete los datos para crear una nueva actividad</Typography>
                <ActivityForm
                  handleAccept={handleEdit}
                  handleCancel={handleClose}
                  activityId={state.activityId}
                  title={state.title}
                  content={state.content}
                  type={state.type}
                  description={state.description}
                  isBoarding={false}
                  setState={setState} />
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
          <Typography variant="body2" color="textSecondary" component="p">
            {state.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {props.switchState ?
            <Tooltip title="Desarchivar" placement="top">
              <IconButton className={classes.button} onClick={handleDesarchivar}>
                <UnarchiveIcon />
              </IconButton>
            </Tooltip>
            :
            <Tooltip title="Realizado" placement="top">
              <IconButton className={classes.button} onClick={handleRealizado}>
                <DoneIcon />
              </IconButton>
            </Tooltip>
          }
          {loading && <CircularProgress />}
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {state.content.split("\n").map((i, key) =>
              <Typography key={key} paragraph style={{ textAlign: 'left' }}>{i}</Typography>
            )}
          </CardContent>
        </Collapse>
      </Card>
    </Container>
  );
}