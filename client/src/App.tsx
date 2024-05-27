import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import LoginForm from './components/login/LoginForm';
import Home from './components/home/Home';
import Calendar from './components/calendar/Calendar';
import Booking from './components/booking/Booking';
import NotFound from './components/not-found/NotFound';
import Dashboard from './components/dashboard/Dashboard';
import ProtectedRoute from './routes/ProtectedRoutes';

const App: React.FC = () => {
  type UserRole = 'user' | 'admin';
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>();

  const handleLogin = (status: boolean, role: UserRole): void => {
    setLoggedIn(status);
    setUserRole(role);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            loggedIn ? (
              <Navigate to="/dashboard/home" />
            ) : (
              <LoginForm onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Dashboard setLoggedIn={setLoggedIn} />
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<Home />} />
          {userRole === 'admin' && (
            <>
              <Route path="calendar" element={<Calendar />} />
              <Route path="booking" element={<Booking />} />
            </>
          )}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
