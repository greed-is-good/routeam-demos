import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { NewRequestPage } from './pages/NewRequestPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { ProfilePage } from './pages/ProfilePage';
import { ProtectedRoute } from './pages/ProtectedRoute';
import { RegisterPage } from './pages/RegisterPage';
import { RequestDetailsPage } from './pages/RequestDetailsPage';
import { RequestSuccessPage } from './pages/RequestSuccessPage';
import { RequestsPage } from './pages/RequestsPage';
import { ServicesPage } from './pages/ServicesPage';
import { hasSeenOnboarding } from './pages/OnboardingPage';
import { useAuth } from './hooks/useAuth';

function RootRedirect() {
  const { isAuthenticated } = useAuth();

  if (!hasSeenOnboarding()) {
    return <Navigate replace to="/onboarding" />;
  }

  return <Navigate replace to={isAuthenticated ? '/home' : '/services'} />;
}

export function App() {
  return (
    <Routes>
      <Route element={<RootRedirect />} path="/" />
      <Route element={<OnboardingPage />} path="/onboarding" />
      <Route
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
        path="/home"
      />
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
            <ProfilePage />
          </ProtectedRoute>
        }
        path="/profile"
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
