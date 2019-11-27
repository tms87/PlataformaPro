import Container from './../../node_modules/@material-ui/core/Container';
import React from './../../node_modules/react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TabInfo from './TabInfo';


function TabPanel(props) {
  const { children, tabValue, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={tabValue !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}

    >
      <Box p={3} >{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  tabValue: PropTypes.any.isRequired,
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
    height: '93vh',
    width: '100%',
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
}));

export default function Producto(props) {

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container style={{ maxWidth: '100%', padding: 0 }}>
      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChangeTab}
          indicatorColor="primary"
          className={classes.tabs}>
          {TabInfo.map(i => <Tab label={i.label} icon={i.icon} classes={{ wrapper: classes.wrapper }} {...a11yProps(i.key)} />)}}
          </Tabs>
        {TabInfo.map(i =>
          <TabPanel value={value} index={i.key}>
            {i.label}
          </TabPanel>
        )}
      </div>
    </Container>
  );
}