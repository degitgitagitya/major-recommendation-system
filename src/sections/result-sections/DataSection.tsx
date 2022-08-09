import useSWR from 'swr';
import qs from 'qs';

import { getAllResults } from '@lib/fetcher/client/result';
import { Typography, Divider } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import { getMyGrade } from '@lib/fetcher/client/grade';

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
  updateRanking: (
    key: 'ci_biologi' | 'ci_fisika' | 'ci_kimia' | 'ci_ilkom' | 'ci_matematika',
    value: number
  ) => void;
}

const DataSection: React.FC<DataSectionProps> = ({
  columns,
  identifier,
  title,
  updateRanking,
}) => {
  const paramsObject = {
    populate: '*',
    sort: [`${identifier}:desc`],
    pagination: {
      page: 1,
      pageSize: 100,
    },
  };

  const { data } = useSWR(
    () => {
      const params = qs.stringify(paramsObject, {
        encodeValuesOnly: true,
      });

      return `/api/result?${params}`;
    },
    () => getAllResults(paramsObject),
    {
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const { data: myGrade, mutate } = useSWR('/api/grade/my', getMyGrade, {
    onError: (error) => {
      console.log(error);
    },
  });

  console.log(myGrade)

  useEffect(() => {
    if (data && myGrade) {
      const rank = data.data.findIndex((datum) => {
        return datum.attributes.nilai_siswa.data.id === myGrade.id;
      });
      updateRanking(identifier, rank);
    }
  }, [data, myGrade]);

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
