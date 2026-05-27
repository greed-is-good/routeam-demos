import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { NewRequestPage } from './pages/NewRequestPage';
import { ProtectedRoute } from './pages/ProtectedRoute';
import { RegisterPage } from './pages/RegisterPage';
import { RequestDetailsPage } from './pages/RequestDetailsPage';
import { RequestSuccessPage } from './pages/RequestSuccessPage';
import { RequestsPage } from './pages/RequestsPage';
import { ServicesPage } from './pages/ServicesPage';

export function App() {
  return (
    <Routes>
      <Route element={<Navigate replace to="/services" />} path="/" />
      <Route element={<ServicesPage />} path="/services" />
      <Route element={<LoginPage />} path="/login" />
      <Route element={<RegisterPage />} path="/register" />
      <Route
        element={
          <ProtectedRoute>
            <NewRequestPage />
          </ProtectedRoute>
        }
        path="/requests/new/:serviceSlug"
      />
      <Route
        element={
          <ProtectedRoute>
            <RequestSuccessPage />
          </ProtectedRoute>
        }
        path="/requests/success/:requestId"
      />
      <Route
        element={
          <ProtectedRoute>
            <RequestsPage />
          </ProtectedRoute>
        }
        path="/requests"
      />
      <Route
        element={
          <ProtectedRoute>
            <RequestDetailsPage />
          </ProtectedRoute>
        }
        path="/requests/:requestId"
      />
      <Route element={<Navigate replace to="/services" />} path="*" />
    </Routes>
  );
}
