import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { RoutePaths } from 'routes/route-constants';
import './ForgotPasswordPage.scss';
import { regexEmail } from 'utils/regex';
import { forgotPassword } from 'services/auth-service';

const validationSchema = yup.object({
  email: yup.string('Enter your phone').matches(regexEmail, 'Invalid Email').required('Email is required'),
});

function ForgotPasswordPage() {
  const navigate = useNavigate();

  const handleOnSubmit = async (values) => {
    await forgotPassword(values);
  };

  return (
    <div className="forgot-password">
      <h1 className="forgot-password_title">ForgotPassword</h1>

      <div className="forgot-password_body">
        <Formik initialValues={{ email: '' }} onSubmit={handleOnSubmit} validationSchema={validationSchema}>
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <form className="signUp_form" onSubmit={handleSubmit}>
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
              <LoadingButton
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                style={{ marginTop: '10px', marginBottom: '10px', width: '100px' }}
                //   loading={loading}
              >
                Submit
              </LoadingButton>
            </form>
          )}
        </Formik>
      </div>

      <div className="forgot-password_bottom">
        <span className="already-account">Do you already have an account?</span> &nbsp;
        <span className="signin" onClick={() => navigate(RoutePaths.SIGN_IN)}>
          Sign in
        </span>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
