import Parse from 'papaparse';

import { Add, ImportExport, UploadFile } from '@mui/icons-material';
import { Button, styled, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';

const Input = styled('input')({
  display: 'none',
});

const InputToolbar: React.FC = () => {
  const [currentFile, setCurrentFile] = useState<File | undefined>();
  const [csvData, setCsvData] = useState<any[]>([]);

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
      <Button startIcon={<Add />} variant='contained'>
        Tambahkan Siswa
      </Button>

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
          >
            Submit
          </Button>
        </>
      )}
    </Box>
  );
};

export default InputToolbar;
