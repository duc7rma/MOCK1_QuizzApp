import { UploadOutlined } from '@ant-design/icons';
import { TextField } from '@mui/material';
import { Button, Image, Modal, Upload } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { showToast, toastType } from 'components/toast/toast';
import { addQuestionsAdmin } from 'services/questions-admin-service';
import { showHideModalAddQuestion } from 'stores/modalSlice';
import { fetchAllQuestionsAdminThunk } from 'stores/questionAdminSlice';
import { EAuthToken } from 'variables';
import './ModalAddQuestion.scss';

function ModalAddQuestion() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.isShowAddQuestion);

  const [title, setTitle] = useState('');
  const [lengthFileList, setLengthFileList] = useState(0);
  const [thumbnail, setThumbnail] = useState('');
  const [hasThumbnail, setHasThumbnail] = useState(false);

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
        setHasThumbnail(true);

        showToast(`${info.fileList[0].response.message}`, toastType.success);
      } else if (info.file.status === 'error') {
        showToast(
          `${info.fileList[0].response ? info.fileList[0].response.message : 'Upload Failed!'}`,
          toastType.error,
        );
      }
    },
    multiple: false,
    onRemove: () => setHasThumbnail(false),
  };

  const handleOk = async () => {
    dispatch(showHideModalAddQuestion(false));

    await addQuestionsAdmin({
      title: title,
      thumbnail_link: thumbnail,
    });

    dispatch(fetchAllQuestionsAdminThunk({}));
  };

  const handleCancel = () => {
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

      {hasThumbnail && (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '12px 0' }}>
          <Image width={400} src={thumbnail} />
        </div>
      )}

      <Upload {...props}>
        <Button disabled={lengthFileList >= 1 ? true : false} icon={<UploadOutlined />}>
          Upload
        </Button>
      </Upload>

      <p style={{ color: 'red', fontStyle: 'italic' }}>
        Note: To add answers for question, let do it in "Edit question"
      </p>
    </Modal>
  );
}

export default ModalAddQuestion;
