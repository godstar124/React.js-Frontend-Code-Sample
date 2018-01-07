import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

import Utils from '../utils';

const SimpleTable = ({columns, rows, rowKeys}) => (
  <Table>
    <TableHeader>
      <TableRow>
        {columns.map((col, i) => <TableHeaderColumn key={i}>{col}</TableHeaderColumn>)}
      </TableRow>
    </TableHeader>
    <TableBody>
      {rows.map((row, iRow) => (
        <TableRow key={iRow}>
          {rowKeys.map((rKey, iKey) => <TableRowColumn key={iKey}>{Utils.notEmpty(row[rKey]) ? row[rKey] : 'data error'}</TableRowColumn>)}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

SimpleTable.PropTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  rowKeys: PropTypes.array.isRequired
};

export default SimpleTable;
