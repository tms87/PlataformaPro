import React, {useState} from 'react';
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
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import ActivityForm from '../activities/ActivityForm';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
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
}));

export default function ActivityCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [state, setState] = useState(props);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  //para el menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
    
  //para el poper
  const [anchorPoper, setAnchorPoper] = useState(null);
  const handleEdit = event => {
    setAnchorEl(null);
    setAnchorPoper(anchorPoper ? null : event.currentTarget);
  };
  const open = Boolean(anchorPoper);
  const id = open ? 'edit-popper' : undefined;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              <AssignmentIcon/>
            </Avatar>
          }
          action={
            /* <IconButton aria-label="settings"> */
              <div>
              <MoreVertIcon aria-controls="activity-menu" aria-haspopup="true" onClick={handleClick}/>
              <Menu
                id="activity-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem aria-describedby={id} variant="contained" onClick={handleEdit}>Editar</MenuItem>
                <MenuItem onClick={handleClose}>Borrar</MenuItem>
              </Menu>
              </div>
            /* </IconButton> */
          }
          title={state.title}
          subheader="Octubre 14, 2019"
        />
        <Popper id={id} open={open} anchorEl={anchorPoper} transition placement="bottom">
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper className={classes.root}>
                <Typography className={classes.typography}>Complete los datos para crear una nueva actividad</Typography>
                <ActivityForm handleCancel={handleEdit} title={state.title} content={state.content} type={state.type} setState={setState} />
              </Paper>
            </Fade>
          )}
        </Popper>
        { props.media && (
          <CardMedia
            className={classes.media}
            image="https://material-ui.com/static/images/cards/paella.jpg"
            title="Paella"
          />)
        }
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.content}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
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
            <Typography paragraph>{props.extendedContent}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Container>
  );
}