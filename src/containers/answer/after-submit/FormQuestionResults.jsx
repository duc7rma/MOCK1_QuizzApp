import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Image } from 'antd';

import { Item } from 'components/item/Item';
import { imageQuestionDefault } from 'constants/src-image-default';
import './FormQuestionResults.scss';

function FormQuestionSubmitted({ title, answers, thumbnail }) {
  return (
    <div className="form-question">
      <h2 className="form-question_title">{title}</h2>
      <Box sx={{ flexGrow: 1 }}>
        <Image width="50vw" src={thumbnail ? thumbnail : imageQuestionDefault} />
        <Grid container spacing={4}>
          {answers.map((answer) => {
            let color = answer.is_correct ? 'greenyellow' : 'fff';
            if (answer.is_submit_correct === false) color = 'red';
            return (
              <Grid key={answer.id} item xs={6}>
                <Item style={{ fontSize: '16px', fontWeight: 600, background: `${color}` }}>{answer.content}</Item>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </div>
  );
}

export default FormQuestionSubmitted;
