import CssBaseline from './../../node_modules/@material-ui/core/CssBaseline';
import Container from './../../node_modules/@material-ui/core/Container';
import React, { useState, useEffect } from './../../node_modules/react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import KitchenIcon from '@material-ui/icons/Kitchen';

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
        <Box  p={3} >{children}</Box>
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
      height: 500,
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
    wrapper: {
      textAlign:"left",
      flexDirection:"row",
      justifyContent: "initial",
      margin: "10px",
    },
    labelIcon:{
      margin: "5px",
    },
    rootSvg: {
      margin: "7px",
    }
  }));
  

export default  function Producto(porps){
    
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };



    return (
        <Container>
            <h1> Productos</h1>
            <CssBaseline />
            <div className={classes.root}>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
              
                aria-label="disabled tabs example"
                className={classes.tabs}
                textColor="secondary"
              >
                <Tab label="Todos los productos" icon={<KitchenIcon classes={{root : classes.rootSvg}} />} classes={{wrapper: classes.wrapper /*, labelIcon: classes.labelIcon*/}}    {...a11yProps(0)} />
                <Tab label="Grupo 1: Lecha y derivados" classes={{wrapper: classes.wrapper}}   icon={<KitchenIcon classes={{root : classes.rootSvg}} /> } {...a11yProps(1)} />
                <Tab label="Grupo 2: Carne, pescado y huevo" classes={{wrapper: classes.wrapper}}  {...a11yProps(2)} />
                <Tab label="Grupo 3: Papas, legumbres y futos secos" classes={{wrapper: classes.wrapper}}  {...a11yProps(3)} />
                <Tab label="Grupo 4: Verduras y hortalizas" classes={{wrapper: classes.wrapper}}  {...a11yProps(4)} />
                <Tab label="Grupo 5: Frutas" classes={{wrapper: classes.wrapper}}  {...a11yProps(5)} />
                <Tab label="Grupo 6: Cereales y derivados, axucar y dulces" classes={{wrapper: classes.wrapper}}  {...a11yProps(6)} />
                <Tab label="Grupo 7: Grasas, aceite y manteca" classes={{wrapper: classes.wrapper}}  {...a11yProps(7)} />
              </Tabs>
              <TabPanel value={value} index={0}>
                Item One
              </TabPanel>
              <TabPanel value={value} index={1}>
                Item Two
              </TabPanel>
              <TabPanel value={value} index={2}>
                Item Three
              </TabPanel>
              <TabPanel value={value} index={3}>
                Item Four
              </TabPanel>
              <TabPanel value={value} index={4}>
                Item Five
              </TabPanel>
              <TabPanel value={value} index={5}>
                Item Six
              </TabPanel>
              <TabPanel value={value} index={6}>
                Item Seven
              </TabPanel>
              <TabPanel value={value} index={7}>
                Item Eight
              </TabPanel>
            </div>
        </Container>
    );
}