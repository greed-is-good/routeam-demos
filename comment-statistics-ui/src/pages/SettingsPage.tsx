import {
  DeleteOutlined,
  KeyOutlined,
  MailOutlined,
  PlusOutlined,
  SaveOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import {
  Alert,
  Button,
  Card,
  Col,
  DatePicker,
  Descriptions,
  Divider,
  Empty,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  Spin,
  TimePicker,
  Typography,
  message,
} from 'antd';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import type { Dayjs } from 'dayjs';
import type { FormProps } from 'antd';

import { activateLicense, fetchLicenseInfo, fetchSettings, updateSettings } from '../api/mockApi';
import { LicenseStatusTag } from '../components/LicenseStatusTag';
import type {
  AppSettings,
  LicenseInfo,
  ParserEndType,
  ParserFrequency,
  ParserSchedule,
} from '../types/models';

const DEFAULT_FIRST_START_OFFSET_MINUTES = 5;

const FREQUENCY_OPTIONS: Array<{ label: string; value: ParserFrequency }> = [
  { label: 'Один раз', value: 'once' },
  { label: 'Каждый день', value: 'daily' },
  { label: 'Каждую неделю', value: 'weekly' },
  { label: 'Каждый месяц', value: 'monthly' },
];

const FREQUENCY_LABELS: Record<ParserFrequency, string> = {
  once: 'Один раз',
  daily: 'Каждый день',
  weekly: 'Каждую неделю',
  monthly: 'Каждый месяц',
};

const EVERY_UNIT_LABELS: Record<ParserFrequency, string> = {
  once: 'раз',
  daily: 'день',
  weekly: 'неделю',
  monthly: 'месяц',
};

interface ActivateLicenseForm {
  licenseKey: string;
}

interface ParserScheduleFormValues {
  frequency: ParserFrequency;
  interval: number;
  endType: ParserEndType;
  endAfterOccurrences?: number;
  endDate?: Dayjs;
  timeOfDay: Dayjs;
}

interface SettingsFormValues {
  vkSources: string[];
  reportEmails: string[];
  parserSchedule: ParserScheduleFormValues;
}

function parseTimeToDayjs(value: string): Dayjs | null {
  const match = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(value);
  if (!match) {
    return null;
  }

  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  return dayjs().hour(hours).minute(minutes).second(0).millisecond(0);
}

function toFormValues(settings: AppSettings): SettingsFormValues {
  const startAt = dayjs(settings.parserSchedule.startAt);
  const fallbackTime = dayjs().add(DEFAULT_FIRST_START_OFFSET_MINUTES, 'minute').second(0).millisecond(0);
  const parsedTime = parseTimeToDayjs(settings.parserSchedule.timeOfDay);
  const timeOfDay =
    parsedTime ??
    (startAt.isValid()
      ? dayjs().hour(startAt.hour()).minute(startAt.minute()).second(0).millisecond(0)
      : fallbackTime);
  const endDate = settings.parserSchedule.endDate ? dayjs(settings.parserSchedule.endDate) : undefined;

  return {
    vkSources: settings.vkSources,
    reportEmails: settings.reportEmails,
    parserSchedule: {
      frequency: settings.parserSchedule.frequency,
      interval: Math.max(1, settings.parserSchedule.interval || 1),
      endType: settings.parserSchedule.endType,
      endAfterOccurrences: settings.parserSchedule.endAfterOccurrences,
      endDate: endDate?.isValid() ? endDate : undefined,
      timeOfDay,
    },
  };
}

function buildNextRunAt(params: {
  frequency: ParserFrequency;
  interval: number;
  timeOfDay?: Dayjs;
  now?: Dayjs;
}): Dayjs {
  const now = params.now ?? dayjs();

  if (params.frequency === 'once') {
    return now
      .add(DEFAULT_FIRST_START_OFFSET_MINUTES, 'minute')
      .second(0)
      .millisecond(0);
  }

  const interval = Math.max(1, Math.round(params.interval || 1));
  const triggerTime = params.timeOfDay ?? now;
  let nextRunAt = now
    .hour(triggerTime.hour())
    .minute(triggerTime.minute())
    .second(0)
    .millisecond(0);

  if (nextRunAt.isBefore(now)) {
    if (params.frequency === 'weekly') {
      nextRunAt = nextRunAt.add(interval, 'week');
    } else if (params.frequency === 'monthly') {
      nextRunAt = nextRunAt.add(interval, 'month');
    } else {
      nextRunAt = nextRunAt.add(interval, 'day');
    }
  }

  return nextRunAt;
}

function toApiSchedule(values: ParserScheduleFormValues): ParserSchedule {
  if (values.frequency === 'once') {
    const firstRunAt = buildNextRunAt({
      frequency: 'once',
      interval: 1,
    });

    return {
      startAt: firstRunAt.toISOString(),
      timezone: 'Europe/Moscow',
      frequency: 'once',
      interval: 1,
      timeOfDay: firstRunAt.format('HH:mm'),
      endType: 'never',
    };
  }

  const now = dayjs();
  const interval = Math.max(1, Math.round(values.interval || 1));
  const normalizedEndType: ParserEndType = values.endType ?? 'never';
  const triggerTime = values.timeOfDay || now;
  const firstRunAt = buildNextRunAt({
    frequency: values.frequency,
    interval,
    timeOfDay: triggerTime,
    now,
  });

  const schedule: ParserSchedule = {
    startAt: firstRunAt.toISOString(),
    timezone: 'Europe/Moscow',
    frequency: values.frequency,
    interval,
    timeOfDay: triggerTime.format('HH:mm'),
    endType: normalizedEndType,
  };

  if (normalizedEndType === 'after_count') {
    schedule.endAfterOccurrences = Math.max(1, Math.round(values.endAfterOccurrences || 1));
  }

  if (normalizedEndType === 'on_date' && values.endDate) {
    schedule.endDate = values.endDate.endOf('day').toISOString();
  }

  return schedule;
}

function toApiValues(values: SettingsFormValues): AppSettings {
  return {
    vkSources: Array.isArray(values.vkSources) ? values.vkSources : [],
    reportEmails: Array.isArray(values.reportEmails) ? values.reportEmails : [],
    parserSchedule: toApiSchedule(values.parserSchedule),
  };
}

function getEveryUnitLabel(frequency: ParserFrequency | undefined): string {
  if (frequency) {
    return EVERY_UNIT_LABELS[frequency];
  }

  return EVERY_UNIT_LABELS.daily;
}

export function SettingsPage(): JSX.Element {
  const [settingsForm] = Form.useForm<SettingsFormValues>();
  const [licenseForm] = Form.useForm<ActivateLicenseForm>();
  const [sourceModalForm] = Form.useForm<{ value: string }>();
  const [emailModalForm] = Form.useForm<{ value: string }>();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activating, setActivating] = useState(false);
  const [isSourceModalOpen, setIsSourceModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [licenseInfo, setLicenseInfo] = useState<LicenseInfo | null>(null);
  const frequency = Form.useWatch(['parserSchedule', 'frequency'], settingsForm) as
    | ParserFrequency
    | undefined;
  const endType = Form.useWatch(['parserSchedule', 'endType'], settingsForm) as
    | ParserEndType
    | undefined;
  const parserSchedule = Form.useWatch('parserSchedule', settingsForm) as
    | ParserScheduleFormValues
    | undefined;

  useEffect(() => {
    let isMounted = true;

    Promise.all([fetchSettings(), fetchLicenseInfo()])
      .then(([settings, license]) => {
        if (!isMounted) {
          return;
        }

        settingsForm.setFieldsValue(toFormValues(settings));
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

  useEffect(() => {
    if (frequency === 'once') {
      settingsForm.setFieldsValue({
        parserSchedule: {
          ...settingsForm.getFieldValue('parserSchedule'),
          interval: 1,
          endType: 'never',
          endAfterOccurrences: undefined,
          endDate: undefined,
        },
      });
    }
  }, [frequency, settingsForm]);

  const onceRunAtLabel = useMemo(
    () =>
      dayjs()
        .add(DEFAULT_FIRST_START_OFFSET_MINUTES, 'minute')
        .format('DD.MM.YYYY HH:mm'),
    [],
  );

  const schedulePreview = useMemo(() => {
    if (!parserSchedule?.frequency) {
      return 'Укажите параметры расписания, чтобы увидеть итоговый режим запуска.';
    }

    if (parserSchedule.frequency === 'once') {
      return `Запуск будет выполнен один раз через ${DEFAULT_FIRST_START_OFFSET_MINUTES} минут после сохранения.`;
    }

    const interval = Math.max(1, Math.round(parserSchedule.interval || 1));
    const runTime = parserSchedule.timeOfDay ? parserSchedule.timeOfDay.format('HH:mm') : '--:--';
    const frequencyLabel = FREQUENCY_LABELS[parserSchedule.frequency];
    const unitLabel = getEveryUnitLabel(parserSchedule.frequency);

    let endLabel = 'Окончание: никогда.';
    if (parserSchedule.endType === 'after_count') {
      endLabel = `Окончание: после ${Math.max(
        1,
        Math.round(parserSchedule.endAfterOccurrences || 1),
      )} повторений.`;
    } else if (parserSchedule.endType === 'on_date' && parserSchedule.endDate) {
      endLabel = `Окончание: ${parserSchedule.endDate.format('DD.MM.YYYY')}.`;
    }

    return `${frequencyLabel}, каждый ${interval} ${unitLabel}, время запуска ${runTime} (МСК). ${endLabel}`;
  }, [onceRunAtLabel, parserSchedule]);

  const nextRunLabel = useMemo(() => {
    if (!parserSchedule?.frequency) {
      return '—';
    }

    if (parserSchedule.frequency === 'once') {
      return `${onceRunAtLabel} (МСК)`;
    }

    const nextRunAt = buildNextRunAt({
      frequency: parserSchedule.frequency,
      interval: Math.max(1, Math.round(parserSchedule.interval || 1)),
      timeOfDay: parserSchedule.timeOfDay,
    });

    if (parserSchedule.endType === 'on_date' && parserSchedule.endDate) {
      const endBoundary = parserSchedule.endDate.endOf('day');
      if (nextRunAt.isAfter(endBoundary)) {
        return 'Не запланирован: дата окончания уже прошла';
      }
    }

    return `${nextRunAt.format('DD.MM.YYYY HH:mm')} (МСК)`;
  }, [onceRunAtLabel, parserSchedule]);

  const onSaveSettings: FormProps<SettingsFormValues>['onFinish'] = async (values) => {
    setSaving(true);
    try {
      const saved = await updateSettings(toApiValues(values));
      settingsForm.setFieldsValue(toFormValues(saved));
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
        <Col xs={24} xl={18}>
          <Card
            className="page-card"
            title={
              <Space>
                <SettingOutlined />
                <span>Настройки системы</span>
              </Space>
            }
          >
            <Form<SettingsFormValues>
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
                      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Источники пока не добавлены" />
                    ) : null}
                    {fields.map((field) => (
                      <div
                        key={field.key}
                        style={{ display: 'flex', width: '100%', gap: 8, alignItems: 'flex-start' }}
                      >
                        <Form.Item
                          {...field}
                          name={[field.name]}
                          style={{ marginBottom: 0, flex: 1, minWidth: 0 }}
                          rules={[{ required: true, message: 'Укажите URL или ID группы' }]}
                        >
                          <Input
                            placeholder="https://vk.com/city_official"
                            readOnly
                            style={{ width: '100%' }}
                          />
                        </Form.Item>
                        <Button
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => remove(field.name)}
                          aria-label="Удалить источник"
                        />
                      </div>
                    ))}
                    <Button
                      icon={<PlusOutlined />}
                      onClick={() => {
                        sourceModalForm.resetFields();
                        setIsSourceModalOpen(true);
                      }}
                      block
                    >
                      Добавить источник
                    </Button>
                    <Modal
                      title="Добавить источник VK"
                      open={isSourceModalOpen}
                      width={900}
                      destroyOnClose
                      okText="Добавить"
                      cancelText="Отмена"
                      onCancel={() => {
                        setIsSourceModalOpen(false);
                        sourceModalForm.resetFields();
                      }}
                      onOk={() => {
                        void sourceModalForm
                          .validateFields()
                          .then(({ value }) => {
                            add(value.trim());
                            setIsSourceModalOpen(false);
                            sourceModalForm.resetFields();
                          })
                          .catch(() => undefined);
                      }}
                    >
                      <Form form={sourceModalForm} layout="vertical" preserve={false}>
                        <Form.Item
                          label="URL группы или сообщества"
                          name="value"
                          rules={[
                            { required: true, message: 'Укажите URL или ID группы' },
                            { min: 4, message: 'Слишком короткое значение' },
                          ]}
                        >
                          <Input placeholder="https://vk.com/city_official" />
                        </Form.Item>
                      </Form>
                    </Modal>
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
                      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Список получателей пока пуст" />
                    ) : null}
                    {fields.map((field) => (
                      <div
                        key={field.key}
                        style={{ display: 'flex', width: '100%', gap: 8, alignItems: 'flex-start' }}
                      >
                        <Form.Item
                          {...field}
                          name={[field.name]}
                          style={{ marginBottom: 0, flex: 1, minWidth: 0 }}
                          rules={[
                            { required: true, message: 'Введите email' },
                            { type: 'email', message: 'Некорректный email' },
                          ]}
                        >
                          <Input
                            prefix={<MailOutlined />}
                            placeholder="report@cityfeedback.local"
                            readOnly
                            style={{ width: '100%' }}
                          />
                        </Form.Item>
                        <Button
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => remove(field.name)}
                          aria-label="Удалить email"
                        />
                      </div>
                    ))}
                    <Button
                      icon={<PlusOutlined />}
                      onClick={() => {
                        emailModalForm.resetFields();
                        setIsEmailModalOpen(true);
                      }}
                      block
                    >
                      Добавить email
                    </Button>
                    <Modal
                      title="Добавить email получателя"
                      open={isEmailModalOpen}
                      width={820}
                      destroyOnClose
                      okText="Добавить"
                      cancelText="Отмена"
                      onCancel={() => {
                        setIsEmailModalOpen(false);
                        emailModalForm.resetFields();
                      }}
                      onOk={() => {
                        void emailModalForm
                          .validateFields()
                          .then(({ value }) => {
                            add(value.trim());
                            setIsEmailModalOpen(false);
                            emailModalForm.resetFields();
                          })
                          .catch(() => undefined);
                      }}
                    >
                      <Form form={emailModalForm} layout="vertical" preserve={false}>
                        <Form.Item
                          label="Email получателя"
                          name="value"
                          rules={[
                            { required: true, message: 'Введите email' },
                            { type: 'email', message: 'Некорректный email' },
                          ]}
                        >
                          <Input prefix={<MailOutlined />} placeholder="report@cityfeedback.local" />
                        </Form.Item>
                      </Form>
                    </Modal>
                  </Space>
                )}
              </Form.List>

              <Divider />

              <Typography.Title level={5}>Запуск парсера</Typography.Title>
              <Typography.Paragraph type="secondary" style={{ marginTop: -8 }}>
                Настройте повторяемость, окончание и время запуска по МСК.
              </Typography.Paragraph>

              <Form.Item
                label="Повторяемость"
                name={['parserSchedule', 'frequency']}
                rules={[{ required: true, message: 'Выберите повторяемость' }]}
              >
                <Select options={FREQUENCY_OPTIONS} />
              </Form.Item>

              <Form.Item
                label="Каждый"
                name={['parserSchedule', 'interval']}
                rules={[
                  { required: frequency !== 'once', message: 'Укажите интервал' },
                  { type: 'number', min: 1, message: 'Минимум 1' },
                ]}
              >
                <InputNumber
                  min={1}
                  step={1}
                  disabled={frequency === 'once'}
                  addonAfter={getEveryUnitLabel(frequency)}
                  style={{ width: '100%' }}
                />
              </Form.Item>

              <Form.Item
                label="Окончание"
                name={['parserSchedule', 'endType']}
                rules={[{ required: true, message: 'Укажите условие окончания' }]}
              >
                <Radio.Group disabled={frequency === 'once'}>
                  <Space direction="vertical" size={10}>
                    <Radio value="never">Никогда</Radio>
                    <Space align="center" wrap>
                      <Radio value="after_count">После</Radio>
                      <Form.Item
                        name={['parserSchedule', 'endAfterOccurrences']}
                        style={{ marginBottom: 0 }}
                        rules={
                          frequency !== 'once' && endType === 'after_count'
                            ? [
                                { required: true, message: 'Укажите количество повторений' },
                                { type: 'number', min: 1, message: 'Минимум 1' },
                              ]
                            : []
                        }
                      >
                        <InputNumber
                          min={1}
                          step={1}
                          disabled={frequency === 'once' || endType !== 'after_count'}
                        />
                      </Form.Item>
                      <Typography.Text type="secondary">повторений</Typography.Text>
                    </Space>
                    <Space align="center" wrap>
                      <Radio value="on_date">Дата</Radio>
                      <Form.Item
                        name={['parserSchedule', 'endDate']}
                        style={{ marginBottom: 0 }}
                        rules={
                          frequency !== 'once' && endType === 'on_date'
                            ? [
                                { required: true, message: 'Укажите дату окончания' },
                                {
                                  validator(_, value: Dayjs | undefined) {
                                    if (
                                      !value ||
                                      value.endOf('day').valueOf() >= dayjs().startOf('day').valueOf()
                                    ) {
                                      return Promise.resolve();
                                    }
                                    return Promise.reject(
                                      new Error('Дата окончания не может быть в прошлом'),
                                    );
                                  },
                                },
                              ]
                            : []
                        }
                      >
                        <DatePicker
                          format="DD/MM/YYYY"
                          disabled={frequency === 'once' || endType !== 'on_date'}
                        />
                      </Form.Item>
                    </Space>
                  </Space>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                label="Время запуска по МСК"
                name={['parserSchedule', 'timeOfDay']}
                rules={[{ required: frequency !== 'once', message: 'Выберите время запуска' }]}
              >
                <TimePicker
                  format="HH:mm"
                  minuteStep={5}
                  disabled={frequency === 'once'}
                  style={{ width: '100%' }}
                />
              </Form.Item>

              <Alert
                type="info"
                showIcon
                message="Предпросмотр расписания"
                description={
                  <Space direction="vertical" size={2}>
                    <Typography.Text>{schedulePreview}</Typography.Text>
                    <Typography.Text strong>{`Следующий запуск: ${nextRunLabel}`}</Typography.Text>
                  </Space>
                }
                style={{ marginBottom: 16 }}
              />

              <Button type="primary" icon={<SaveOutlined />} htmlType="submit" loading={saving}>
                Сохранить изменения
              </Button>
            </Form>
          </Card>
        </Col>
        <Col xs={24} xl={6}>
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
                <Descriptions.Item label="Ключ">{licenseInfo.maskedKey ?? 'Не задан'}</Descriptions.Item>
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
