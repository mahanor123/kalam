/* eslint-disable no-nested-ternary */
import React, { PureComponent, Fragment } from 'react';
import axios from 'axios';
import { Button, Grid } from '@material-ui/core';
import MainUiFile from '../ReUsableComponents/MainUiFile';
import PartnersPaginationPriority from '../ReUsableComponents/PagePagination';
import TableData from './TableData';
import AddPartner from './AddPartner';
import HeaderBar from '../HeaderBar';
import EditPartner from './EditPartner';

export class UIData extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ListOfData: [],
      isAddRow: false,
      isEditRow: false,
      EditableTableRowValues: {},
      ShowingPage: 0,
      StylingForRow: false,
      screenSize: null,
      name: 'partners',
      value: '',
      DataNow: [],
    };
  }

  async componentDidMount() {
    const { params } = this.props.match;
    if (params.id) {
      const resp = await axios.get(`http://join.navgurukul.org/api/partners/${params.id}`);
      const EachRowData = resp.data.data;
      console.log(EachRowData, 'resp');
      const query = this.useQuery();
      const page = query.get('page');
      let screenSize;
      const updatedTable = EachRowData;
      const value = query.get('name');
      this.EditRowHandler({
        EachRowData, page, screenSize, updatedTable, value,
      });
      this.setState({
        value,
      });
    }
    const response = await axios.get('http://join.navgurukul.org/api/partners');
    // console.log(response.data.data.length, 'response');
    this.setState({
      ListOfData: response.data.data,
    });
  }

  useQuery = () => {
    return new URLSearchParams(this.props.location.search);
  }

  AddRowHandler = () => {
    this.props.history.push('/partners/add');
    console.log(this.state.isAddRow, 'isAdd row befor setState');
    this.setState({ isAddRow: true }, () => {
      if (this.state.isAddRow) {
        console.log(this.state.isAddRow, 'inside if row befor setState');
        this.setState({
          isEditRow: false,
          screenSize: window.screen.width,
        });
        // this.props.history.push('partners/add');
      } else {
        this.props.history.push('partners');
      }
    });
    console.log(this.state.isAddRow, 'isAdd row after setState');
  }

  EditRowHandler = ({
    EachRowData, page, screenSize, value, updatedTable,
  }) => {
    console.log(value, 'naya');
    if (value) {
      this.props.history.push(`/partners/${EachRowData.id}?page=${page}&name=${value}`);
    } else {
      this.props.history.push(`/partners/${EachRowData.id}?page=${page}`);
    }
    this.setState({
      isEditRow: true,
      StylingForRow: true,
      EditableTableRowValues: EachRowData,
      ShowingPage: page,
      screenSize,
      inputValue: value,
      DataNow: updatedTable,
    });
    localStorage.setItem('page', page);
  }

  LeftPlane = ({ ListOfData, isEditRow, isAddRow }) => {
    console.log(this.state.DataNow, 'left');
    return (
      <Fragment>
        <Grid item xs={12}><HeaderBar /></Grid>
        <Grid item xs={12} style={{ padding: 10 }}>
          {this.state.isEditRow
            ? <PartnersPaginationPriority data={this.state.DataNow} onClick={this.EditRowHandler} PageShowing={this.state.ShowingPage} StylingForRow={this.state.StylingForRow} EditedData={this.state.EditableTableRowValues} isEditRow={this.state.isEditRow} TableData={TableData} NameLIst={this.state.name} search={this.state.inputValue} DataNow={this.state.DataNow} />
            : this.state.isAddRow
              ? <PartnersPaginationPriority data={this.state.ListOfData} onClick={this.AddRowHandler} PageShowing={this.state.ShowingPage} StylingForRow={this.state.StylingForRow} isAddRow={this.state.isAddRow} TableData={TableData} NameLIst={this.state.name} search={this.state.value} DataNow={this.state.DataNow} />
              : null
          }
        </Grid>
      </Fragment>
    );
  }

  RightPlane = ({ isEditRow, isAddRow }) => {
    // console.log(onClick, 'right');
    return (
      <Fragment>
        <Grid item xs={12}>
          {this.state.isAddRow
            ? <AddPartner handleClose={this.addHandleClose} />
            : this.state.isEditRow ? <EditPartner data={this.state.EditableTableRowValues} onClick={this.EditPartnerHandlerFrom} onClickCLose={this.EditCloseByButton} />
              : null
        }
        </Grid>
      </Fragment>
    );
  }

  addHandleClose = () => {
    this.props.history.push('/partners');
    this.setState({
      // isDialogOpen: false,
      isAddRow: false,
    });
  }

  EditPartnerHandlerFrom = (e) => {
    // this.props.history.push(`/${this.props.Uidata[0].name}/${e.id}`);
    this.props.history.push('/partners');
    this.setState({ isEditRow: false });
  };


  EditCloseByButton = () => {
    this.props.history.push('/partners');
    this.setState({
      isEditRow: false,
      StylingForRow: false,
      value: '',
    });
  }

  render() {
    console.log(this.state.ListOfData, 'TotalData from Uidata');
    return (
      <MainUiFile AddRowHandler={this.AddRowHandler} EditRowHandler={this.EditRowHandler} addHandleClose={this.addHandleClose} ListOfData={this.state.ListOfData} TableData={TableData} LeftPlane={this.LeftPlane} RightPlane={this.RightPlane} isAddRow={this.state.isAddRow} isEditRow={this.state.isEditRow} screenSize={this.state.screenSize} StylingForRow={this.state.StylingForRow} EditableTableRowValues={this.state.EditableTableRowValues} ShowingPage={this.state.ShowingPage} NameLIst={this.state.name} value={this.state.value} DataNow={this.state.DataNow} />
    );
  }
}

export default UIData;
