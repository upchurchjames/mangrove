import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import moment from 'moment';
import FormControlLabel from '@material-ui/core/FormControlLabel';

function createData(id, siteName, setName, fileName, recordTimeMs, latitude, longitude) {
  var recordTime = ''

  if(recordTimeMs[0].length && recordTimeMs[1].length)
    recordTime = moment(recordTimeMs[0] + ' ' + recordTimeMs[1]).format('MM/DD/YY, HH:mm:ss')
  else if(recordTimeMs[0].length)
    recordTime = moment(recordTimeMs[0]).format('MM/DD/YY')
  else if(recordTimeMs[1].length) {
    recordTime = moment('2000-01-01 ' + recordTimeMs[1]).format('MM/DD/YY, HH:mm:ss')
    recordTime = 'Date Needed' + recordTime.substring(recordTime.indexOf(', '), recordTime.length)
  }

  return { id: id, siteName, setName, fileName, recordTime, latitude, longitude };
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'siteName', numeric: false, disablePadding: true, label: 'Site Name' },
  { id: 'setName', numeric: false, disablePadding: true, label: 'File Set Name' },
  { id: 'fileName', numeric: false, disablePadding: true, label: 'File Name' },
  { id: 'recordTime', numeric: false, disablePadding: true, label: 'Time Recorded' },
  { id: 'latitude', numeric: true, disablePadding: true, label: 'Latitude' },
  { id: 'longitude', numeric: true, disablePadding: true, label: 'Longitude' },
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              style={{color: '#b6cd26'}}
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                align='center'
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title={<p style={{fontSize:10+'px'}}>Sort</p>}
                  placement='top'
                  enterDelay={300}
                >
                  <TableSortLabel
                    style={{ fontSize:15+'px' }}
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: '#b6cd26',
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: '#FE4A49',
  },
  title: {
    flex: '0 0 auto',
  }
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes, deleteFromUploads } = props;
  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography style={{backgroundColor: '#b6cd26'}} variant="h5">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            Files to Upload
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title={<p style={{fontSize:10+'px'}}>Delete</p>} placement='top' onClick={deleteFromUploads}>
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title={<p style={{fontSize:10+'px'}}>Filter List</p>} placement='top'>
            <IconButton aria-label="Filter List">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    width: '100%',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  selectPage: {
    marginLeft: theme.spacing.unit * 3
  }
});

class EnhancedTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'fileName',
    selected: this.props.selected,
    selectedPage: false,
    data: [

    ],
    page: 0,
    rowsPerPage: 5,
  };

  componentDidMount = () => {
    var fileNames = Object.keys(this.props.filteredInputs)
    var files = this.props.filteredInputs

    var data = fileNames.map(fileName => {
      return createData(files[fileName].file.name, files[fileName].json.site, files[fileName].json.series, files[fileName].file.name, files[fileName].json.recordTimeMs, files[fileName].json.coords.lat, files[fileName].json.coords.long)
    })
    
    this.setState({data: data})
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    var fileNames = Object.keys(this.props.filteredInputs)
    var files = this.props.filteredInputs

    if(prevProps !== this.props) {
      var data = fileNames.map(fileName => {
        return createData(files[fileName].file.name, files[fileName].json.site, files[fileName].json.series, files[fileName].file.name, files[fileName].json.recordTimeMs, files[fileName].json.coords.lat, files[fileName].json.coords.long)
      })

      if(data !== this.state.data)
        this.setState({data: data})
      if(this.props.selected !== this.state.selected)
        this.setState({selected: this.props.selected})
    }
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      var list = this.state.data.map(n => n.id)
      this.setState({ selected: list });
      this.props.updateSelectedInputs(list)
      return;
    }
    this.setState({ selected: [] });
    this.props.updateSelectedInputs([])
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    this.props.updateSelectedInputs(newSelected)
    this.setState({ selected: newSelected });
  };

  handleSelectPage = (event, page, rowsPerPage) => {
    if (event.target.checked) {
      var sortedData = stableSort(this.state.data, getSorting(this.state.order, this.state.orderBy))
      var startInx = page * rowsPerPage
      var list = sortedData.map(n => n.id).slice(startInx, startInx + rowsPerPage)
      
      this.setState({ selected: list });
      this.setState({ selectedPage: true });
      this.props.updateSelectedInputs(list)
      return;
    }
    this.setState({ selected: [] });
    this.setState({ selectedPage: false });
    this.props.updateSelectedInputs([])
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes, deleteFromUploads } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page, selectedPage } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <div>
        <Paper className={classes.root}>
          <EnhancedTableToolbar numSelected={selected.length} deleteFromUploads={deleteFromUploads}/>
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={data.length}
              />
              <TableBody>
                {stableSort(data, getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(n => {
                    const isSelected = this.isSelected(n.id);
                    return (
                      <TableRow
                        hover
                        onClick={event => this.handleClick(event, n.id)}
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={n.id}
                        selected={isSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox 
                            checked={isSelected} 
                            style={{color: '#b6cd26'}}
                          />
                        </TableCell>
                        <TableCell style={{ fontSize:13+'px' }} component="th" scope="row" padding="none">
                          {n.siteName}
                        </TableCell>
                        <TableCell style={{ fontSize:13+'px' }} component="th" scope="row" padding="none">{n.setName}</TableCell>
                        <TableCell style={{ fontSize:13+'px' }} component="th" scope="row" padding="none">{n.fileName}</TableCell>
                        <TableCell style={{ fontSize:13+'px' }} component="th" scope="row" padding="none">{n.recordTime}</TableCell>
                        <TableCell style={{ fontSize:13+'px' }} component="th" scope="row" padding="none">{n.latitude}</TableCell>
                        <TableCell style={{ fontSize:13+'px' }} component="th" scope="row" padding="none">{n.longitude}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            labelRowsPerPage={
              <div>
              
              <p style={{padding: 0, fontSize:13+'px'}}>Rows per page:</p>
              </div>
            }
            labelDisplayedRows={({ from, to , count}) => <p style={{fontSize:10+'px'}}>Displaying items {from}-{to} of total {count} items</p>}
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            component="div"
            spacer={{flex: '0 0 auto'}}
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
        <div className={classes.selectPage}>
          <FormControlLabel
            control={
              <Checkbox 
                checked={selectedPage}
                onChange={event => this.handleSelectPage(event, page, rowsPerPage)}
                style={{color: '#b6cd26', float: 'left', clear: 'none'}}
              />
            }
            label={<p style={{fontSize: '13px', margin: 0}}>Select Page</p>}
          />
        </div>
      </div>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);
