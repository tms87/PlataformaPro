import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
//import logo from './img/minilogo.png'
import { createMuiTheme } from '@material-ui/core/styles';
import { orange,grey,indigo } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';
import ReactDOM from 'react-dom';
import App from '../App';
import Login from './Login';
//import UserController from './Controller/UserController';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Activities from '../activities/Activities';
import fondo from './fondoLogin.png';

const theme = createMuiTheme({
  palette: {
    primary: { main: grey[800] },
  }
});

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit">
        Pro Platform
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const showLogin = () => {
    ReactDOM.render(<Login />, document.getElementById('root'));
};

/*const showMainMenu = () => {
    ReactDOM.render(<App />, document.getElementById('root'));
};*/


const useStyles = makeStyles(theme => ({
  
  '@global': {
    body: {
      backgroundImage: `url(${fondo})`,
     },
  },

  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const url = 'http://141aa639.ngrok.io/api/clientes';


export default function SignUp() {
  const classes = useStyles();

  const [userData, setUserData] = React.useState({ nombre: '', apellido: '', email: '', password: '',edad:'', nutricionista: '' });
  
  const handleSave = () => {
    //UserController.insertUser(userData);
   // ReactDOM.render(<App />, document.getElementById('root'));
   ReactDOM.render(<App />, document.getElementById('root'));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <div className={classes.paper}>
            {/* <img src={logo} alt="Logo"/> */}
            <Typography component="h1" variant="h5">
                Registrarse
            </Typography>
            <form className={classes.form} noValidate>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="Nombre"
                    autoFocus
                    value={userData.nombre}
                    onChange={(event) => setUserData({...userData, nombre: event.target.value })}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Apellido"
                    name="lastName"
                    autoComplete="lname"
                    value={userData.apellido}
                    onChange={(event) => setUserData({...userData, apellido: event.target.value })}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="edad"
                    label="Edad"
                    name="edad"
                    value={userData.edad}
                    onChange={(event) => setUserData({...userData, edad: event.target.value })}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Correo Electronico"
                    name="email"
                    autoComplete="email"
                    value={userData.email}
                    onChange={(event) => setUserData({...userData, email: event.target.value })}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Contraseña"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={userData.password}
                    onChange={(event) => setUserData({...userData, password: event.target.value })}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="passwordAgain"
                    label="Repetir Contraseña"
                    type="password"
                    id="passwordAgain"
                    autoComplete="current-password"
                />
                <InputLabel style={{ marginTop: "25px" }}>¿Cuál es su nutricionista?</InputLabel>
                <Select 
                  style={{ width : '100%' }}
                  value={userData.nutricionista}
                  onChange={(event) => setUserData({...userData, nutricionista: event.target.nutricionista })}>
                    <MenuItem value={'Mariana Martinez'}>Mariana Martinez</MenuItem>
                    <MenuItem value={'Martin Gonzalez'}>Martin Gonzalez</MenuItem>
                    <MenuItem value={'Laura Garcia'}>Laura Garcia</MenuItem>
                    <MenuItem value={'Sin nutricionista asignado'}>Sin nutricionista asignado</MenuItem>                  
                </Select>
                </Grid>
                <Grid item xs={12}>
                <FormControlLabel
                    control={<Checkbox value="TerminosYCondiciones" color="primary" />}
                    label="He leido y acepto los terminos y condiciones de Pro Platform"
                />
                </Grid>
            </Grid>
            <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSave}
            >
                Registrarse
            </Button>
            <Grid container justify="flex-end">
                <Grid item>
                { <Link href="#" onClick={showLogin} variant="body2">
                    ¿Tiene una cuenta? Inicie Sesion
                </Link>}
                </Grid>
            </Grid>
            </form>
        </div>
        <Box mt={5}>
            <Copyright />
        </Box>
      </ThemeProvider>
    </Container>
  );
}