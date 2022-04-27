import useSWR from 'swr';

import { getAllResults } from '@lib/fetcher/client/result';
import { Typography, Divider } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/system';

import type { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import type { Result } from '@lib/fetcher/client/result';

interface DataSectionProps {
  columns: GridColDef<Result>[];
  identifier:
    | 'ci_biologi'
    | 'ci_fisika'
    | 'ci_kimia'
    | 'ci_ilkom'
    | 'ci_matematika';
  title: string;
}

const DataSection: React.FC<DataSectionProps> = ({
  columns,
  identifier,
  title,
}) => {
  const { data } = useSWR(
    `/api/result`,
    () =>
      getAllResults({
        populate: '*',
        sort: [`${identifier}:desc`],
      }),
    {
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const rows = data
    ? data.data.map((datum, index) => ({
        ...datum,
        attributes: {
          ...datum.attributes,
          ranking: index + 1,
        },
      }))
    : [];

  const currentColumns: GridColDef<Result>[] = [
    ...columns,
    ...[
      {
        field: identifier,
        headerName: `CI ${title}`,
        valueGetter: (params: GridValueGetterParams<any, Result>) =>
          params.row.attributes[identifier].toFixed(4),
        width: 150,
      },
    ],
  ];

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant='h5'>{title}</Typography>
      <Divider sx={{ mb: 2, mt: 1 }} />
      <Box sx={{ height: '500px' }}>
        <DataGrid rows={rows} columns={currentColumns} />
      </Box>
    </Box>
  );
};

export default DataSection;