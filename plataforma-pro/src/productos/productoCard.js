import React, {useEffect} from './../../node_modules/react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
   card: {
    width: '16vw',
    margin:'2vh',
  },
  media: {
    height: '20vh',
  },
});

export default function MediaCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea style={{height:"100%"}}>
        <CardMedia
          className={classes.media}
          image={require('./img/' + props.url)}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
                {props.titulo}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
           {props.descripcion}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}