import React, { memo } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface DataRow {
  time: string;
  value: number;
}

interface Props {
  data: DataRow[];
}

const DataTable: React.FC<Props> = memo(({ data }) => {
  // Using React.memo to avoid unnecessary re-renders when parent component renders

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell align="right">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.time}>
              {/* Ensure 'row.time' is unique across the dataset */}
              <TableCell component="th" scope="row">
                {row.time}
              </TableCell>
              <TableCell align="right">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function for React.memo
  return JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
});

export default DataTable;
