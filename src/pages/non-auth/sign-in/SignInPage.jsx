import { Button, Form, Input } from 'antd';

import { useNavigate } from 'react-router-dom';
import { RoutePaths } from 'routes/route-constants';
import { handleStorageToken } from 'utils/storage-utils';
import './SignInPage.scss';
import { signIn } from 'services/auth-service';

function SignInPage() {
  const navigate = useNavigate();

  const handleSignIn = async (values) => {
    const res = await signIn(values);
    res && handleStorageToken(res.data.tokens);
    navigate(RoutePaths.HOME);
  };

  return (
    <div className="signIn_container">
      <h2>Sign in</h2>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={handleSignIn}
        autoComplete="off"
      >
        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input type="email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item className="btn-submit" wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Sign In
          </Button>
        </Form.Item>
      </Form>

      <div className="signIn_bottom">
        <div className="signIn_forgot-password" onClick={() => navigate(RoutePaths.FORGOT_PASSWORD)}>
          Forgot password?
        </div>
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
