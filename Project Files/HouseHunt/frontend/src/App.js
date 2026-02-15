import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PropertyList from './pages/PropertyList';
import PropertyDetails from './pages/PropertyDetails';
import RenterDashboard from './pages/RenterDashboard';
import MyBookings from './pages/MyBookings';
import OwnerDashboard from './pages/OwnerDashboard';
import AddProperty from './pages/AddProperty';
import ManageProperties from './pages/ManageProperties';
import BookingRequests from './pages/BookingRequests';
import AdminDashboard from './pages/AdminDashboard';
import PendingOwnerApprovals from './pages/PendingOwnerApprovals';
import { Box } from '@mui/material';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <Box sx={{ flexGrow: 1 }}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/properties" element={<PropertyList />} />
              <Route path="/property/:id" element={<PropertyDetails />} />

              {/* Renter Routes */}
              <Route
                path="/renter/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['renter']}>
                    <RenterDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/renter/bookings"
                element={
                  <ProtectedRoute allowedRoles={['renter']}>
                    <MyBookings />
                  </ProtectedRoute>
                }
              />

              {/* Owner Routes */}
              <Route
                path="/owner/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['owner']}>
                    <OwnerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/owner/add-property"
                element={
                  <ProtectedRoute allowedRoles={['owner']}>
                    <AddProperty />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/owner/properties"
                element={
                  <ProtectedRoute allowedRoles={['owner']}>
                    <ManageProperties />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/owner/booking-requests"
                element={
                  <ProtectedRoute allowedRoles={['owner']}>
                    <BookingRequests />
                  </ProtectedRoute>
                }
              />

              {/* Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/pending-owners"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <PendingOwnerApprovals />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </AuthProvider>
  );
}

export default App;
