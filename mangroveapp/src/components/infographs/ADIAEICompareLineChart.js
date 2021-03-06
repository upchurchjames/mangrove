import React, { Component } from 'react';
import {LineChart, Line, Label, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

class ADIAEICompareLineChart extends Component {

  formatYAxis = (tickItem) => {
    let asF = parseFloat(tickItem);
    return (asF).toFixed(2);
  }

  render(){

    let { results, xAxisLabel, yAxisLabel, dataKey1, dataKey2, dataKey3, dataKey4, vals, index } = this.props;

    return(
      <div>
        <h6>{index} Left: {parseFloat(vals[0]).toFixed(2)}</h6>
        <h6>{index} Left Compare: {parseFloat(vals[2]).toFixed(2)}</h6>
        <h6>{index} Right: {parseFloat(vals[1]).toFixed(2)}</h6>
        <h6>{index} Right Compare: {parseFloat(vals[3]).toFixed(2)}</h6>
        <LineChart width={900} height={600} data={results}
          margin={{top: 10, right: 30, left: 30, bottom: 0}}>
         <CartesianGrid strokeDasharray="3 3"/>
         <XAxis dataKey="name" height={45}>
           <Label value={xAxisLabel} position="insideBottom" />
         </XAxis>
         <YAxis tickFormatter={this.formatYAxis}>
           <Label value={yAxisLabel} position="insideLeft" offset={-30} />
         </YAxis>
         <Tooltip/>
         <Legend />
         <Line type="monotone" dataKey={dataKey1} stroke="#8884d8" dot={false}/>
         <Line type="monotone" dataKey={dataKey2} stroke="#82ca9d" dot={false}/>
         <Line type="monotone" dataKey={dataKey3} stroke="#1910d4" dot={false}/>
         <Line type="monotone" dataKey={dataKey4} stroke="#108f3f" dot={false}/>
        </LineChart>
      </div>
    );
  }
}

export default ADIAEICompareLineChart;
