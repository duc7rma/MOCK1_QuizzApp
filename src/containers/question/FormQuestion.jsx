import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';

import { Button } from '@mui/material';
import { Image } from 'antd';
import { imageQuestionDefault } from 'constants/src-image-default';
import './FormQuestion.scss';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function FormQuestion({ title, answers, thumbnail }) {
  const indexQuestion = useSelector((state) => state.questions.index);
  const allQuestions = useSelector((state) => state.questions.questions);
  const currentQuestionId = useSelector((state) => state.questions.currentQuestionId);
  const listQuestionsSubmit = useSelector((state) => state.questions.listQuestionsSubmit);

  const handleGetListAnswer = (id) => {
    const index = listQuestionsSubmit && listQuestionsSubmit.includes((question) => currentQuestionId === question.id);
    console.log(index);
  };

  return (
    <div className="form-question">
      <h2 className="form-question_title">{title}</h2>
      <Box sx={{ flexGrow: 1 }}>
        <Image width="50vw" src={thumbnail ? thumbnail : imageQuestionDefault} />
        <Grid container spacing={4}>
          {answers.map((answer) => (
            <Grid key={answer.id} item xs={6}>
              <Item style={{ fontSize: '16px', fontWeight: 600 }} onClick={() => handleGetListAnswer(answer.id)}>
                {answer.content}
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
      {indexQuestion === allQuestions.length && (
        <Button style={{ marginTop: '30px' }} variant="contained" type="submit">
          Submit
        </Button>
      )}
    </div>
  );
}

export default FormQuestion;
