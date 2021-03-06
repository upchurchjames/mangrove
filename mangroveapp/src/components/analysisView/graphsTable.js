import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import GraphExpansionPanel from './graphExpansionPanel';
import NDSIChannelBarChart from '../infographs/NDSIChannelBarChart';
import NDSIValuesBarChart from '../infographs/NDSIValuesBarChart';
import NDSIValuesLineChart from '../infographs/NDSIValuesLineChart';
import NDSIChannelCompareBarChart from '../infographs/NDSIChannelCompareBarChart';
import NDSIValuesCompareBarChart from '../infographs/NDSIValuesCompareBarChart';
import NDSICompareFileBarChart from '../infographs/NDSICompareFileBarChart';
import ACILineChart from '../infographs/ACILineChart';
import ACIDualLineChart from '../infographs/ACIDualLineChart';
import ACICompareFileLineChart from '../infographs/ACICompareFileLineChart';
import ACICompareFileBandLineChart from '../infographs/ACICompareFileBandLineChart';
import ADIAEILineChart from '../infographs/ADIAEILineChart';
import ADIAEICompareLineChart from '../infographs/ADIAEICompareLineChart';
import ADIAEICompareFileLineChart from '../infographs/ADIAEICompareFileLineChart';
import BACompareFileAreaChart from '../infographs/BACompareFileAreaChart';
import BAAreaChart from '../infographs/BAAreaChart';
import BALineChart from '../infographs/BALineChart';
import BADualLineChart from '../infographs/BADualLineChart';
import BACompareAreaChart from '../infographs/BACompareAreaChart';
import ACIBarChart from '../infographs/ACIBarChart';
import ACICompareBarChart from '../infographs/ACICompareBarChart';
import RMSBarChart from '../infographs/RMSBarChart';
import RMSCompareBarChart from '../infographs/RMSCompareBarChart';
import MLLineChart from '../infographs/mlInfographs/MLLineChart';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(2),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

class GraphsTable extends React.Component {

  render()
  {
    let { graphs, index, annotations } = this.props;

    const rows = [];
    let ctr = 1;
    for (var key in graphs) {
      // skip loop if the property is from prototype
      if (!graphs.hasOwnProperty(key)) continue;

      var obj = graphs[key];
      
      switch(index)
      {
        case "ml":
          rows.push(
            <GraphExpansionPanel
              key={'graph'+ctr}
              title={obj.title}
              graph={<MLLineChart
                results={obj.data}
                xAxisLabel={obj.xAxisLabel}
                yAxisLabel={obj.yAxisLabel}
                dataKey1={obj.dataKey1}
                audioCallback={this.props.audioCallback}
                initializeAnnotationViewData={this.props.initializeAnnotationViewData}
                annotations={annotations}
                title={obj.title}
                index={index}
              />}
            />
          )
          break;
        case "rms":
          rows.push(
            <GraphExpansionPanel
              key={'graph'+ctr}
              title={obj.title}
              graph={<RMSBarChart
                results={obj}
              />}
            />
          )
          break;
        case "rms-compare":
          rows.push(
            <GraphExpansionPanel
              key={'graph'+ctr}
              title={obj.title}
              graph={<RMSCompareBarChart
                results={obj}
              />}
            />
          )
          break;
        case "aci":
          if(obj.title === "ACI Total Value Divided By Minutes")
          {
            rows.push(
              <GraphExpansionPanel
                key={'graph'+ctr}
                title={obj.title}
                graph={<ACIBarChart
                  results={obj.data}
                />}
              />
            )
          }else
          {
            if(obj.title === "ACI By Seconds Per File")
            {
              rows.push(
                <GraphExpansionPanel
                  key={'graph'+ctr}
                  title={obj.title}
                  graph={<ACILineChart
                    callback={this.props.callback}
                    results={obj.data}
                    custom={true}
                    xAxisLabel={obj.xAxisLabel}
                    yAxisLabel={obj.yAxisLabel}
                    dataKey1={obj.dataKey1}
                    dataKey2={obj.dataKey2}
                    audioCallback={this.props.audioCallback}
                    initializeAnnotationViewData={this.props.initializeAnnotationViewData}
                    title={obj.title}
                    annotations={annotations}
                    index={index}
                  />}
                />
              )
              rows.push(
                <GraphExpansionPanel
                  key={'graphSeconds'+ctr}
                  title="ACI By Seconds"
                  graph={<ACICompareFileLineChart
                    results={obj.data}
                    dataKey1='aciLeft'
                    dataKey2='aciRight'
                    dataKey3='aciLeftC'
                    dataKey4='aciRightC'
                    audioCallback={this.props.audioCallback}
                    initializeAnnotationViewData={this.props.initializeAnnotationViewData}
                  />}
                />
              )
            }else if(obj.title === "ACI By Band Range")
            {
              rows.push(
                <GraphExpansionPanel
                  key={'graph'+ctr}
                  title={obj.title}
                  graph={<ACICompareFileBandLineChart
                    results={obj.data}
                    dataKey1='aciLeft'
                    dataKey2='aciRight'
                    dataKey3='aciLeftC'
                    dataKey4='aciRightC'
                  />}
                />
              )
            }else{
              rows.push(
                <GraphExpansionPanel
                  key={'graph'+ctr}
                  title={obj.title}
                  graph={<ACILineChart
                    callback={this.props.callback}
                    results={obj.data}
                    custom={false}
                    xAxisLabel={obj.xAxisLabel}
                    yAxisLabel={obj.yAxisLabel}
                    dataKey1={obj.dataKey1}
                    dataKey2={obj.dataKey2}
                    audioCallback={this.props.audioCallback}
                    initializeAnnotationViewData={this.props.initializeAnnotationViewData}
                    title={obj.title}
                    annotations={annotations}
                    index={index}
                  />}
                />
              )
            }
          }
          break;
        case "aci-compare":
          if(obj.title === "Compared By File")
          {
            rows.push(
              <GraphExpansionPanel
                key={'graph'+ctr}
                title={obj.title}
                graph={<ACICompareBarChart
                  results={obj.data}
                />}
              />
            )
          }else if(obj.title === "Compared Over Seconds Per File"){
            rows.push(
              <GraphExpansionPanel
                key={'graph'+ctr}
                title="Compare Files By Seconds"
                graph={<ACICompareFileLineChart
                  results={obj.data}
                  dataKey1='aciLeft'
                  dataKey2='aciRight'
                  dataKey3='aciLeftC'
                  dataKey4='aciRightC'
                  audioCallback={this.props.audioCallback}
                  initializeAnnotationViewData={this.props.initializeAnnotationViewData}
                />}
              />
            )
          }else if(obj.title === "Compared By Band Values")
          {
            rows.push(
              <GraphExpansionPanel
                key={'graph'+ctr}
                title={obj.title}
                graph={<ACICompareFileBandLineChart
                  results={obj.data}
                  dataKey1='aciLeft'
                  dataKey2='aciRight'
                  dataKey3='aciLeftC'
                  dataKey4='aciRightC'
                />}
              />
            )
          }
          else{
            rows.push(
              <GraphExpansionPanel
                key={'graph'+ctr}
                title={obj.title}
                graph={<ACIDualLineChart
                  callback={this.props.callback}
                  results={obj.data}
                  xAxisLabel={obj.xAxisLabel}
                  yAxisLabel={obj.yAxisLabel}
                  dataKey1={obj.dataKey1}
                  dataKey2={obj.dataKey2}
                  dataKey3={obj.dataKey3}
                  dataKey4={obj.dataKey4}
                  title={obj.title}
                  annotations={annotations}
                />}
              />
            )
          }
          break;
        case "ndsi":
          switch(obj.title)
          {
            case "NDSI By Channel":
              rows.push(
                <GraphExpansionPanel
                  key={'graph'+ctr}
                  title={obj.title}
                  graph={<NDSIChannelBarChart
                    callback={this.props.callback}
                    results={obj.data}
                  />}
                />
              )
              break;
            case "NDSI Values":
              rows.push(
                <GraphExpansionPanel
                  key={'graph'+ctr}
                  title={obj.title}
                  graph={<NDSIValuesBarChart
                    callback={this.props.callback}
                    results={obj.data}
                  />}
                />
              )
              break;
            case "NDSI Values By File":
              rows.push(
                <GraphExpansionPanel
                  key={'graph'+ctr}
                  title={obj.title}
                  graph={<NDSICompareFileBarChart
                    callback={this.props.callback}
                    results={obj.data}
                    audioCallback={this.props.audioCallback}
                    initializeAnnotationViewData={this.props.initializeAnnotationViewData}
                  />}
                />
              )
              break;
            case "NDSI By Date and Hour":
              rows.push(
                <GraphExpansionPanel
                  key={'graph'+ctr}
                  title={obj.title}
                  graph={<NDSIValuesLineChart
                    callback={this.props.callback}
                    results={obj.data}
                    xAxisLabel={"Date"}
                    title={obj.title}
                    audioCallback={this.props.audioCallback}
                    initializeAnnotationViewData={this.props.initializeAnnotationViewData}
                    annotations={annotations}
                    index={index}
                  />}
                />
              )
              break;
            default:
              break;
          }
          break;
        case "ndsi-compare":
          switch(obj.title)
          {
            case "Compared By Channels":
              rows.push(
                <GraphExpansionPanel
                  key={'graph'+ctr}
                  title={obj.title}
                  graph={<NDSIChannelCompareBarChart
                    callback={this.props.callback}
                    results={obj.data}
                  />}
                />
              )
              break;
            case "Compared By File":
              rows.push(
                <GraphExpansionPanel
                  key={'graph'+ctr}
                  title="Compare NDSI By File"
                  graph={<NDSICompareFileBarChart
                    callback={this.props.callback}
                    results={obj.data}
                    audioCallback={this.props.audioCallback}
                    initializeAnnotationViewData={this.props.initializeAnnotationViewData}
                  />}
                />
              )
              break;
            case "Compared By Values":
              rows.push(
                <GraphExpansionPanel
                  key={'graph'+ctr}
                  title={obj.title}
                  graph={<NDSIValuesCompareBarChart
                    callback={this.props.callback}
                    results={obj.data}
                  />}
                />
              )
              break;
            default:
              break;
          }
          break;
        case "adi":
          switch(obj.title)
          {
            case "File Data":
              rows.push(
                <GraphExpansionPanel
                  key={'graph'+ctr}
                  title="ADI Band Range Values By File"
                  graph={<ADIAEICompareFileLineChart
                    adi={true}
                    files={obj.files}
                    fileNames={obj.fileNames}
                  />}
                />
              )
              break;
            case "ADI Value By Band Range":
              rows.push(
                <GraphExpansionPanel
                  key={'graph'+ctr}
                  title={obj.title}
                  graph={<ADIAEILineChart
                    results={obj.data}
                    xAxisLabel={obj.xAxisLabel}
                    yAxisLabel={obj.yAxisLabel}
                    dataKey1={obj.dataKey1}
                    dataKey2={obj.dataKey2}
                    index={index}
                    vals={[obj.left, obj.right]}
                    title={obj.title}
                    annotations={annotations}
                    audioCallback={this.props.audioCallback}
                    initializeAnnotationViewData={this.props.initializeAnnotationViewData}
                  />}
                />
              )
              break;
            default:
              rows.push(
                <GraphExpansionPanel
                  key={'graph'+ctr}
                  title={obj.title}
                  graph={<ADIAEILineChart
                    results={obj.data}
                    xAxisLabel={obj.xAxisLabel}
                    yAxisLabel={obj.yAxisLabel}
                    dataKey1={obj.dataKey1}
                    dataKey2={obj.dataKey2}
                    index={index}
                    vals={[obj.left, obj.right]}
                    title={obj.title}
                    annotations={annotations}
                    audioCallback={this.props.audioCallback}
                    initializeAnnotationViewData={this.props.initializeAnnotationViewData}
                  />}
                />
              )
              break;
          }
          break;
        case "adi-compare":
          switch(obj.title)
          {
            case "Compared By Band Values":
              rows.push(
                <GraphExpansionPanel
                  key={'graph'+ctr}
                  title={obj.title}
                  graph={<ADIAEICompareLineChart
                    results={obj.data}
                    xAxisLabel={obj.xAxisLabel}
                    yAxisLabel={obj.yAxisLabel}
                    dataKey1={obj.dataKey1}
                    dataKey2={obj.dataKey2}
                    dataKey3={obj.dataKey3}
                    dataKey4={obj.dataKey4}
                    index={index}
                    vals={[obj.left, obj.right, obj.leftC, obj.rightC]}
                  />}
                />
              )
              break;
            case "File Data":
              rows.push(
                <GraphExpansionPanel
                  key={'graph'+ctr}
                  title="Compare ADI Band Range Values By File"
                  graph={<ADIAEICompareFileLineChart
                    adi={true}
                    files={obj.files}
                    fileNames={obj.fileNames}
                  />}
                />
              )
              break;
            default:
              rows.push(
                <GraphExpansionPanel
                  key={'graph'+ctr}
                  title={obj.title}
                  graph={<ADIAEICompareLineChart
                    results={obj.data}
                    xAxisLabel={obj.xAxisLabel}
                    yAxisLabel={obj.yAxisLabel}
                    dataKey1={obj.dataKey1}
                    dataKey2={obj.dataKey2}
                    dataKey3={obj.dataKey3}
                    dataKey4={obj.dataKey4}
                    index={index}
                    vals={[obj.left, obj.right, obj.leftC, obj.rightC]}
                  />}
                />
              )
              break;
          }
          break;
        case "aei":
          switch(obj.title)
          {
            case "File Data":
              rows.push(
                <GraphExpansionPanel
                  key={'graph'+ctr}
                  title="AEI Band Range Values By File"
                  graph={<ADIAEICompareFileLineChart
                    adi={false}
                    files={obj.files}
                    fileNames={obj.fileNames}
                  />}
                />
              )
              break;
            case "AEI By Band Range":
              rows.push(
                <GraphExpansionPanel
                  key={'graph'+ctr}
                  title={obj.title}
                  graph={<ADIAEILineChart
                    results={obj.data}
                    xAxisLabel={obj.xAxisLabel}
                    yAxisLabel={obj.yAxisLabel}
                    dataKey1={obj.dataKey1}
                    dataKey2={obj.dataKey2}
                    index={index}
                    vals={[obj.left, obj.right]}
                    title={obj.title}
                    annotations={annotations}
                    audioCallback={this.props.audioCallback}
                    initializeAnnotationViewData={this.props.initializeAnnotationViewData}
                  />}
                />
              )
              break;
            default:
              rows.push(
                <GraphExpansionPanel
                  key={'graph'+ctr}
                  title={obj.title}
                  graph={<ADIAEILineChart
                    results={obj.data}
                    xAxisLabel={obj.xAxisLabel}
                    yAxisLabel={obj.yAxisLabel}
                    dataKey1={obj.dataKey1}
                    dataKey2={obj.dataKey2}
                    index={index}
                    vals={[obj.left, obj.right]}
                    title={obj.title}
                    annotations={annotations}
                    audioCallback={this.props.audioCallback}
                    initializeAnnotationViewData={this.props.initializeAnnotationViewData}

                  />}
                />
              )
              break;
          }
          break;
        case "aei-compare":
          switch(obj.title)
          {
            case "Compared By Band Values":
              rows.push(
                <GraphExpansionPanel
                  key={'graph'+ctr}
                  title={obj.title}
                  graph={<ADIAEICompareLineChart
                    results={obj.data}
                    xAxisLabel={obj.xAxisLabel}
                    yAxisLabel={obj.yAxisLabel}
                    dataKey1={obj.dataKey1}
                    dataKey2={obj.dataKey2}
                    dataKey3={obj.dataKey3}
                    dataKey4={obj.dataKey4}
                    index={index}
                    vals={[obj.left, obj.right, obj.leftC, obj.rightC]}
                  />}
                />
              )
              break;
            case "File Data":
              rows.push(
                <GraphExpansionPanel
                  key={'graph'+ctr}
                  title="Compare AEI Band Range Values By File"
                  graph={<ADIAEICompareFileLineChart
                    adi={false}
                    files={obj.files}
                    fileNames={obj.fileNames}
                  />}
                />
              )
              break;
            default:
              rows.push(
                <GraphExpansionPanel
                  key={'graph'+ctr}
                  title={obj.title}
                  graph={<ADIAEICompareLineChart
                    results={obj.data}
                    xAxisLabel={obj.xAxisLabel}
                    yAxisLabel={obj.yAxisLabel}
                    dataKey1={obj.dataKey1}
                    dataKey2={obj.dataKey2}
                    dataKey3={obj.dataKey3}
                    dataKey4={obj.dataKey4}
                    index={index}
                    vals={[obj.left, obj.right, obj.leftC, obj.rightC]}
                  />}
                />
              )
              break;
          }
          break;
        case "bi":
          switch(obj.title)
          {
            case "File Data":
              rows.push(
                <GraphExpansionPanel
                  key={'graph'+ctr}
                  title="Bioacoustic Value By File"
                  graph={<BACompareFileAreaChart
                    files={obj.files}
                    fileNames={obj.fileNames}
                  />}
                />
              )
            break;
            case "Bioacoustic Spectrum Values":
              rows.push(
                <GraphExpansionPanel
                  key={'graph'+ctr}
                  title={obj.title}
                  graph={<BAAreaChart
                    results={obj.data}
                    xAxisLabel={obj.xAxisLabel}
                    yAxisLabel={obj.yAxisLabel}
                    dataKey1={obj.dataKey1}
                    dataKey2={obj.dataKey2}
                    index={index}
                    title={obj.title}
                    annotations={annotations}
                    audioCallback={this.props.audioCallback}
                    initializeAnnotationViewData={this.props.initializeAnnotationViewData}
                  />}
                />
              )
              break;
            default:
              rows.push(
                <GraphExpansionPanel
                  key={'graph'+ctr}
                  title={obj.title}
                  graph={<BALineChart
                    callback={this.props.callback}
                    results={obj.data}
                    xAxisLabel={obj.xAxisLabel}
                    yAxisLabel={obj.yAxisLabel}
                    index={index}
                    title={obj.title}
                    annotations={annotations}
                    audioCallback={this.props.audioCallback}
                    initializeAnnotationViewData={this.props.initializeAnnotationViewData}
                  />}
                />
              )
              break;
          }
          break;
        case "bi-compare":
          switch(obj.title)
          {
            case "Compared By Spectrum Values":
              rows.push(
                <GraphExpansionPanel
                  key={'graph'+ctr}
                  title={obj.title}
                  graph={<BACompareAreaChart
                    callback={this.props.callback}
                    results={obj.data}
                    xAxisLabel={obj.xAxisLabel}
                    yAxisLabel={obj.yAxisLabel}
                    dataKey1={obj.dataKey1}
                    dataKey2={obj.dataKey2}
                    dataKey3={obj.dataKey3}
                    dataKey4={obj.dataKey4}
                  />}
                />
              )
              break;
            case "Compared By Date":
              rows.push(
                <GraphExpansionPanel
                  key={'graph'+ctr}
                  title={obj.title}
                  graph={<BADualLineChart
                    callback={this.props.callback}
                    results={obj.data}
                    xAxisLabel={obj.xAxisLabel}
                    yAxisLabel={obj.yAxisLabel}
                  />}
                />
              )
              break;
            case "File Data":
              rows.push(
                <GraphExpansionPanel
                  key={'graph'+ctr}
                  title="Bioacoustic Value By File"
                  graph={<BACompareFileAreaChart
                    files={obj.files}
                    fileNames={obj.fileNames}
                  />}
                />
              )
              break;
            default:
              break;
          }
          break;
        default:
          break;
      }
      ctr++;
    }

    return(
      <div>
        {rows}
      </div>
    )

  }
}

export default withStyles(styles)(GraphsTable);
