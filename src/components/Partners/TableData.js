import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';

const TableData = [
  {
    name: 'name',
    priority: 1,
    minWidth: 200,
    render: function Show(e) {
      return (<TableCell align="center">{e[this.name]}</TableCell>);
    },
  }, {
    name: 'id',
    priority: 3,
    minWidth: 200,
    render: function Show(e) {
      return (<TableCell align="center">{e[this.name]}</TableCell>);
    },
  },
  {
    name: 'notes',
    priority: 2,
    minWidth: 200,
    render: function Show(e) {
      return (<TableCell align="center">{e[this.name]}</TableCell>);
    },
  },
  {
    name: 'slug',
    priority: 4,
    minWidth: 200,
    render: function Show(e) {
      return (<TableCell align="center">{e[this.name]}</TableCell>);
    },
  },
];

export default TableData;
