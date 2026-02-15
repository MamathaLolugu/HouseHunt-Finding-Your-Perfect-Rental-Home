import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Auth APIs
export const authAPI = {
    registerRenter: (data) => api.post('/auth/register/renter', data),
    registerOwner: (data) => api.post('/auth/register/owner', data),
    registerAdmin: (data) => api.post('/auth/register/admin', data),
    login: (data) => api.post('/auth/login', data)
};

// Property APIs
export const propertyAPI = {
    getAllProperties: (params) => api.get('/properties', { params }),
    getPropertyById: (id) => api.get(`/properties/${id}`),
    addProperty: (data) => api.post('/properties/add', data),
    updateProperty: (id, data) => api.put(`/properties/update/${id}`, data),
    deleteProperty: (id) => api.delete(`/properties/delete/${id}`),
    getOwnerProperties: () => api.get('/properties/owner/myproperties')
};

// Booking APIs
export const bookingAPI = {
    createBooking: (data) => api.post('/bookings/request', data),
    getRenterBookings: () => api.get('/bookings/renter'),
    getOwnerBookings: () => api.get('/bookings/owner'),
    approveBooking: (id) => api.put(`/bookings/approve/${id}`),
    rejectBooking: (id) => api.put(`/bookings/reject/${id}`)
};

// Admin APIs
export const adminAPI = {
    getPendingOwners: () => api.get('/admin/pendingOwners'),
    approveOwner: (id) => api.put(`/admin/approveOwner/${id}`),
    rejectOwner: (id) => api.put(`/admin/rejectOwner/${id}`),
    getAllUsers: () => api.get('/admin/allUsers'),
    deleteProperty: (id) => api.delete(`/admin/deleteProperty/${id}`)
};

export default api;
