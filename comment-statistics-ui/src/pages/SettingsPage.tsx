import {
  DeleteOutlined,
  KeyOutlined,
  MailOutlined,
  PlusOutlined,
  SaveOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Empty,
  Form,
  Input,
  InputNumber,
  Row,
  Space,
  Spin,
  Typography,
  message,
} from 'antd';
import { useEffect, useState } from 'react';
import type { FormProps } from 'antd';

import { activateLicense, fetchLicenseInfo, fetchSettings, updateSettings } from '../api/mockApi';
import { LicenseStatusTag } from '../components/LicenseStatusTag';
import type { AppSettings, LicenseInfo } from '../types/models';

interface ActivateLicenseForm {
  licenseKey: string;
}

export function SettingsPage(): JSX.Element {
  const [settingsForm] = Form.useForm<AppSettings>();
  const [licenseForm] = Form.useForm<ActivateLicenseForm>();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activating, setActivating] = useState(false);
  const [licenseInfo, setLicenseInfo] = useState<LicenseInfo | null>(null);

  useEffect(() => {
    let isMounted = true;

    Promise.all([fetchSettings(), fetchLicenseInfo()])
      .then(([settings, license]) => {
        if (!isMounted) {
          return;
        }

        settingsForm.setFieldsValue(settings);
        setLicenseInfo(license);
      })
      .catch((error) => {
        const fallback = 'Не удалось загрузить настройки. Обновите страницу и попробуйте снова.';
        const errorMessage = error instanceof Error ? error.message : fallback;
        messageApi.error(errorMessage);
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [messageApi, settingsForm]);

  const onSaveSettings: FormProps<AppSettings>['onFinish'] = async (values) => {
    setSaving(true);
    try {
      const saved = await updateSettings(values);
      settingsForm.setFieldsValue(saved);
      messageApi.success('Настройки сохранены');
    } catch (error) {
      const fallback = 'Не удалось сохранить настройки. Проверьте данные формы.';
      const errorMessage = error instanceof Error ? error.message : fallback;
      messageApi.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const onActivateLicense: FormProps<ActivateLicenseForm>['onFinish'] = async ({ licenseKey }) => {
    setActivating(true);
    try {
      const updated = await activateLicense(licenseKey);
      setLicenseInfo(updated);
      licenseForm.resetFields();
      messageApi.success('Лицензия успешно обновлена');
    } catch (error) {
      const fallback = 'Не удалось активировать лицензию. Проверьте ключ и повторите попытку.';
      const errorMessage = error instanceof Error ? error.message : fallback;
      messageApi.error(errorMessage);
    } finally {
      setActivating(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-block">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      {contextHolder}
      <Row gutter={[16, 16]}>
        <Col xs={24} xl={16}>
          <Card
            className="page-card"
            title={
              <Space>
                <SettingOutlined />
                <span>Настройки системы</span>
              </Space>
            }
          >
            <Form<AppSettings>
              form={settingsForm}
              layout="vertical"
              onFinish={onSaveSettings}
              autoComplete="off"
            >
              <Typography.Title level={5}>Источники ВКонтакте</Typography.Title>
              <Typography.Paragraph type="secondary" style={{ marginTop: -8 }}>
                Укажите группы или сообщества, из которых система должна собирать комментарии.
              </Typography.Paragraph>
              <Form.List name="vkSources">
                {(fields, { add, remove }) => (
                  <Space direction="vertical" size={12} style={{ display: 'flex' }}>
                    {fields.length === 0 ? (
                      <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="Источники пока не добавлены"
                      />
                    ) : null}
                    {fields.map((field) => (
                      <Space key={field.key} style={{ width: '100%' }} align="start">
                        <Form.Item
                          {...field}
                          name={[field.name]}
                          style={{ marginBottom: 0, flex: 1 }}
                          rules={[{ required: true, message: 'Укажите URL или ID группы' }]}
                        >
                          <Input placeholder="https://vk.com/city_official" />
                        </Form.Item>
                        <Button
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => remove(field.name)}
                          aria-label="Удалить источник"
                        />
                      </Space>
                    ))}
                    <Button icon={<PlusOutlined />} onClick={() => add()} block>
                      Добавить источник
                    </Button>
                  </Space>
                )}
              </Form.List>

              <Divider />

              <Typography.Title level={5}>Email для отчетов</Typography.Title>
              <Typography.Paragraph type="secondary" style={{ marginTop: -8 }}>
                На эти адреса отправляется отчет за выбранный период.
              </Typography.Paragraph>
              <Form.List name="reportEmails">
                {(fields, { add, remove }) => (
                  <Space direction="vertical" size={12} style={{ display: 'flex' }}>
                    {fields.length === 0 ? (
                      <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="Список получателей пока пуст"
                      />
                    ) : null}
                    {fields.map((field) => (
                      <Space key={field.key} style={{ width: '100%' }} align="start">
                        <Form.Item
                          {...field}
                          name={[field.name]}
                          style={{ marginBottom: 0, flex: 1 }}
                          rules={[
                            { required: true, message: 'Введите email' },
                            { type: 'email', message: 'Некорректный email' },
                          ]}
                        >
                          <Input prefix={<MailOutlined />} placeholder="report@cityfeedback.local" />
                        </Form.Item>
                        <Button
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => remove(field.name)}
                          aria-label="Удалить email"
                        />
                      </Space>
                    ))}
                    <Button icon={<PlusOutlined />} onClick={() => add()} block>
                      Добавить email
                    </Button>
                  </Space>
                )}
              </Form.List>

              <Divider />

              <Typography.Title level={5}>Запуск парсера</Typography.Title>
              <Typography.Paragraph type="secondary" style={{ marginTop: -8 }}>
                Определяет, как часто выполняется сбор новых комментариев.
              </Typography.Paragraph>
              <Form.Item
                label="Период запуска (минуты)"
                name="parserIntervalMinutes"
                rules={[{ required: true, message: 'Укажите период' }]}
              >
                <InputNumber min={1} max={1440} step={1} addonAfter="мин" style={{ width: '100%' }} />
              </Form.Item>

              <Button type="primary" icon={<SaveOutlined />} htmlType="submit" loading={saving}>
                Сохранить изменения
              </Button>
            </Form>
          </Card>
        </Col>
        <Col xs={24} xl={8}>
          <Card
            className="page-card"
            title={
              <Space>
                <KeyOutlined />
                <span>Лицензия</span>
              </Space>
            }
          >
            {licenseInfo ? (
              <Descriptions column={1} size="small">
                <Descriptions.Item label="Статус">
                  <LicenseStatusTag status={licenseInfo.status} />
                </Descriptions.Item>
                <Descriptions.Item label="Ключ">
                  {licenseInfo.maskedKey ?? 'Не задан'}
                </Descriptions.Item>
                <Descriptions.Item label="Срок действия">
                  {licenseInfo.expiresAt
                    ? new Date(licenseInfo.expiresAt).toLocaleString('ru-RU')
                    : 'Не задан'}
                </Descriptions.Item>
                <Descriptions.Item label="Лимит / месяц">
                  {licenseInfo.monthlyUsage} / {licenseInfo.monthlyLimit}
                </Descriptions.Item>
                <Descriptions.Item label="Последняя проверка">
                  {new Date(licenseInfo.checkedAt).toLocaleString('ru-RU')}
                </Descriptions.Item>
              </Descriptions>
            ) : null}

            <Divider />

            <Form<ActivateLicenseForm> form={licenseForm} layout="vertical" onFinish={onActivateLicense}>
              <Form.Item
                label="Лицензионный ключ"
                name="licenseKey"
                rules={[{ required: true, message: 'Введите лицензионный ключ' }]}
              >
                <Input placeholder="CITY-XXXX-XXXX-XXXX" />
              </Form.Item>
              <Button type="primary" htmlType="submit" loading={activating} block>
                Активировать лицензию
              </Button>
            </Form>
            <Typography.Paragraph className="hint">
              Для демо можно использовать ключи со словами: <code>EXPIRED</code>, <code>SUSPEND</code>,{' '}
              <code>LIMIT</code>, <code>OFFLINE</code>.
            </Typography.Paragraph>
          </Card>
        </Col>
      </Row>
    </>
  );
}
