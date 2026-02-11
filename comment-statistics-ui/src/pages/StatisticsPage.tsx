import {
  DownloadOutlined,
  MailOutlined,
  ReloadOutlined,
  RiseOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Empty,
  Row,
  Space,
  Statistic,
  Table,
  Typography,
  message,
} from 'antd';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import type { Dayjs } from 'dayjs';
import type { ColumnsType } from 'antd/es/table';
import { utils, writeFileXLSX } from 'xlsx';

import { fetchReportComments, fetchStatistics, sendReportByEmail } from '../api/mockApi';
import type { CategoryStat, ReportCommentRow, StatisticsResponse } from '../types/models';

const { RangePicker } = DatePicker;
const DATE_FORMAT = 'DD/MM/YYYY';

interface TableRow extends CategoryStat {
  key: string;
}

function asIsoDate(value: Dayjs): string {
  return value.startOf('day').toISOString();
}

function buildWorksheetRows(rows: ReportCommentRow[]): Array<Array<string | number>> {
  const worksheetRows: Array<Array<string | number>> = [
    [
      'Текст комментария',
      'Категория комментария',
      'Дата и время публикации',
      'Количество лайков',
      'Имя автора комментария',
      'Ссылка на VK-профиль автора',
      'Ссылка на пост',
      'Ссылка на комментарий',
    ],
  ];

  rows.forEach((row) => {
    worksheetRows.push([
      row.commentText,
      row.category,
      dayjs(row.publishedAt).format('DD/MM/YYYY HH:mm'),
      row.likesCount,
      row.authorName,
      row.authorProfileUrl,
      row.postUrl,
      row.commentUrl,
    ]);
  });

  return worksheetRows;
}

export function StatisticsPage(): JSX.Element {
  const [messageApi, contextHolder] = message.useMessage();
  const initialRange: [Dayjs, Dayjs] = [dayjs().subtract(7, 'day'), dayjs()];
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>(initialRange);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [mailing, setMailing] = useState(false);
  const [statistics, setStatistics] = useState<StatisticsResponse | null>(null);

  const rows = useMemo<TableRow[]>(
    () =>
      statistics
        ? statistics.categories.map((item) => ({
            ...item,
            key: item.category,
          }))
        : [],
    [statistics],
  );

  const columns = useMemo<ColumnsType<TableRow>>(
    () => [
      {
        title: 'Категория',
        dataIndex: 'category',
      },
      {
        title: 'Комментарии',
        dataIndex: 'count',
        align: 'right',
      },
      {
        title: 'Доля',
        key: 'share',
        align: 'right',
        render: (_, row) => {
          if (!statistics || !statistics.total) {
            return '0%';
          }
          const share = ((row.count / statistics.total) * 100).toFixed(1);
          return `${share}%`;
        },
      },
    ],
    [statistics],
  );

  const generateReport = async (): Promise<void> => {
    setLoading(true);
    try {
      const result = await fetchStatistics({
        from: asIsoDate(dateRange[0]),
        to: asIsoDate(dateRange[1]),
      });
      setStatistics(result);
      messageApi.success('Отчет успешно сформирован');
    } catch (error) {
      setStatistics(null);
      const fallback = 'Не удалось сформировать отчет. Проверьте настройки и попробуйте снова.';
      const errorMessage = error instanceof Error ? error.message : fallback;
      messageApi.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = async (): Promise<void> => {
    if (!statistics) {
      return;
    }

    setDownloading(true);
    try {
      const reportRows = await fetchReportComments({
        from: statistics.from,
        to: statistics.to,
      });

      const worksheetRows = buildWorksheetRows(reportRows);
      const worksheet = utils.aoa_to_sheet(worksheetRows);
      worksheet['!cols'] = [
        { wch: 58 },
        { wch: 28 },
        { wch: 24 },
        { wch: 18 },
        { wch: 30 },
        { wch: 38 },
        { wch: 38 },
        { wch: 38 },
      ];

      const workbook = utils.book_new();
      utils.book_append_sheet(workbook, worksheet, 'Комментарии');

      const fileName = `cityfeedback-comments-${dayjs(statistics.generatedAt).format('YYYYMMDD-HHmm')}.xlsx`;
      writeFileXLSX(workbook, fileName);

      messageApi.success('Отчет в формате .xlsx подготовлен');
    } catch (error) {
      const fallback = 'Не удалось подготовить XLSX-отчет';
      const errorMessage = error instanceof Error ? error.message : fallback;
      messageApi.error(errorMessage);
    } finally {
      setDownloading(false);
    }
  };

  const sendByEmail = async (): Promise<void> => {
    if (!statistics) {
      return;
    }

    setMailing(true);
    try {
      const result = await sendReportByEmail({
        from: statistics.from,
        to: statistics.to,
      });
      messageApi.success(`Отчет отправлен на адреса: ${result.recipients.join(', ')}`);
    } catch (error) {
      const fallback = 'Не удалось отправить отчет. Проверьте список получателей в настройках.';
      const errorMessage = error instanceof Error ? error.message : fallback;
      messageApi.error(errorMessage);
    } finally {
      setMailing(false);
    }
  };

  return (
    <>
      {contextHolder}
      <Card className="page-card">
        <Row gutter={[12, 12]} align="middle" className="report-controls-row">
          <Col xs={24} xl={10}>
            <Space direction="vertical" size={4} style={{ display: 'flex' }}>
              <Typography.Text strong>Период отчета</Typography.Text>
              <RangePicker
                style={{ width: '100%' }}
                format={DATE_FORMAT}
                defaultValue={initialRange}
                onChange={(value) => {
                  if (value?.[0] && value?.[1]) {
                    const nextRange: [Dayjs, Dayjs] =
                      value[0].isAfter(value[1]) ? [value[1], value[0]] : [value[0], value[1]];
                    setDateRange(nextRange);
                  }
                }}
                allowClear={false}
              />
            </Space>
          </Col>
          <Col xs={24} xl={14}>
            <Space className="report-actions" size={[8, 8]} wrap>
              <Button
                className="report-action-btn"
                icon={<ReloadOutlined />}
                onClick={generateReport}
                loading={loading}
                type="primary"
              >
                Сформировать
              </Button>
              <Button
                className="report-action-btn"
                icon={<DownloadOutlined />}
                disabled={!statistics}
                loading={downloading}
                onClick={downloadReport}
              >
                Скачать отчет
              </Button>
              <Button
                className="report-action-btn"
                icon={<MailOutlined />}
                disabled={!statistics}
                loading={mailing}
                onClick={sendByEmail}
              >
                Отправить на почту
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12} xl={8}>
          <Card className="page-card stat-card">
            <Statistic
              title="Всего комментариев за период"
              value={statistics?.total ?? 0}
              prefix={<RiseOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} md={12} xl={8}>
          <Card className="page-card stat-card">
            <Statistic
              title="Выбранный период"
              value={
                statistics
                  ? `${dayjs(statistics.from).format(DATE_FORMAT)} - ${dayjs(statistics.to).format(DATE_FORMAT)}`
                  : 'Отчет еще не сформирован'
              }
            />
          </Card>
        </Col>
        <Col xs={24} md={24} xl={8}>
          <Card className="page-card stat-card">
            <Statistic
              title="Время формирования отчета"
              value={statistics ? dayjs(statistics.generatedAt).format('DD.MM.YYYY HH:mm') : 'Нет данных'}
            />
          </Card>
        </Col>
      </Row>

      <Card className="page-card">
        <Typography.Title level={5}>Распределение по категориям</Typography.Title>
        {statistics ? (
          <Table<TableRow>
            rowKey="key"
            dataSource={rows}
            columns={columns}
            pagination={false}
            size="middle"
          />
        ) : (
          <Empty
            description="Выберите период и нажмите «Сформировать», чтобы получить статистику по категориям"
          />
        )}
      </Card>
    </>
  );
}
