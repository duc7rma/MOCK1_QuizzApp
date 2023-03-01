import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import './FormQuestion.scss';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function FormQuestion({ title, answers }) {
  return (
    <div className="form-question">
      <h2 className="form-question_title">{title}</h2>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4}>
          {answers.map((answer) => (
            <Grid key={answer.id} item xs={6}>
              <Item>{answer.content}</Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default FormQuestion;
