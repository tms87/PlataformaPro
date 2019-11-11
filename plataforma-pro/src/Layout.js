import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import EventNoteIcon from '@material-ui/icons/EventNote';
import NoteIcon from '@material-ui/icons/Note';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Avatar from '@material-ui/core/Avatar';
import ProfilePic from './lopez.png';
import HomeIcon from '@material-ui/icons/Home';
import ImagenFondo from './fondo.jpg';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import MessageIcon from '@material-ui/icons/Message';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import './Layout.css';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundImage: `url(${ImagenFondo})`,
      height: "auto",
     },
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
   
  },
  avatar: {
    margin: 10,
  },
  button: {
    margin: theme.spacing(1),
    float: "right",
  },
}));

function Header(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [title, setTitle] = React.useState("NUTRIHOME");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  function handleChange(event, newValue) {
    props.setPage(newValue)
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} style={{ textAlign: "left" , marginLeft: "5%" }}>
        <Avatar alt="Profile" src={ProfilePic} className={classes.avatar} />
        <Typography variant="h6">
            Lautaro Lopez
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
            Nutricionista
        </Typography>
      </div>
      <List>
        <ListItem key="Home">
          <BottomNavigation value={props.page} onChange={handleChange} showLabels>
            <BottomNavigationAction label="Home" value="home" icon={<HomeIcon />} onClick={() => setTitle("NUTRIHOME")}/>
          </BottomNavigation>
        </ListItem>
        <Divider />
        <ListItem key="Pacientes">
          <BottomNavigation value={props.page} onChange={handleChange} showLabels>
            <BottomNavigationAction label="Pacientes" value="patients" icon={<PeopleOutlineIcon />} onClick={() => setTitle("PACIENTES")}/>
          </BottomNavigation>
        </ListItem>
        <ListItem key="Actividades">
          <BottomNavigation value={props.page} onChange={handleChange} showLabels>
            <BottomNavigationAction label="Actividades" value="activities" icon={<EventNoteIcon />} onClick={() => setTitle("ACTIVIDADES")}/>
          </BottomNavigation>
        </ListItem>
        <ListItem key="Plantillas">
          <BottomNavigation value={props.page} onChange={handleChange} showLabels>
            <BottomNavigationAction label="Plantillas" value="templates" icon={<NoteIcon />} onClick={() => setTitle("PLANTILLAS")}/>
          </BottomNavigation>
        </ListItem>
        <ListItem key="Productos">
          <BottomNavigation value={props.page} onChange={handleChange} showLabels>
            <BottomNavigationAction label="Productos" value="productos" icon={<ShoppingCartIcon />} onClick={() => setTitle("PRODUCTOS")}/>
          </BottomNavigation>
        </ListItem>
        <ListItem key="Recetas">
          <BottomNavigation value={props.page} onChange={handleChange} showLabels>
            <BottomNavigationAction label="Recetas" value="recetas" icon={<FolderOpenIcon />} onClick={() => setTitle("RECETAS")}/>
          </BottomNavigation>
        </ListItem>
        <ListItem key="Perfil">
          <BottomNavigation value={props.page} onChange={handleChange} showLabels>
            <BottomNavigationAction label="Perfil" value="profile" icon={<AccountBoxIcon />} onClick={() => setTitle("PERFIL")}/>
          </BottomNavigation>
        </ListItem>
        <ListItem key="Logout" style={{ marginTop: "90%" }}>
          <BottomNavigation value={props.page} onChange={handleChange} showLabels>
            <BottomNavigationAction label="Cerrar Sesion" value="logout" icon={<ExitToAppIcon />} style={{ color: "red" }}/>
          </BottomNavigation>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} color="default">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap style={{ width: "50%", textAlign: "left" }}>
            {title}
          </Typography>
          <div style={{ width: "50%", float: "right" }}>
            <IconButton className={classes.button}>
              <MessageIcon />
            </IconButton>
            <IconButton className={classes.button}>
              <NotificationsIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
      </main>
    </div>
  );
}

export default Header;