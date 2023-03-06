import { Button, Input } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { unwrapResult } from '@reduxjs/toolkit';
import { setIsEditAnswer, updateAnswerThunk, updateTitleAnswer } from 'stores/answerAdminSlice';

function UpdateTitle({ checked, setIsEdit, content, answerId }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(content);

  const loading = useSelector((state) => state.answerAdmin.loadingUpdate);

  const handleSaveTitle = async () => {
    const res = await dispatch(
      updateAnswerThunk({
        id: answerId,
        is_correct: checked,
        content: title,
      }),
    );

    const rs = unwrapResult(res);
    dispatch(
      updateTitleAnswer({
        id: rs.id,
        content: rs.content,
      }),
    );

    setIsEdit(false);
  };

  const handleCancel = () => {
    setIsEdit(false);
    dispatch(setIsEditAnswer(false));
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <Input value={title} style={{ marginRight: '10px' }} onChange={(e) => setTitle(e.target.value)} />

      <Button type="primary" style={{ marginRight: '10px' }} danger onClick={handleCancel}>
        Cancel
      </Button>

      <Button type="primary" onClick={handleSaveTitle} loading={loading}>
        Save
      </Button>
    </div>
  );
}

export default UpdateTitle;
