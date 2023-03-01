import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { fetchListQuestionsThunk } from 'stores/questionSlice';
import ListQuestions from '../question/ListQuestions';

function AnswerPage() {
  const dispatch = useDispatch();
  const [totalQuestions, setTotalQuestions] = useState();

  const totalQuestionsRedux = useSelector((state) => state.questions.total);

  const handleFetchListQuestions = () => {
    dispatch(fetchListQuestionsThunk(totalQuestions));
  };

  return (
    <div className="go-to-play">
      {totalQuestionsRedux ? (
        <ListQuestions />
      ) : (
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
      )}
    </div>
  );
}

export default AnswerPage;
