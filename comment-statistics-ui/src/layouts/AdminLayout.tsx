import {
  BarChartOutlined,
  LogoutOutlined,
  SettingOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, Space, Typography } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { MenuProps } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { fetchLicenseInfo, LICENSE_UPDATED_EVENT } from '../api/mockApi';
import { LicenseStatusTag } from '../components/LicenseStatusTag';
import { APP_BRANDING, APP_VERSION_LABEL } from '../constants/appMeta';
import { useAuth } from '../context/AuthContext';
import type { LicenseInfo } from '../types/models';

const { Header, Sider, Content } = Layout;

export function AdminLayout(): JSX.Element {
  const location = useLocation();
  const { session, logout } = useAuth();
  const [licenseInfo, setLicenseInfo] = useState<LicenseInfo | null>(null);

  const loadLicenseInfo = useCallback(async (): Promise<void> => {
    try {
      const data = await fetchLicenseInfo();
      setLicenseInfo(data);
    } catch {
      setLicenseInfo(null);
    }
  }, []);

  useEffect(() => {
    void loadLicenseInfo();
  }, [loadLicenseInfo, location.pathname]);

  useEffect(() => {
    const onLicenseUpdated = (event: Event): void => {
      const customEvent = event as CustomEvent<LicenseInfo>;
      if (customEvent.detail) {
        setLicenseInfo(customEvent.detail);
        return;
      }

      void loadLicenseInfo();
    };

    window.addEventListener(LICENSE_UPDATED_EVENT, onLicenseUpdated);
    return () => {
      window.removeEventListener(LICENSE_UPDATED_EVENT, onLicenseUpdated);
    };
  }, [loadLicenseInfo]);

  const menuItems = useMemo<MenuProps['items']>(
    () => [
      {
        key: '/statistics',
        icon: <BarChartOutlined />,
        label: <Link to="/statistics">Статистика</Link>,
      },
      {
        key: '/settings',
        icon: <SettingOutlined />,
        label: <Link to="/settings">Настройки</Link>,
      },
    ],
    [],
  );

  const selectedMenuKey = location.pathname.startsWith('/settings')
    ? '/settings'
    : '/statistics';

  return (
    <Layout className="app-shell">
      <Sider
        className="app-shell__sider"
        width={260}
        breakpoint="lg"
        collapsedWidth="0"
        theme="light"
      >
        <div className="app-shell__brand">
          <ThunderboltOutlined />
          <span>CityFeedback</span>
        </div>
        <Menu mode="inline" selectedKeys={[selectedMenuKey]} items={menuItems} />
        <div className="app-shell__side-meta">
          <div className="app-shell__meta-card">
            <Typography.Text type="secondary" className="app-shell__meta-label">
              Версия продукта
            </Typography.Text>
            <Typography.Text className="version-pill">{APP_VERSION_LABEL}</Typography.Text>
            <Typography.Text className="app-shell__meta-brand">{APP_BRANDING}</Typography.Text>
          </div>
        </div>
      </Sider>
      <Layout>
        <Header className="app-shell__header">
          <Typography.Title level={4} style={{ margin: 0 }}>
            CityFeedback: мониторинг комментариев
          </Typography.Title>
          <Space size="middle" align="center">
            {licenseInfo ? (
              <Space size={8}>
                <Typography.Text type="secondary">Статус лицензии:</Typography.Text>
                <LicenseStatusTag status={licenseInfo.status} />
              </Space>
            ) : null}
            <Typography.Text>{session?.username}</Typography.Text>
            <Button icon={<LogoutOutlined />} onClick={logout}>
              Выйти
            </Button>
          </Space>
        </Header>
        <Content className="app-shell__content">
          <div className="content-grid">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
