import Parse from 'papaparse';
import AddGradeModal from './AddGradeModal';
import qs from 'qs';

import { useSWRConfig } from 'swr';
import { GetApp, ImportExport, UploadFile } from '@mui/icons-material';
import { Button, Link, styled, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { addGradeWithUser } from '@lib/fetcher/client/grade';
import { normalizeData } from '@lib/fetcher/client/normalizer';
import { processTopsis } from '@lib/fetcher/client/topsis';

import type { TableState } from '@pages/admin/input';

const Input = styled('input')({
  display: 'none',
});

interface InputToolbarProps {
  tableState: TableState;
}

const InputToolbar: React.FC<InputToolbarProps> = ({ tableState }) => {
  const { mutate } = useSWRConfig();

  const [currentFile, setCurrentFile] = useState<File | undefined>();
  const [csvData, setCsvData] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitData = async () => {
    setIsSubmitting(true);
    try {
      await Promise.all(csvData.map((datum) => addGradeWithUser(datum)));
      await normalizeData();
      await processTopsis();
      const query = qs.stringify(tableState, { encodeValuesOnly: true });
      mutate(`/api/grade?${query}`);
    } catch (error) {
      console.log(error);
    }
    setIsSubmitting(false);
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
      <AddGradeModal tableState={tableState} />

      <Link href='/example.csv' target='_blank' rel='noopener'>
        <Button
          startIcon={<GetApp />}
          variant='outlined'
          color='secondary'
          component='span'
        >
          Example CSV
        </Button>
      </Link>

      <label htmlFor='contained-button-file'>
        <Input
          accept='text/csv'
          id='contained-button-file'
          multiple
          type='file'
          onChange={(e) => {
            const { files } = e.target;
            if (files) {
              const file = files[0];
              if (file) {
                setCurrentFile(file);
                Parse.parse(file, {
                  complete: (results) => {
                    setCsvData(results.data);
                  },
                  header: true,
                  skipEmptyLines: true,
                });
              }
            }
          }}
        />

        <Button
          startIcon={<ImportExport />}
          variant='contained'
          color='secondary'
          component='span'
        >
          Import CSV
        </Button>
      </label>

      {currentFile && csvData.length > 0 && (
        <>
          <Typography>{currentFile.name}</Typography>

          <Button
            startIcon={<UploadFile />}
            variant='outlined'
            color='secondary'
            disabled={isSubmitting}
            onClick={submitData}
          >
            Submit
          </Button>
        </>
      )}
    </Box>
  );
};

export default InputToolbar;
