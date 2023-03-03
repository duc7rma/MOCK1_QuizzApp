import TextField from '@mui/material/TextField';
import { unwrapResult } from '@reduxjs/toolkit';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';

import { RoutePaths } from 'routes/route-constants';
import { signInThunk } from 'stores/userSlice';
import { handleStorageToken } from 'utils/storage-utils';
import './SignInPage.scss';
import { signInSchema } from 'utils/yup/sign-in';

function SignInPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const loading = useSelector((state) => state.user.loading);

  const handleSignIn = async (values) => {
    const res = await dispatch(signInThunk(values));
    const rs = unwrapResult(res);

    if (rs.user) {
      handleStorageToken(rs.tokens);
      navigate(RoutePaths.HOME);
    }
  };

  return (
    <div className="signIn">
      <h2>Sign in</h2>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={signInSchema}
        onSubmit={handleSignIn}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form className="signIn_form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              style={{ margin: '10px', width: '100%' }}
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
              style={{ margin: '10px', width: '100%' }}
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              onChange={handleChange}
            />

            <div className="signIn_form_forgot-password" onClick={() => navigate(RoutePaths.FORGOT_PASSWORD)}>
              Forgot password?
            </div>

            <LoadingButton
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              style={{ marginTop: '10px', marginBottom: '10px', width: '100px' }}
              loading={isSubmitting}
            >
              Sign Up
            </LoadingButton>
          </form>
        )}
      </Formik>

      <div className="signIn_bottom">
        <div>
          <span className="signIn_not-account">Do not have an account?</span> &nbsp;
          <span className="signIn_register-now" onClick={() => navigate(RoutePaths.SIGN_UP)}>
            Register now
          </span>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
