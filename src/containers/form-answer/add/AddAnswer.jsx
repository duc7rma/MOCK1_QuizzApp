import { PlusOutlined } from '@ant-design/icons';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { Button, Input } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addAnswerAdmin } from 'services/answer-admin-service';
import { addAnswer } from 'stores/answerAdminSlice';

function AddAnswer() {
  const dispatch = useDispatch();
  const [answer, setAnswer] = useState('');
  const [checked, setChecked] = useState(false);

  const loading = useSelector((state) => state.answerAdmin.loadingAdd);
  const questionId = useSelector((state) => state.questionsAdmin.currentQuestionDetail.id);

  const handleSubmit = async () => {
    const payload = {
      content: answer,
      is_correct: checked,
      questionId: questionId,
    };
    const res = await addAnswerAdmin(payload);
    dispatch(addAnswer(res?.data));

    setAnswer('');
    setChecked(false);

    return res.data;
  };

  return (
    <div>
      <Button
        disabled={!!!answer}
        type="primary"
        icon={<PlusOutlined />}
        size="small"
        style={{ marginRight: '20px' }}
        onClick={handleSubmit}
        loading={loading}
      />
      <FormControlLabel
        control={
          <Checkbox
            name="rememberMe"
            color="primary"
            value={checked}
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
        }
        style={{ marginRight: 0 }}
      />
      <Input
        placeholder="Add answer"
        value={answer}
        style={{ width: '75%' }}
        name="title"
        onChange={(e) => setAnswer(e.target.value)}
      />
    </div>
  );
}

export default AddAnswer;
