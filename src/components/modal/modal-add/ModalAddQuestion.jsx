import { UploadOutlined } from '@ant-design/icons';
import { TextField } from '@mui/material';
import { Button, Image, Modal, Upload } from 'antd';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { showToast, toastType } from 'components/toast/toast';
import { addQuestionsAdmin } from 'services/questions-admin-service';
import { showHideModalAddQuestion } from 'stores/modalSlice';
import { fetchAllQuestionsAdminThunk } from 'stores/questionAdminSlice';
import { EAuthToken } from 'variables';
import './ModalAddQuestion.scss';

function ModalAddQuestion() {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [hasThumbnail, setHasThumbnail] = useState(false);
  const [progress, setProgress] = useState(false);

  const isOpen = useSelector((state) => state.modal.isShowAddQuestion);

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
        setHasThumbnail(true);

        showToast(`${file.response.message}`, toastType.success);
      } else if (file.status === 'error') {
        setProgress(false);

        showToast(`${file.response ? file.response.message : 'Upload Failed!'}`, toastType.error);
      } else if (file.status === 'uploading') {
        setProgress(true);
      }
    },
    multiple: false,
    onRemove: (e) => {
      setHasThumbnail(false);
    },
  };

  const handleOk = async () => {
    await addQuestionsAdmin({
      title: title,
      thumbnail_link: thumbnail,
    });

    setTitle('');
    setThumbnail();
    setHasThumbnail(true);

    if (Boolean(title)) {
      dispatch(showHideModalAddQuestion(false));
      dispatch(fetchAllQuestionsAdminThunk({}));
    }
  };

  const handleCancel = () => {
    setTitle('');
    setThumbnail();
    setHasThumbnail(true);

    console.log('inputRef.current:', inputRef.current);

    inputRef.current.fileList = [];
    dispatch(showHideModalAddQuestion(false));
  };

  return (
    <Modal
      className="modal-add-question"
      title="Add New Question"
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

      {hasThumbnail && thumbnail && (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '12px 0' }}>
          <Image width={400} src={thumbnail} />
        </div>
      )}

      <>
        <Upload {...props} maxCount={1} ref={inputRef} showUploadList={false}>
          <Button loading={progress} icon={<UploadOutlined />}>
            Upload
          </Button>
        </Upload>
      </>

      <p style={{ color: 'red', fontStyle: 'italic' }}>
        Note: To add answers for question, let do it in "Edit question"
      </p>
    </Modal>
  );
}

export default ModalAddQuestion;
