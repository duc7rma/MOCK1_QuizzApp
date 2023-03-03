import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { Modal, Cascader } from 'antd';
import { Formik } from 'formik';
import TextField from '@material-ui/core/TextField';
import LoadingButton from '@mui/lab/LoadingButton';

import { showHideModalAddUser } from 'stores/modalSlice';
import { addUserThunk, fetchAllUsersAdminThunk } from 'stores/userAdminSlice';
import { optionsUserRole } from 'utils/user-utils';
import { addUserSchema } from 'utils/yup/add-user';
import './ModalAddUser.scss';

function ModalAddUser() {
  const dispatch = useDispatch();
  const [roles, setRoles] = useState([]);

  const isOpen = useSelector((state) => state.modal.isShowAddUser);

  const handleSubmit = async (values) => {
    let payload = { ...values, roles: roles };

    dispatch(showHideModalAddUser(false));
    await dispatch(addUserThunk(payload));
    dispatch(fetchAllUsersAdminThunk({}));
  };

  const handleCancel = () => {
    dispatch(showHideModalAddUser(false));
  };

  const handleChangeRoles = (arrRoles) => {
    let roles = [];
    arrRoles.forEach((ele) => {
      roles.push(...ele);
    });
    setRoles(roles);
  };

  return (
    <Modal className="modal-add-user" title="Add New User" onCancel={handleCancel} open={isOpen}>
      <Formik
        initialValues={{ name: '', email: '', password: '', confirmPassword: '', roles: [] }}
        validationSchema={addUserSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form className="signUp_form" onSubmit={handleSubmit}>
            <TextField
              style={{ margin: '10px 0', width: '100%' }}
              id="name"
              label="Name"
              variant="outlined"
              name="name"
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              style={{ margin: '10px 0', width: '100%' }}
              id="email"
              label="Email"
              type="email"
              variant="outlined"
              name="email"
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              style={{ margin: '10px 0', width: '100%' }}
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              style={{ margin: '10px 0', width: '100%' }}
              label="Password"
              variant="outlined"
              type="password"
              name="confirmPassword"
              error={touched.confirmPassword && Boolean(errors.confirmPassword)}
              helperText={touched.confirmPassword && errors.confirmPassword}
              onChange={handleChange}
            />

            <Cascader
              // name="roles"
              style={{
                marginTop: '10px',
                width: '100%',
              }}
              placeholder="Roles"
              options={optionsUserRole}
              onChange={handleChangeRoles}
              multiple
              maxTagCount="responsive"
              defaultValue={['user']}
            />

            <div style={{ textAlign: 'right' }}>
              <LoadingButton
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                style={{ marginTop: '40px ', width: '100px' }}
                loading={isSubmitting}
                disabled={!isValid}
              >
                Sign Up
              </LoadingButton>
            </div>
          </form>
        )}
      </Formik>
    </Modal>
  );
}

export default ModalAddUser;
