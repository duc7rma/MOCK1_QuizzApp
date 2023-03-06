import { UploadOutlined } from '@ant-design/icons';
import TextField from '@mui/material/TextField';
import { Button, Cascader, Image, Modal, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { showToast, toastType } from 'components/toast/toast';
import { showHideModalUpdateUser } from 'stores/modalSlice';
import { fetchAllUsersAdminThunk, getDetailsUserThunk, setCurrentUser, updateUserThunk } from 'stores/userAdminSlice';
import { convertUserRole, optionsUserRole } from 'utils/user-utils';
import { EAuthToken } from 'variables';
import './ModalUpdateQuestion.scss';
import { updateAvatar } from 'stores/userSlice';

const ModalUpdateUser = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [email, setEmail] = useState('');
  const [roles, setRoles] = useState([]);
  const [progress, setProgress] = useState(false);

  const isOpen = useSelector((state) => state.modal.isShowUpdateUser);
  const currentUserId = useSelector((state) => state.modal.currentUserId);
  const userAuthId = useSelector((state) => state.user.user.id);

  const props = {
    name: 'avatar',
    action: 'https://quangnh.xyz/v1/user/upload-avatar',
    headers: {
      Authorization: `Bearer ${localStorage.getItem(EAuthToken.ACCESS_TOKEN)}`,
    },
    onChange({ file }) {
      if (file.status === 'done') {
        setProgress(false);

        setAvatar(file.response.data);
        dispatch(updateAvatar(file.response.data));

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

  const handleChangeRoles = (arrRoles) => {
    let roles = [];
    arrRoles.forEach((ele) => {
      roles.push(...ele);
    });
    setRoles(roles);
  };

  const handleOk = async () => {
    dispatch(showHideModalUpdateUser(false));

    await dispatch(
      updateUserThunk({
        id: currentUserId,
        email: email,
        name: name,
        avatar_link: avatar,
        roles: roles.length > 0 ? roles : ['user'],
      }),
    );

    dispatch(fetchAllUsersAdminThunk({}));
  };

  const handleCancel = () => {
    dispatch(showHideModalUpdateUser(false));
  };

  useEffect(() => {
    const fetchQuestion = async () => {
      const res = await dispatch(getDetailsUserThunk(currentUserId));
      dispatch(setCurrentUser(res.payload));

      setName(res.payload.name);
      setEmail(res.payload.email);
      setAvatar(res.payload.avatar_link);
      setRoles(res.payload.roles);

      return res.data;
    };

    isOpen && fetchQuestion();
  }, [currentUserId]);

  return (
    <Modal
      className="modal-update-question"
      title="Update Question?"
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="button" type="default" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button disabled={!Boolean(roles.length)} key="submit" type="primary" onClick={handleOk}>
          Ok
        </Button>,
      ]}
    >
      <TextField disabled id="outlined-basic" label="Email" variant="filled" fullWidth value={email} />

      <TextField
        id="outlined-basic"
        label="Name"
        variant="filled"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {progress && showToast(`Uploading...`, toastType.info)}

      {userAuthId === currentUserId && (
        <>
          <div
            style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '12px 0', borderRadius: '50%' }}
          >
            <Image width={150} src={avatar} />
          </div>

          <Upload {...props} maxCount={1}>
            <Button loading={progress} icon={<UploadOutlined />}>
              Upload
            </Button>
          </Upload>
        </>
      )}

      <Cascader
        name="roles"
        placeholder="Roles"
        options={optionsUserRole}
        style={{ marginTop: '12px', width: '100%' }}
        multiple
        maxTagCount="responsive"
        value={convertUserRole(roles)}
        onChange={handleChangeRoles}
      />
    </Modal>
  );
};
export default ModalUpdateUser;
