import React, {useEffect} from './../../node_modules/react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TabInfo from './TabInfo';
import UrlInteligente from '../url';
import Card from './productoCard';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '97vh',
    
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  wrapper: {
    textAlign: "left",
    flexDirection: "row",
    justifyContent: "initial",
    margin: "10px",
  },
  tabsContenido:{
   
  }
}));



const url = UrlInteligente.obtenerUrl('productos',`/productos/grupo/`); 
export default function Producto(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [refresh, setRefresh] = React.useState(false);
  const [tab, setTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


 
  useEffect(() => {
    async function fetchApi() {
      try {
        setLoading(true);
        const res = await fetch(url + tab);
        await res.json()
          .then(json => { setData(json); console.log(json);});
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    fetchApi();
    setRefresh(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchApiPorId(id) {
    try {
      setLoading(true);
      const res = await fetch(url+ (id === 0 ? "" : id ));
      await res.json()
        .then(json => { setData(json);});
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  const clickEvent= (index) => {
    setTab(index);
    console.log("----" + tab + " vs " + index);
    fetchApiPorId(index);
  };
  
  return (
    <div className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          className={classes.tabs}>
          {TabInfo.map(i => <Tab label={i.label} icon={i.icon} onClick={() => clickEvent(i.key)} classes={{ wrapper: classes.wrapper }} {...a11yProps(i.key)} />)}}
          </Tabs>
          <TabPanel style={{width:"100%", overFlow:'auto'}}>
            <Box display="flex"   flexWrap="wrap" justifyContent="center" flexGrow={1}>
                  {data.map( x => <Card url={x.url} titulo={x.nombre} descripcion={x.descripcion}  />)}
            </Box>
          </TabPanel>
            
          
     
    </div>
  );
}

//            <div style={{display:"flex", justifyContent:"space-around", flexWrap:"wrap"}}>
/*

 {TabInfo.map(i =>
          <TabPanel value={value} index={i.key} key={i.key * 10}  style={{width:"100%", overFlow:'auto'}} >
              <Box display="flex"   flexWrap="wrap" justifyContent="center" flexGrow={1}>
                {data.map( x => <Card url={x.url} titulo={x.nombre} descripcion={x.descripcion}  />)}
              </Box>
            
          </TabPanel>
        )}

*/