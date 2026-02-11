import ReactDOM from 'react-dom/client';
import { ConfigProvider, theme } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import dayjs from 'dayjs';
import { HashRouter } from 'react-router-dom';
import 'dayjs/locale/ru';
import 'antd/dist/reset.css';

import { App } from './App';
import { AuthProvider } from './context/AuthContext';
import './styles/global.css';

dayjs.locale('ru');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ConfigProvider
    locale={ruRU}
    theme={{
      algorithm: theme.defaultAlgorithm,
      token: {
        colorPrimary: '#1f7a8c',
        colorInfo: '#1f7a8c',
        borderRadius: 12,
        fontFamily: '"Manrope", "Trebuchet MS", "Segoe UI", sans-serif',
      },
      components: {
        Layout: {
          headerBg: 'rgba(255, 255, 255, 0.78)',
          siderBg: '#f4f8fa',
        },
        Menu: {
          itemSelectedBg: '#d5eef3',
          itemSelectedColor: '#0b6374',
        },
      },
    }}
  >
    <AuthProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </AuthProvider>
  </ConfigProvider>,
);
