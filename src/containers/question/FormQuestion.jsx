import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Image } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { imageQuestionDefault } from 'constants/src-image-default';
import { showHideModalSubmitQuestion } from 'stores/modalSlice';
import { setAnswers } from 'stores/questionSlice';
import ModalSubmitQuestion from 'components/modal/modal-submit-question/ModalSubmitQuestion';
import './FormQuestion.scss';
import { Item } from 'components/item/Item';

function FormQuestion({ title, answers, thumbnail }) {
  const dispatch = useDispatch();
  const [questionSubmit, setQuestionSubmit] = useState({});

  const index = useSelector((state) => state.questions.index);
  const allQuestions = useSelector((state) => state.questions.questions);
  const loadingSubmit = useSelector((state) => state.questions.loadingSubmit);

  const handleGetQuestionSubmit = (id) => {
    let tempArrSubmit = [...questionSubmit.answersSubmittedId];

    if (tempArrSubmit.includes(id)) {
      tempArrSubmit = tempArrSubmit.filter((answerId) => answerId !== id);
    } else {
      tempArrSubmit.push(id);
    }

    const newQuestionSubmit = {
      ...questionSubmit,
      answersSubmittedId: [...tempArrSubmit],
    };

    dispatch(
      setAnswers({
        ...newQuestionSubmit,
      }),
    );
  };

  const handleSubmitAnswer = async () => {
    dispatch(showHideModalSubmitQuestion(true));
  };

  useEffect(() => {
    allQuestions[index - 1]?.answersSubmittedId
      ? setQuestionSubmit({ ...allQuestions[index - 1] })
      : setQuestionSubmit({ ...allQuestions[index - 1], answersSubmittedId: [] });
  }, [allQuestions, index]);

  return (
    <div className="form-question">
      <h2 className="form-question_title">{title}</h2>
      <Box sx={{ flexGrow: 1 }}>
        <Image width="50vw" src={thumbnail ? thumbnail : imageQuestionDefault} />
        <Grid container spacing={4}>
          {answers.map((answer) => {
            const color = questionSubmit.answersSubmittedId?.includes(answer.id) ? 'aqua' : '#fff';
            return (
              <Grid key={answer.id} item xs={6}>
                <Item
                  style={{ fontSize: '16px', fontWeight: 600, background: `${color}` }}
                  onClick={() => handleGetQuestionSubmit(answer.id)}
                >
                  {answer.content}
                </Item>
              </Grid>
            );
          })}
        </Grid>
      </Box>
      {index === allQuestions.length && (
        <>
          <Button
            style={{ marginTop: '30px' }}
            variant="contained"
            loading={loadingSubmit ? 1 : 0}
            onClick={handleSubmitAnswer}
          >
            Submit
          </Button>
          <ModalSubmitQuestion />
        </>
      )}
    </div>
  );
}

export default FormQuestion;
