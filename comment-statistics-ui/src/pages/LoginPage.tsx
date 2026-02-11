import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Typography, message } from 'antd';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import type { FormProps } from 'antd';

import { APP_BRANDING, APP_VERSION_LABEL } from '../constants/appMeta';
import { useAuth } from '../context/AuthContext';
import type { LoginRequest } from '../types/models';

interface LocationState {
  from?: string;
}

export function LoginPage(): JSX.Element {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  const state = (location.state as LocationState | null) ?? {};
  const redirectTo = state.from ?? '/statistics';

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  const onFinish: FormProps<LoginRequest>['onFinish'] = async (values) => {
    try {
      await login(values);
      messageApi.success('Вход выполнен успешно');
      navigate(redirectTo, { replace: true });
    } catch (error) {
      const fallback = 'Не удалось войти. Проверьте логин и пароль.';
      const errorMessage = error instanceof Error ? error.message : fallback;
      messageApi.error(errorMessage);
    }
  };

  return (
    <div className="login-page">
      {contextHolder}
      <Card className="login-card" bordered={false}>
        <Typography.Title level={3} style={{ marginBottom: 8 }}>
          CityFeedback
        </Typography.Title>
        <Typography.Paragraph type="secondary" style={{ marginTop: 0 }}>
          Административная панель мониторинга и классификации комментариев
        </Typography.Paragraph>
        <Form<LoginRequest> layout="vertical" onFinish={onFinish} autoComplete="off">
          <Form.Item
            label="Логин"
            name="username"
            rules={[{ required: true, message: 'Введите логин' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="admin" />
          </Form.Item>
          <Form.Item
            label="Пароль"
            name="password"
            rules={[{ required: true, message: 'Введите пароль' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="••••••••" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Войти
          </Button>
        </Form>
        <Typography.Paragraph className="hint">
          Демонстрационный доступ: <code>admin / admin123</code>
        </Typography.Paragraph>
        <Typography.Text className="brand-signoff">
          {APP_VERSION_LABEL} • {APP_BRANDING}
        </Typography.Text>
      </Card>
    </div>
  );
}
