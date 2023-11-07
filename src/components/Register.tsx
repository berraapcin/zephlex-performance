import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

const Register: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    navigate('/login');
  };

  return (
    <div className="register-container">
      <Form
        name="normal_register"
        className="register-form"
        onFinish={onFinish}
      >
        <Form.Item
         label="Kullanıcı Adı"
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
          labelCol={{ span: 10}} 
  wrapperCol={{ span: 15 }} 
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          label="E-mail"
          name="mail"
          rules={[{ required: true, message: 'Please input your Mail adress!' }]}
          labelCol={{ span: 10 }} 
  wrapperCol={{ span: 18 }} 
        >
          <Input placeholder="Mail adress" />
        </Form.Item>
        <Form.Item
          label="Şifre"
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
          labelCol={{ span: 10}}
  wrapperCol={{ span: 16 }} 
        >
          <Input
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
        <Button
    type="primary"
    htmlType="submit"
    className="register-form-button"
    style={{ width: '100%' }} 
  >
            Kayıt ol
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
