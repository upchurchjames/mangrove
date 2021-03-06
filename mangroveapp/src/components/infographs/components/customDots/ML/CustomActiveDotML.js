import React, { Component } from 'react';
import SoundTypes from '../../../../../constants/analysis/soundTypes'

class CustomActiveDotBIRight extends Component {
  render() {
    const { cx, cy, payload, dataKey, graph, type } = this.props;

    return (
      <circle 
        className="recharts-dot" 
        cx={cx} 
        cy={cy} 
        r={5}
        x={payload.name}
        y={SoundTypes[payload.soundType]}
        starttime={payload.startTime}
        jobid={payload.jobId}
        name={payload.name}
        filename={payload.fileName}
        inputid={payload.inputId}
        downloadurl={payload.downloadUrl}
        key={dataKey}
        graph={graph}
        index={type}
      />
    );
  }
}

export default CustomActiveDotBIRight;