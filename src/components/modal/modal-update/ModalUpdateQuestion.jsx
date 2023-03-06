import { UploadOutlined } from '@ant-design/icons';
import TextField from '@mui/material/TextField';
import { Button, Image, Modal, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { showToast, toastType } from 'components/toast/toast';
import FormAnswer from 'containers/form-answer/FormAnswer';
import { showHideModalUpdateQuestion } from 'stores/modalSlice';
import {
  fetchAllQuestionsAdminThunk,
  getDetailsQuestionThunk,
  setCurrentQuestion,
  updateQuestionThunk,
} from 'stores/questionAdminSlice';
import { EAuthToken } from 'variables';
import './ModalUpdateQuestion.scss';

const ModalUpdateQuestion = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [progress, setProgress] = useState(false);

  const isOpen = useSelector((state) => state.modal.isShowUpdateQuestion);
  const currentQuestionId = useSelector((state) => state.modal.currentQuestionId);

  const props = {
    name: 'thumbnail',
    action: 'https://quangnh.xyz/v1/questions/upload-thumbnail',
    headers: {
      Authorization: `Bearer ${localStorage.getItem(EAuthToken.ACCESS_TOKEN)}`,
    },
    onChange({ file }) {
      if (file.status === 'done') {
        setProgress(false);

        setThumbnail(file.response.data);
        showToast(`${file.response.message}`, toastType.success);
      } else if (file.status === 'error') {
        setProgress(false);

        showToast(`${file.response ? file.response.message : 'Upload Failed!'}`, toastType.error);
      } else if (file.status === 'uploading') {
        setProgress(true);
      }
    },
    multiple: false,
  };

  const handleOk = async () => {
    dispatch(showHideModalUpdateQuestion(false));

    await dispatch(
      updateQuestionThunk({
        id: currentQuestionId,
        title: title,
        thumbnail_link: thumbnail,
      }),
    );

    dispatch(fetchAllQuestionsAdminThunk({}));
  };
  const handleCancel = () => {
    dispatch(showHideModalUpdateQuestion(false));
  };

  useEffect(() => {
    const fetchQuestion = async () => {
      const res = await dispatch(getDetailsQuestionThunk(currentQuestionId));
      dispatch(setCurrentQuestion(res.payload));

      setTitle(res.payload.title);
      setThumbnail(res.payload.thumbnail_link);

      return res.data;
    };

    isOpen && fetchQuestion();
  }, [currentQuestionId]);

  return (
    <Modal
      className="modal-update-question"
      title="Update Question?"
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <TextField
        id="outlined-basic"
        label="Title"
        variant="filled"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {progress && showToast(`Uploading...`, toastType.info)}

      {thumbnail && (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '12px 0' }}>
          <Image width={400} src={thumbnail} />
        </div>
      )}

      <Upload {...props} maxCount={1}>
        <Button loading={progress} icon={<UploadOutlined />}>
          Upload
        </Button>
      </Upload>

      <FormAnswer />
    </Modal>
  );
};
export default ModalUpdateQuestion;
