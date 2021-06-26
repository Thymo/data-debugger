import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Box, Chip} from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ConfusedTable(props) {
  const classes = useStyles();

  const {items} = props
  return (
      <Box mb={6}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table" size="small" >
            <TableHead>
              <TableRow>
                <TableCell width={"60%"}>Text</TableCell>
                <TableCell width={"25%"} align="right">Label</TableCell>
                {/*<TableCell align="right">Similarity</TableCell>*/}
                <TableCell width={"15%"} align="right">Confusion</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, index) => {
               let rowStyle = {}
               let textStyle = {
               }
               const isFirst = index === 0
                if(isFirst) {
                  rowStyle['borderBottom'] = '1px solid #e0e0e0';
                }
                return (
                <TableRow key={item.id} style={rowStyle}>
                  <TableCell component="th" scope="row" style={textStyle}>
                    {item.text}
                  </TableCell>
                  <TableCell align="right"><Chip size="small" label={item.intent} color={isFirst? 'primary': 'default'}/></TableCell>
                  <TableCell align="right">{item.score.toFixed(2)}</TableCell>
                </TableRow>
              )})}
            </TableBody>
          </Table>
        </TableContainer>
        </Box>
  );
}
