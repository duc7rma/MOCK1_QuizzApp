import { Formik } from 'formik';
import TextField from '@mui/material/TextField';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { RoutePaths } from 'routes/route-constants';
import { changePasswordSchema } from 'utils/yup';
import './ChangePassword.scss';
import { useDispatch, useSelector } from 'react-redux';
import { changePasswordThunk } from 'stores/userSlice';
import { TAB_HEADER } from './../../constants/tabs';

function ChangePassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tab = useSelector((state) => state.tab);

  const handleOnSubmit = async (values) => {
    await dispatch(changePasswordThunk(values));

    navigate(RoutePaths.HOME);
  };

  const handleBack = () => {
    tab === TAB_HEADER.GO_TO_PLAY && navigate(RoutePaths.GO_TO_PLAY);
    navigate(RoutePaths.DASHBOARD);
  };

  const location = useLocation();
  console.log(location.pathname);

  return (
    <div className="change-password">
      <LoadingButton
        color="primary"
        variant="contained"
        fullWidth
        style={{ margin: '0', width: '30px', display: 'flex' }}
        onClick={handleBack}
      >
        <ArrowBackIcon />
      </LoadingButton>
      <h2 className="change-password_title">Change Password</h2>
      <Formik
        initialValues={{ oldPassword: '', newPassword: '', confirmNewPassword: '' }}
        validationSchema={changePasswordSchema}
        onSubmit={handleOnSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form className="signUp_form" onSubmit={handleSubmit}>
            <TextField
              style={{ margin: '10px', width: 'calc(100% - 20px)' }}
              label="Old password"
              variant="outlined"
              type="password"
              name="oldPassword"
              error={touched.oldPassword && Boolean(errors.oldPassword)}
              helperText={touched.oldPassword && errors.oldPassword}
              onChange={handleChange}
            />

            <TextField
              style={{ margin: '10px', width: 'calc(100% - 20px)' }}
              label="New password"
              variant="outlined"
              type="password"
              name="newPassword"
              error={touched.newPassword && Boolean(errors.newPassword)}
              helperText={touched.newPassword && errors.newPassword}
              onChange={handleChange}
            />

            <TextField
              style={{ margin: '10px', width: 'calc(100% - 20px)' }}
              label="Confirm new password"
              variant="outlined"
              type="password"
              name="confirmNewPassword"
              error={touched.confirmNewPassword && Boolean(errors.confirmNewPassword)}
              helperText={touched.confirmNewPassword && errors.confirmNewPassword}
              onChange={handleChange}
            />

            <LoadingButton
              color="success"
              variant="contained"
              fullWidth
              type="submit"
              style={{ marginTop: '10px', marginBottom: '10px', width: '100px' }}
              loading={isSubmitting}
            >
              Update
            </LoadingButton>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default ChangePassword;
