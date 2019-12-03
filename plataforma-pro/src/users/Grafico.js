import React, { PureComponent, Component  } from 'react';
    import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    } from 'recharts';



    import Grid from '@material-ui/core/Grid';



export default class Grafico extends PureComponent {


  render() {
    return (
      <div style={{marginTop:'5%'}}>
         <Grid item xs={12}>
      <LineChart
        width={800}
        height={200}
        data={ this.props.data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="fecha"  />
        <YAxis />
        <Tooltip />
        <Legend verticalAlign="top" height={36}/>
        <Line type="monotone" name="Altura [cm]" dataKey="altura" stroke="#ebd834" />
      </LineChart>
      </Grid>
        <Grid item xs={12}>
      <LineChart
        width={800}
        height={200}
        data={ this.props.data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="fecha"  />
        <YAxis />
        <Tooltip />
        <Legend verticalAlign="top" height={36}/>
        <Line type="monotone" name="Peso [kg]" dataKey="peso" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
      </Grid>
      <Grid item xs={12}>

       <LineChart
       width={800}
       height={200}
       data={ this.props.data}
       margin={{
         top: 5, right: 30, left: 20, bottom: 5,
       }}
     >
       <CartesianGrid strokeDasharray="3 3" />
       <XAxis dataKey="fecha"  />
       <YAxis />
       <Tooltip />
       <Legend verticalAlign="top" height={36}/>
       <Line type="monotone" name="Masa muscular [kg]" dataKey="masa_muscular" stroke="#82ca9d" />
       <Line type="monotone" name="Masa grasa [kg]" dataKey="masa_grasa" stroke="#f58742" />
     </LineChart>
     </Grid>
     </div>
    );
  }
}

