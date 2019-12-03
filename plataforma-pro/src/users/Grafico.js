import React, { PureComponent, Component  } from 'react';
    import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    } from 'recharts';






export default class Grafico extends PureComponent {


  render() {
    return (
      <LineChart
        width={800}
        height={500}
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
        <Line type="monotone" name="Peso" dataKey="peso" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" name="Masa muscular" dataKey="masa_muscular" stroke="#82ca9d" />
        <Line type="monotone" name="Masa grasa" dataKey="masa_grasa" stroke="#f58742" />
        <Line type="monotone" name="Altura" dataKey="altura" stroke="#ebd834" />
      </LineChart>
    );
  }
}

