import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import UrlInteligente from '../url';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

const url = UrlInteligente.obtenerUrl('notas', '/notas/35');

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    maxWidth: "600px",
  },
}));

export default function Notas(props) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const[modificable, setModificable] = useState(true);
  const [hasError, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  let nroPaciente = props.nroPaciente;

  useEffect(() => {
    fetchApi();
    setRefresh(false);
  }, []);

  async function fetchApi() {
    try {
      setLoading(true);
      const res = await fetch(url);
      await res.json()
        .then(json => { setData(json);});
    } catch (e) {
      setErrors(e);
    } finally {
      setLoading(false);
    }
  }

  function toString(json) {
    if (json != null) {
      return JSON.stringify(json).replace(/"/g, '')
    }
    return "";
  }

  const [anchorEl, setAnchorEl] = useState(null);



  const handleEdit = () => {
    setModificable(false);
  }

  const handleSave = () => {
    setModificable(true);
    const today = new Date();
    const startDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const endpoint = data.id ; 
    console.log("Este es el end point" + endpoint)
   
    const form = {
      "id": data.id,
      "cliente_id": data.cliente_id,
      "tipo_id": data.tipo_id,
      "profesional_id": data.profesional_id,
      "contenido": text,
      "created_at": "2019-10-18 22:27:11",
      "updated_at": startDate,
      "url": 1
    }  
    fetch(UrlInteligente.obtenerUrl('notas' ,'/notas/') + endpoint ,{
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
    })
   
  }


  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;
  const [text, setText] = React.useState("");


return (<Container>
    <CssBaseline />
    <h1>Notas</h1>

    {(loading) ? "loading..." :
      <Grid container spacing={3}>
       
          <Grid item xs={12}>
            <TextField
              id="outlined-multiline-static"   
              multiline
              rows="15"
              defaultValue={data.contenido}
              placeholder="Hace click para escribe algunas notas"
              className={classes.textField}
              fullWidth
              margin="normal"
              variant="outlined"
              disabled={modificable}
              onChange={(event) => setText(event.target.value)}
             
            />
            <div sytle={{displey:"flex", flexDirection:"row"}}>
                {modificable !== true ? "" :<Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<EditIcon />}
                  onClick={handleEdit}
                > Modificar
                </Button>}
               { modificable === true ? "" : <Button
                   variant="contained"
                   color="secondary"
                   className={classes.button}
                   startIcon={<SaveIcon />}
                   onClick={handleSave}
                  > Guardar
                  </Button>}
            </div>
          </Grid>
        
      </Grid>
    }
  </Container>);
}