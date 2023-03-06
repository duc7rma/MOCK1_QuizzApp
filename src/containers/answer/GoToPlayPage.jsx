import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Pagination } from 'antd';
import { useState } from 'react';

import { fetchListQuestionsThunk, setIndex } from 'stores/questionSlice';
import FormQuestion from './../question/FormQuestion';
import { setCurrentQuestionId } from 'stores/playSlice';

function GoToPlayPage() {
  const dispatch = useDispatch();
  const [totalQuestions, setTotalQuestions] = useState();

  const totalQuestionsRedux = useSelector((state) => state.questions.total);
  const indexQuestion = useSelector((state) => state.questions.index);
  const allQuestions = useSelector((state) => state.questions.questions);

  const currentQuestion = allQuestions[indexQuestion - 1];

  const handleFetchListQuestions = async () => {
    const res = await dispatch(fetchListQuestionsThunk(totalQuestions));
    const rs = unwrapResult(res);
    dispatch(setCurrentQuestionId(rs[0].id));
  };

  const handleChangePagination = (page) => {
    dispatch(setIndex(page));

    dispatch(setCurrentQuestionId(currentQuestion?.id));
  };

  return (
    <div className="go-to-play">
      {totalQuestionsRedux ? (
        <div className="play-container">
          <FormQuestion
            key={currentQuestion.id}
            title={currentQuestion.title}
            answers={currentQuestion.answers}
            thumbnail={currentQuestion.thumbnail_link}
          />

          <Pagination defaultCurrent={1} total={totalQuestionsRedux} pageSize={1} onChange={handleChangePagination} />
        </div>
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

export default GoToPlayPage;
