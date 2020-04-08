import React, { Component } from 'react';
import {LineChart, Line, Label, Legend, Brush, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CustomTooltip from './components/CustomTooltip';
import ContextMenu from '../infographs/components/ContextMenu';
import CustomActiveDotACILeft from './components/customDots/ACI/CustomActiveDotACILeft';
import CustomActiveDotACIRight from './components/customDots/ACI/CustomActiveDotACIRight';
import CustomActiveDotACIBySecLeft from './components/customDots/ACI/CustomActiveDotACIBySecondsLeft';
import CustomActiveDotACIBySecRight from './components/customDots/ACI/CustomActiveDotACIBySecondsRight';
import CustomDot from './components/customDots/CustomDot';
import AnnotationList from '../analysisView/annotationList';

class ACILineChart extends Component {
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

  getActiveDots = () => {
    let activeDots;

    switch (this.props.title) {
      case 'ACI By Seconds Per File':
        activeDots = {
          left: (<CustomActiveDotACIBySecLeft graph={this.props.title} />),
          right: (<CustomActiveDotACIBySecRight graph={this.props.title} />)
        }
        break;

      case 'ACI By Date And Hour':
      case 'ACI By File':
        activeDots = {
          left: <CustomActiveDotACILeft graph={this.props.title} />,
          right: <CustomActiveDotACIRight graph={this.props.title} />
        }
        break;

      default:
        break;
    }

    return activeDots;
  }

  render(){
    let data = this.props.results;

    let xLabel = this.props.xAxisLabel;
    let yLabel = this.props.yAxisLabel;

    let firstDataKey = this.props.dataKey1;
    let secondDataKey = this.props.dataKey2;

    let customTooltip = this.props.custom;

    let title = this.props.title;

    let endOfBrush;
    let len = data.length;
    if(len > 1500) endOfBrush = 1500;
    else endOfBrush = len;

    let activeDots = this.getActiveDots();

    return(
      <div>
        <ContextMenu
          audioCallback={this.props.audioCallback}
          initializeAnnotationViewData={this.props.initializeAnnotationViewData}
        />
        <div>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper>
                <h5>To listen to a sound file, simply click on a datapoint dot, and an audio player will appear.</h5>
              </Paper>
            </Grid>
            <Grid item xs={9}>
              <Paper>
                <LineChart width={750} height={600} data={data}
                  margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name">
                    <Label value={xLabel} position="insideBottom" offset={2} />
                  </XAxis>
                  <YAxis domain={['dataMin-1', 'dataMax+1']} tickFormatter={this.formatYAxis}>
                    <Label value={yLabel} position="insideLeft" offset={0} />
                  </YAxis>
                  <Legend />
                  { customTooltip ?
                    <Tooltip content={<CustomTooltip />} />
                    :
                    <Tooltip />}
                  <Line 
                    activeDot={activeDots.left} 
                    type='monotone' 
                    dataKey={firstDataKey} 
                    stroke='#8884d8' 
                    dot={<CustomDot annotations={this.props.annotations} graph={title} />} 
                  />
                  <Line 
                    activeDot={activeDots.right} 
                    type='monotone' 
                    dataKey={secondDataKey} 
                    stroke='#82ca9d' 
                    dot={<CustomDot annotations={this.props.annotations} graph={title} />}
                  />
                  <Brush endIndex={endOfBrush - 1} onChange={this.alertBrush} />
                </LineChart>
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper style={{ height: 600, width: '100%', overflow: 'auto' }}>
                <AnnotationList
                  annotations={this.props.annotations}
                  graph={title}
                />
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default ACILineChart;
