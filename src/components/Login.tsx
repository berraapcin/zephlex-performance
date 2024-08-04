import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    const { email, password } = values; 


    const isValidEmail = /\S+@\S+\.\S+/.test(email);

    if (!isValidEmail) {
      console.error('Geçersiz e-posta adresi');
      return;
    }

    try {
      
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Oturum açma başarılı');
      navigate('/');
    } catch (error) {
      console.error('Oturum açma hatası:', error);
    }
  };

  return (
    <div className="login-container">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email" 
          rules={[{ required: true, message: 'Please input your Email!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="#">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="/register">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
