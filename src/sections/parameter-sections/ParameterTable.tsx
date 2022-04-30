import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TextField } from '@mui/material';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const ParameterTable: React.FC = () => {
  const [parameterData, setParameterData] = React.useState([
    {
      kriteria: 'biologi',
      biologi: 1,
      fisika: 0,
      kimia: 0,
      matematika: 0,
      indonesia: 0,
      inggris: 0,
    },
    {
      kriteria: 'fisika',
      biologi: 0,
      fisika: 1,
      kimia: 0,
      matematika: 0,
      indonesia: 0,
      inggris: 0,
    },
    {
      kriteria: 'kimia',
      biologi: 0,
      fisika: 0,
      kimia: 1,
      matematika: 0,
      indonesia: 0,
      inggris: 0,
    },
    {
      kriteria: 'matematika',
      biologi: 0,
      fisika: 0,
      kimia: 0,
      matematika: 1,
      indonesia: 0,
      inggris: 0,
    },
    {
      kriteria: 'indoensia',
      biologi: 0,
      fisika: 0,
      kimia: 0,
      matematika: 0,
      indonesia: 1,
      inggris: 0,
    },
    {
      kriteria: 'inggirs',
      biologi: 0,
      fisika: 0,
      kimia: 0,
      matematika: 0,
      indonesia: 0,
      inggris: 1,
    },
  ]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Kriteria</TableCell>
            <TableCell align='right'>Biologi</TableCell>
            <TableCell align='right'>Fisika</TableCell>
            <TableCell align='right'>Kimia</TableCell>
            <TableCell align='right'>Matematika</TableCell>
            <TableCell align='right'>Indonesia</TableCell>
            <TableCell align='right'>Inggris</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {parameterData.map((row, index) => {
            const current =
              index === 0
                ? 'biologi'
                : index === 1
                ? 'fisika'
                : index === 2
                ? 'kimia'
                : index === 3
                ? 'matematika'
                : index === 4
                ? 'indonesia'
                : 'inggris';


            return (
              <TableRow
                key={row.kriteria}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell
                  component='th'
                  scope='row'
                  sx={{ textTransform: 'capitalize' }}
                >
                  {row.kriteria}
                </TableCell>
                <TableCell align='right'>
                  <TextField
                    size='small'
                    type='number'
                    disabled={index >= 0}
                    value={row.biologi}
                    onChange={(e) => {
                      const num = parseFloat(e.target.value);
                      if (!isNaN(num)) {
                        const arrayTemp = [...parameterData];
                        arrayTemp[index].biologi = num;
                        setParameterData(arrayTemp);
                      }
                    }}
                  />
                </TableCell>
                <TableCell align='right'>
                  <TextField
                    size='small'
                    type='number'
                    disabled={index >= 1}
                    value={row.fisika}
                    onChange={(e) => {
                      const num = parseFloat(e.target.value);
                      if (!isNaN(num)) {
                        const arrayTemp = [...parameterData];
                        arrayTemp[index].fisika = num;
                        arrayTemp[1][current] = 1 / num;
                        setParameterData(arrayTemp);
                      }
                    }}
                  />
                </TableCell>
                <TableCell align='right'>
                  <TextField
                    size='small'
                    type='number'
                    disabled={index >= 2}
                    value={row.kimia}
                    onChange={(e) => {
                      const num = parseFloat(e.target.value);
                      if (!isNaN(num)) {
                        const arrayTemp = [...parameterData];
                        arrayTemp[index].kimia = num;
                        arrayTemp[2][current] = 1 / num;
                        setParameterData(arrayTemp);
                      }
                    }}
                  />
                </TableCell>
                <TableCell align='right'>
                  <TextField
                    size='small'
                    type='number'
                    disabled={index >= 3}
                    value={row.matematika}
                    onChange={(e) => {
                      const num = parseFloat(e.target.value);
                      if (!isNaN(num)) {
                        const arrayTemp = [...parameterData];
                        arrayTemp[index].matematika = num;
                        arrayTemp[3][current] = 1 / num;
                        setParameterData(arrayTemp);
                      }
                    }}
                  />
                </TableCell>
                <TableCell align='right'>
                  <TextField
                    size='small'
                    type='number'
                    disabled={index >= 4}
                    value={row.indonesia}
                    onChange={(e) => {
                      const num = parseFloat(e.target.value);
                      if (!isNaN(num)) {
                        const arrayTemp = [...parameterData];
                        arrayTemp[index].indonesia = num;
                        arrayTemp[4][current] = 1 / num;
                        setParameterData(arrayTemp);
                      }
                    }}
                  />
                </TableCell>
                <TableCell align='right'>
                  <TextField
                    size='small'
                    type='number'
                    disabled={index >= 5}
                    value={row.inggris}
                    onChange={(e) => {
                      const num = parseFloat(e.target.value);
                      if (!isNaN(num)) {
                        const arrayTemp = [...parameterData];
                        arrayTemp[index].inggris = num;
                        arrayTemp[5][current] = 1 / num;
                        setParameterData(arrayTemp);
                      }
                    }}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ParameterTable;
