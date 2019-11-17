import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import './FlipCard.css';
import { firstRow, secondRow } from './FlipCardInfo';

const useStyles = makeStyles(theme => ({
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  cardRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  frontCardContent: {
    height: '100%',
    padding: 0,
  },
  backCardContent: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  media: {
    height: 140,
  },
}));


export default function Home(props) {
  const classes = useStyles();

  return (<Container component="main" maxWidth="xs" className={classes.cardContainer}>
    <div className={classes.cardRow}>
      {firstRow.map(i =>
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <Card className={classes.frontCardContent}>
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
                  <Typography variant="body2" color="textSecondary" component="p">
                    {i.descripcion}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
    <div className={classes.cardRow}>
      {secondRow.map(i =>
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <Card className={classes.frontCardContent}>
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
                  <Typography variant="body2" color="textSecondary" component="p">
                    {i.descripcion}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  </Container>);
}
