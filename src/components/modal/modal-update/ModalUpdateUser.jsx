import { UploadOutlined } from '@ant-design/icons';
import TextField from '@mui/material/TextField';
import { Button, Cascader, Image, Modal, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { showToast, toastType } from 'components/toast/toast';
import { showHideModalUpdateUser } from 'stores/modalSlice';
import { fetchAllUsersAdminThunk, getDetailsUserThunk, setCurrentUser, updateUserThunk } from 'stores/userAdminSlice';
import { convertUserRole, optionsUserRole } from 'utils/user-ultis';
import { EAuthToken } from 'variables';
import './ModalUpdateQuestion.scss';

const ModalUpdateUser = () => {
  const dispatch = useDispatch();
  const [lengthFileList, setLengthFileList] = useState(0);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [email, setEmail] = useState('');
  const [roles, setRoles] = useState([]);

  const isOpen = useSelector((state) => state.modal.isShowUpdateUser);
  const currentUserId = useSelector((state) => state.modal.currentUserId);

  const props = {
    name: 'avatar',
    action: 'https://quangnh.xyz/v1/user/upload-avatar',
    headers: {
      Authorization: `Bearer ${localStorage.getItem(EAuthToken.ACCESS_TOKEN)}`,
    },
    onChange(info) {
      setLengthFileList(info.fileList.length);

      if (info.file.status === 'done') {
        setAvatar(info.fileList[0].response.data);
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

  const handleChangeRoles = (arrRoles) => {
    let roles = [];
    arrRoles.forEach((ele) => {
      roles.push(...ele);
    });
    console.log('roles: ', roles);
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
        roles: roles,
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

      {avatar && (
        <div
          style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '12px 0', borderRadius: '50%' }}
        >
          <Image width={150} src={avatar} />
        </div>
      )}

      <Upload {...props}>
        <Button disabled={lengthFileList >= 1 ? true : false} icon={<UploadOutlined />}>
          Upload
        </Button>
      </Upload>

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

      {/* <FormAnswer /> */}
    </Modal>
  );
};
export default ModalUpdateUser;
