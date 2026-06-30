import { Navigate, Route, Routes } from 'react-router-dom';
import { CategoryPage } from './pages/CategoryPage';
import { LoginPage } from './pages/LoginPage';
import { NewRequestPage } from './pages/NewRequestPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { ProfilePage } from './pages/ProfilePage';
import { ProtectedRoute } from './pages/ProtectedRoute';
import { PublicHomePage } from './pages/PublicHomePage';
import { RegisterPage } from './pages/RegisterPage';
import { RequestDetailsPage } from './pages/RequestDetailsPage';
import { RequestSuccessPage } from './pages/RequestSuccessPage';
import { RequestsPage } from './pages/RequestsPage';

export function App() {
  return (
    <Routes>
      <Route element={<PublicHomePage />} path="/" />
      <Route element={<OnboardingPage />} path="/onboarding" />
      <Route element={<Navigate replace to="/" />} path="/home" />
      <Route element={<Navigate replace to="/" />} path="/services" />
      <Route element={<CategoryPage />} path="/categories/:categorySlug" />
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
      <Route element={<Navigate replace to="/" />} path="*" />
    </Routes>
  );
}
