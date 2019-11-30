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

const url = UrlInteligente.obtenerUrl('notas', '/notas/profesional/35');

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

  useEffect(() => {
    fetchApi();
    console.log("data" + data[0])
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
    const endpoint = "" ; 
    console.log("Este es el end point" + endpoint)
   
    const form = {
        tipo_id : "49",
        profesional_id: "35",
        contenido: data.contenido,
        fecha_inicio: startDate,
    }

    console.log(form);
  
    fetch(UrlInteligente.obtenerUrl('notas' ,'/notas/profesional') + endpoint,{
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
    })
    handleSave();
  }


  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;



return (<Container>
    <CssBaseline />
    <h1>Notas</h1>

    {(loading) ? "loading..." :
      <Grid container spacing={3}>
        {data.map((item, key) =>

          <Grid item xs={12}>
            <TextField
              id="outlined-multiline-static"   
              multiline
              rows="15"
              defaultValue={item.contenido}
              placeholder="Hace click para escribe algunas notas"
              className={classes.textField}
              fullWidth
              margin="normal"
              variant="outlined"
              disabled={modificable}
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
        )}
      </Grid>
    }
  </Container>);
}