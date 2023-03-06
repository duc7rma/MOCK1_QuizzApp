import TextField from '@material-ui/core/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { Cascader, Modal } from 'antd';
import { Formik } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { showHideModalAddUser } from 'stores/modalSlice';
import { addUserThunk, fetchAllUsersAdminThunk } from 'stores/userAdminSlice';
import { optionsUserRole } from 'utils/user-utils';
import { addUserSchema } from 'utils/yup';
import './ModalAddUser.scss';

function ModalAddUser() {
  const dispatch = useDispatch();
  const [roles, setRoles] = useState([]);

  const isOpen = useSelector((state) => state.modal.isShowAddUser);

  const handleAddUser = async (values, onSubmitProps) => {
    let payload = { ...values, roles: roles };

    await dispatch(addUserThunk(payload));
    // onSubmitProps.setSubmitting(false);
    // onSubmitProps.resetForm();
    // setRoles(['user']);

    dispatch(showHideModalAddUser(false));
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
        onSubmit={handleAddUser}
      >
        {({ isValid, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form className="signUp_form" onSubmit={handleSubmit} loading={isSubmitting ? 1 : 0}>
            <TextField
              style={{ margin: '10px 0', width: '100%' }}
              id="name"
              label="Name"
              variant="outlined"
              name="name"
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <TextField
              style={{ margin: '10px 0', width: '100%' }}
              id="email"
              label="Email"
              type="email"
              variant="outlined"
              name="email"
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              onBlur={handleBlur}
              onChange={handleChange}
            />

            <TextField
              style={{ margin: '10px 0', width: '100%' }}
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <TextField
              style={{ margin: '10px 0', width: '100%' }}
              label="Confirm Password"
              variant="outlined"
              type="password"
              name="confirmPassword"
              error={touched.confirmPassword && Boolean(errors.confirmPassword)}
              helperText={touched.confirmPassword && errors.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <Cascader
              style={{
                marginTop: '10px',
                width: '100%',
              }}
              placeholder="Roles"
              options={optionsUserRole}
              onChange={handleChangeRoles}
              multiple
              maxTagCount="responsive"
              onBlur={handleBlur}
            />

            <div style={{ textAlign: 'right' }}>
              <LoadingButton
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                style={{ marginTop: '40px ', width: '100px' }}
                disabled={!isValid || !!!roles.length}
              >
                Add
              </LoadingButton>
            </div>
          </form>
        )}
      </Formik>
    </Modal>
  );
}

export default ModalAddUser;
