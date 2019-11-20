import React from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MaterialLink from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ReactDOM from 'react-dom';
import logo from '../img/minilogo.png'
//import App from '../App';
import UserController from './LoginController';
import { createMuiTheme } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import IconButton from '@material-ui/core/IconButton';
import fondo from '../img/fondoLogin.png';
import SignUp from './SignUp';

const theme = createMuiTheme({
  palette: {
    primary: { main: grey[800] },
  }
});

const variantIcon = {
  error: ErrorIcon,
};

const useStyles1 = makeStyles(theme => ({
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

function MySnackbarContentWrapper(props) {
  const classes = useStyles1();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['error']).isRequired,
};

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <MaterialLink color="inherit">
        Nutrihome
      </MaterialLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


/*const showMainMenu = () => {
    ReactDOM.render(<App />, document.getElementById('root'));
};*/

const showSignUp = () => {
    ReactDOM.render(<SignUp />, document.getElementById('root'));
};


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
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  wrapper: {
    marginBottom: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function SignIn() {
  const classes = useStyles();

  const [userData, setUserData] = React.useState({ email: '', password: '' });

  const [open, setOpen] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  const checkPassword = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
        setOpen(true);
      }, 2000);
    }
    UserController.getUserLogin(userData);
}

const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }
  setOpen(false);
};

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <ThemeProvider theme={theme}>
      <div className={classes.paper}>
        <img src={logo} alt="Logo"/>
            <Typography component="h1" variant="h5">
                Iniciar Sesion
            </Typography>
            <form className={classes.form} noValidate>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="dni"
                label="DNI"
                name="dni"
                autoComplete="dni"
                autoFocus
                onChange={(event) => setUserData({...userData, dni: event.target.value })}
            />
            <TextField
                variant="outlined"
                margin="normal"
                //required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event) => setUserData({...userData, password: event.target.value })}
            />
            <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recordarme"
            />
            <div className={classes.wrapper}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
              className={buttonClassname}
              onClick={checkPassword}
              >
              Iniciar Sesion
            </Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              color="primary"
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <MySnackbarContentWrapper
                variant="error"
                message="No se pudo Iniciar Sesion"
                onClose={handleClose}
                />
            </Snackbar>
            <ThemeProvider theme={theme}>
                <Grid container>
                    <Grid item xs>
                        <MaterialLink href="#" variant="body2">
                            Olvide mi Contraseña
                        </MaterialLink>
                    </Grid>
                    <Grid item>
                        <MaterialLink href="#" variant="body2" onClick={showSignUp}>
                            {"Registrarse"}
                        </MaterialLink>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </form>
      </div>
      </ThemeProvider>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}