import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import TextField from '@mui/material/TextField';

import { showHideModalUpdateQuestion } from 'stores/modalSlice';
import { fetchAllQuestionsAdminThunk } from 'stores/questionAdminSlice';
import { EAuthToken } from 'variables';
import { showToast, toastType } from 'components/toast/toast';
import { getDetailsQuestion, updateQuestionsAdmin } from 'services/questions-admin-service';
import FormAnswer from 'components/form-answer/FormAnswer';
import './ModalUpdateQuestion.scss';

const ModalUpdateQuestion = () => {
  const dispatch = useDispatch();
  const [lengthFileList, setLengthFileList] = useState(0);
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  const isOpen = useSelector((state) => state.modal.isShowUpdateQuestion);
  const currentQuestionId = useSelector((state) => state.modal.currentQuestionId);

  const props = {
    name: 'thumbnail',
    action: 'https://quangnh.xyz/v1/questions/upload-thumbnail',
    headers: {
      Authorization: `Bearer ${localStorage.getItem(EAuthToken.ACCESS_TOKEN)}`,
    },
    onChange(info) {
      setLengthFileList(info.fileList.length);

      if (info.file.status === 'done') {
        setThumbnail(info.fileList[0].response.data);
        showToast(`${info.fileList[0].response.message}`, toastType.success);
      } else if (info.file.status === 'error') {
        showToast(
          `${info.fileList[0].response ? info.fileList[0].response.message : 'Upload Failed!'}`,
          toastType.error,
        );
      }
    },
    multiple: false,
  };

  const handleOk = async () => {
    dispatch(showHideModalUpdateQuestion(false));
    await updateQuestionsAdmin(currentQuestionId, {
      title: title,
      thumbnail_link: thumbnail,
    });

    dispatch(fetchAllQuestionsAdminThunk({}));
  };
  const handleCancel = () => {
    dispatch(showHideModalUpdateQuestion(false));
  };

  useEffect(() => {
    const fetchQuestion = async () => {
      const res = await getDetailsQuestion(currentQuestionId);
      setTitle(res.data.title);
      setThumbnail(res.data.thumbnail_link);

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

      {thumbnail && (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '12px 0' }}>
          <Image width={400} src={thumbnail} />
        </div>
      )}

      <Upload {...props}>
        <Button disabled={lengthFileList >= 1 ? true : false} icon={<UploadOutlined />}>
          Upload
        </Button>
      </Upload>

      <FormAnswer />
    </Modal>
  );
};
export default ModalUpdateQuestion;
