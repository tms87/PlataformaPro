import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import './FlipCard.css';
import { firstRowNutri, secondRowNutri } from './FlipCardInfoNutri';
import { firstRowCliente, secondRowCliente } from './FlipCardInfoCliente';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  cardAlign: {
    height: '100%',
    width: '100%',
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
  },
  backCardContent: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  media: {
    height: 140,
  },
}));


export default function Home(props) {
  const classes = useStyles();
  const [spacing] = React.useState(10);

  const { modoPaciente } = props;

  let firstRow;
  let secondRow;

  if (modoPaciente) {
    firstRow = firstRowCliente;
    secondRow = secondRowCliente;
  } else {
    firstRow = firstRowNutri;
    secondRow = secondRowNutri;
  }

  const handleChangeMenu = (newValue) => {
    props.setPage(newValue)
  }

  return (<Container component="main" style={{ paddingTop: '5vh' }}>
        <Grid container justify="center" spacing={spacing}>
          {firstRow.map(i =>
            <Grid key={i.titulo} item xs={12} sm={12} md={6} lg={4} className={classes.cardAlign}>
              <div class="flip-card">
                <div class="flip-card-inner">
                  <div class="flip-card-front">
                    <Card className={classes.cardAlign}>
                      <CardContent style={{ padding: 0 }}>
                        <CardMedia
                          className={classes.media}
                          image={i.imagen}
                          title="Paciente Card"
                        />
                        <br /><br />
                        <Typography gutterBottom variant="h5" component="h2">
                          {i.titulo}
                        </Typography>
                      </CardContent>
                    </Card>
                  </div>
                  <div class="flip-card-back">
                    <Card className={classes.backCardContent}>
                      <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p" onClick={() => handleChangeMenu(i.menuValue)}>
                          {i.descripcion}
                        </Typography>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </Grid>
          )}
        </Grid>
        <Grid container justify="center" spacing={spacing}>
          {secondRow.map(i =>
            <Grid key={i.titulo} item xs={12} sm={12} md={6} lg={4} className={classes.cardAlign}>
              <div class="flip-card">
                <div class="flip-card-inner">
                  <div class="flip-card-front">
                    <Card className={classes.cardAlign}>
                      <CardContent style={{ padding: 0 }}>
                        <CardMedia
                          className={classes.media}
                          image={i.imagen}
                          title="Paciente Card"
                        />
                        <br /><br />
                        <Typography gutterBottom variant="h5" component="h2">
                          {i.titulo}
                        </Typography>
                      </CardContent>
                    </Card>
                  </div>
                  <div class="flip-card-back">
                    <Card className={classes.backCardContent}>
                      <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p" onClick={() => handleChangeMenu(i.menuValue)}>
                          {i.descripcion}
                        </Typography>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </Grid>
          )}
        </Grid>
  </Container>);
}
