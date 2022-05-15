import useSWR from 'swr';
import qs from 'qs';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getAllGrade } from '@lib/fetcher/client/grade';

import type { NilaiSiswa } from '@lib/fetcher/server/nilai';
import type { TableState } from '@pages/admin/input';

const columns: GridColDef<NilaiSiswa>[] = [
  { field: 'id', headerName: 'ID' },
  {
    field: 'nis',
    headerName: 'NIS',
    valueGetter: (params) => {
      const { row } = params;
      return row.attributes.nis;
    },
    width: 200,
  },
  {
    field: 'name',
    headerName: 'Nama',
    valueGetter: (params) => {
      const { row } = params;
      return row.attributes.name;
    },
    width: 200,
  },
  {
    field: 'biologi',
    headerName: 'Biologi',
    valueGetter: (params) => {
      const { row } = params;
      return row.attributes.biologi;
    },
    width: 100,
  },
  {
    field: 'fisika',
    headerName: 'Fisika',
    valueGetter: (params) => {
      const { row } = params;
      return row.attributes.fisika;
    },
    width: 100,
  },
  {
    field: 'kimia',
    headerName: 'Kimia',
    valueGetter: (params) => {
      const { row } = params;
      return row.attributes.kimia;
    },
    width: 100,
  },
  {
    field: 'matematika',
    headerName: 'Matematika',
    valueGetter: (params) => {
      const { row } = params;
      return row.attributes.matematika;
    },
    width: 100,
  },
  {
    field: 'indonesia',
    headerName: 'Indonesia',
    valueGetter: (params) => {
      const { row } = params;
      return row.attributes.indonesia;
    },
    width: 100,
  },
  {
    field: 'inggris',
    headerName: 'Inggris',
    valueGetter: (params) => {
      const { row } = params;
      return row.attributes.inggris;
    },
    width: 100,
  },
];

interface GradeTableProps {
  tableState: TableState;
  setTableState: React.Dispatch<React.SetStateAction<TableState>>;
}

const GradeTable: React.FC<GradeTableProps> = ({
  tableState,
  setTableState,
}) => {
  const { data } = useSWR(
    () => {
      const query = qs.stringify(tableState, { encodeValuesOnly: true });
      return `/api/grade?${query}`;
    },
    () => getAllGrade(tableState)
  );

  return (
    <div style={{ height: '80vh', width: '100%' }}>
      <DataGrid
        rows={data ? data.data : []}
        columns={columns}
        page={tableState.pagination.page - 1}
        pageSize={tableState.pagination.pageSize}
        rowCount={data ? data.meta.pagination.total : 0}
        rowsPerPageOptions={[10, 20, 50, 100]}
        disableSelectionOnClick
        paginationMode='server'
        onPageSizeChange={(pageSize) => {
          setTableState((c) => ({
            ...c,
            pagination: { ...c.pagination, pageSize },
          }));
        }}
        onPageChange={(page) => {
          setTableState((c) => ({
            ...c,
            pagination: { ...c.pagination, page: page + 1 },
          }));
        }}
      />
    </div>
  );
};

export default GradeTable;
