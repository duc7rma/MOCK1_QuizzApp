import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { unwrapResult } from '@reduxjs/toolkit';
import { Button } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteAnswerAdmin } from 'services/answer-admin-service';
import { deleteAnswer, setIsEditAnswer, toggleCheckBoxAnswer, updateAnswerThunk } from 'stores/answerAdminSlice';
import UpdateTitle from './UpdateTitle';

function UpdateAnswer({ content, correct, answerId }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.answerAdmin.loadingDelete);
  // const isEdit = useSelector((state) => state.answerAdmin.isEditAnswer);

  const [checked, setChecked] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const handleDelete = async () => {
    await deleteAnswerAdmin(answerId);

    dispatch(deleteAnswer(answerId));
  };

  const handleToggleCheckBox = async (e) => {
    setChecked(e.target.checked);

    const res = await dispatch(
      updateAnswerThunk({
        id: answerId,
        is_correct: e.target.checked,
        content: content,
      }),
    );

    const rs = unwrapResult(res);
    dispatch(
      toggleCheckBoxAnswer({
        id: rs.id,
        is_correct: rs.is_correct,
      }),
    );
  };

  return (
    <div>
      <Button
        type="primary"
        icon={<EditOutlined />}
        size="small"
        style={{ marginRight: '20px', backgroundColor: 'green' }}
        onClick={() => {
          setIsEdit(true);
          dispatch(setIsEditAnswer(true));
        }}
      />
      <Button
        type="primary"
        icon={<DeleteOutlined />}
        danger
        size="small"
        style={{ marginRight: '20px' }}
        onClick={handleDelete}
        loading={loading}
      />
      <FormControlLabel
        label={content}
        control={<Checkbox name="rememberMe" color="primary" checked={correct} onChange={handleToggleCheckBox} />}
      />

      {isEdit && <UpdateTitle answerId={answerId} checked={checked} setIsEdit={setIsEdit} content={content} />}
    </div>
  );
}

export default UpdateAnswer;
