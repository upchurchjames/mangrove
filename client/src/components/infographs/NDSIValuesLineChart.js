import React, { Component } from 'react';
import {LineChart, Label, Line, Brush, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';


class NDSIValuesLineChart extends Component {

  formatYAxis = (tickItem) => {
    let asF = parseFloat(tickItem);
    return (asF).toFixed(2);
  }

  alertBrush = (indices) => {
    let start = indices.startIndex;
    let end = indices.endIndex;
    if(end - start > 1500){
      if(localStorage.getItem('analysisViewAlert') === true)
      {
        this.props.callback();
      }
    }
  }

  render(){

    let { results, xAxisLabel } = this.props;

    let endOfBrush;
    let len = results.length;
    if(len > 1500) endOfBrush = 1500;
    else endOfBrush = len;

    return(
      <div>
        <LineChart width={900} height={600} data={results}
          margin={{top: 10, right: 30, left: 0, bottom: 0}}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="name">
            <Label value={xAxisLabel} position="insideBottom" offset={2} />
          </XAxis>
          <YAxis tickFormatter={this.formatYAxis}>
            <Label value="Value" position="insideLeft" offset={0} tickFormatter={this.formatYAxis} />
          </YAxis>
          <Legend />
          <Tooltip/>
          <Line type='monotone' dataKey='ndsi' stroke='#8884d8' dot={false} />
          <Line type='monotone' dataKey='biophony' stroke='#82ca9d' dot={false} />
          <Line type='monotone' dataKey='anthrophony' stroke='#e79797' dot={false} />
          <Brush endIndex={endOfBrush - 1} onChange={this.alertBrush} />
        </LineChart>
      </div>
    )
  }
}

export default NDSIValuesLineChart;
