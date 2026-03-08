
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './componenet/Navbar';
import Home from './pages/Home';
import TempleDetails from './pages/TempleDetails';
import Booking from './pages/Booking';
import PaymentPage from './pages/PaymentPage';
import MyBookings from './pages/MyBookings';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import AdminHome from './pages/admin/AdminHome';
import OrganizerHome from './pages/organizer/OrganizerHome';
import UserHome from './pages/user/UserHome';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Nav/>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/temples" element={<Home />} />
        <Route path="/temple/:id" element={<TempleDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/booking/:id"
          element={
            <ProtectedRoute allowedRoles={['user', 'admin']}>
              <Booking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute allowedRoles={['user', 'admin']}>
              <PaymentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute allowedRoles={['user', 'admin']}>
              <MyBookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute allowedRoles={['user', 'admin']}>
              <MyBookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={['user', 'admin', 'organizer']}>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Role-based Dashboard Routes */}
        <Route
          path="/admin/home"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organizer/home"
          element={
            <ProtectedRoute allowedRoles={['organizer']}>
              <OrganizerHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/home"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserHome />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

