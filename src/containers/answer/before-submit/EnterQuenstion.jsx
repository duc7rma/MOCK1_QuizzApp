import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box, Stack } from '@mui/material';

import { fetchListQuestionsThunk } from 'stores/questionSlice';

function EnterQuestions() {
  const dispatch = useDispatch();
  const [totalQuestions, setTotalQuestions] = useState();

  const handleFetchListQuestions = async () => {
    await dispatch(fetchListQuestionsThunk(totalQuestions));
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '100ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          type="number"
          InputProps={{ inputProps: { min: 1 } }}
          label="Enter number of questions"
          variant="outlined"
          onChange={(e) => setTotalQuestions(e.target.value)}
        />
      </Box>
      <Stack style={{ display: 'flex', justifyContent: 'center' }} spacing={2} direction="row">
        <Button variant="contained" onClick={handleFetchListQuestions}>
          Start
        </Button>
      </Stack>
    </>
  );
}

export default EnterQuestions;
