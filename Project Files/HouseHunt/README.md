# 🏠 HouseHunt: Finding Your Perfect Rental Home

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application for rental property management with role-based authentication.

## 📋 Features

### Role-Based Authentication
- **Renter**: Browse properties, send booking requests, track booking status
- **Owner**: Add/manage properties, approve/reject booking requests (requires admin approval)
- **Admin**: Approve owner accounts, manage users and properties

### Core Functionality
- ✅ User registration and login with JWT authentication
- ✅ Property listing with advanced filtering (location, rent, type, bedrooms)
- ✅ Property details with image gallery and amenities
- ✅ Booking request system with status tracking
- ✅ Owner approval workflow by admin
- ✅ Property CRUD operations for approved owners
- ✅ Responsive UI with Bootstrap and Material-UI

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS for cross-origin requests

### Frontend
- React.js
- React Router DOM for routing
- Material-UI (MUI) for components
- Bootstrap for styling
- Axios for API requests
- Context API for state management

## 📁 Project Structure

```
HouseHunt/
├── backend/
│   ├── config/
│   │   └── config.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── propertyController.js
│   │   ├── bookingController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   ├── models/
│   │   ├── Renter.js
│   │   ├── Owner.js
│   │   ├── Admin.js
│   │   ├── Property.js
│   │   └── Booking.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── propertyRoutes.js
│   │   ├── bookingRoutes.js
│   │   └── adminRoutes.js
│   ├── .env
│   ├── index.js
│   └── package.json
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   ├── PropertyCard.jsx
    │   │   ├── FilterSidebar.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── PropertyList.jsx
    │   │   ├── PropertyDetails.jsx
    │   │   ├── RenterDashboard.jsx
    │   │   ├── MyBookings.jsx
    │   │   ├── OwnerDashboard.jsx
    │   │   ├── AddProperty.jsx
    │   │   ├── ManageProperties.jsx
    │   │   ├── BookingRequests.jsx
    │   │   ├── AdminDashboard.jsx
    │   │   └── PendingOwnerApprovals.jsx
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── services/
    │   │   └── api.js
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    └── package.json
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with the following variables:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/househuntDB
JWT_SECRET=househunt_secret_key_123
```

4. Start MongoDB (if using local installation):
```bash
mongod
```

5. Run the backend server:
```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

Frontend will run on `http://localhost:3000`

## 📝 API Endpoints

### Authentication Routes
- `POST /api/auth/register/renter` - Register as renter
- `POST /api/auth/register/owner` - Register as owner
- `POST /api/auth/register/admin` - Register as admin
- `POST /api/auth/login` - Login user

### Property Routes
- `GET /api/properties` - Get all properties (with filters)
- `GET /api/properties/:id` - Get single property
- `POST /api/properties/add` - Add property (owner only)
- `PUT /api/properties/update/:id` - Update property (owner only)
- `DELETE /api/properties/delete/:id` - Delete property (owner only)
- `GET /api/properties/owner/myproperties` - Get owner's properties

### Booking Routes
- `POST /api/bookings/request` - Create booking request (renter only)
- `GET /api/bookings/renter` - Get renter's bookings
- `GET /api/bookings/owner` - Get owner's booking requests
- `PUT /api/bookings/approve/:id` - Approve booking (owner only)
- `PUT /api/bookings/reject/:id` - Reject booking (owner only)

### Admin Routes
- `GET /api/admin/pendingOwners` - Get pending owner approvals
- `PUT /api/admin/approveOwner/:id` - Approve owner
- `PUT /api/admin/rejectOwner/:id` - Reject owner
- `GET /api/admin/allUsers` - Get all users
- `DELETE /api/admin/deleteProperty/:id` - Delete any property

## 👥 User Workflows

### Renter Workflow
1. Register as renter
2. Login to account
3. Browse properties with filters
4. View property details
5. Send booking request
6. Track booking status in dashboard

### Owner Workflow
1. Register as owner
2. Wait for admin approval
3. Login after approval
4. Add new properties
5. Manage existing properties
6. Review and approve/reject booking requests

### Admin Workflow
1. Login as admin
2. Review pending owner registrations
3. Approve or reject owner accounts
4. Monitor all users and properties
5. Delete inappropriate property listings

## 🎨 UI Features

- Modern gradient design with purple theme
- Responsive layout for mobile and desktop
- Material-UI components with custom styling
- Hover effects and smooth transitions
- Loading spinners and error handling
- Toast notifications for user actions

## 🔐 Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Protected routes with role-based access control
- Token stored in localStorage
- Middleware for authentication and authorization

## 📦 Dependencies

### Backend
```json
{
  "express": "^4.18.2",
  "mongoose": "^7.0.0",
  "cors": "^2.8.5",
  "bcryptjs": "^2.4.3",
  "dotenv": "^16.0.3",
  "jsonwebtoken": "^9.0.0",
  "nodemon": "^2.0.22"
}
```

### Frontend
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.10.0",
  "axios": "^1.3.5",
  "bootstrap": "^5.2.3",
  "@mui/material": "^5.12.0",
  "@emotion/react": "^11.10.6",
  "@emotion/styled": "^11.10.6"
}
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check MONGO_URI in .env file
- Verify MongoDB port (default: 27017)

### CORS Errors
- Ensure backend CORS is configured
- Check API_URL in frontend api.js

### Authentication Issues
- Clear localStorage and login again
- Check JWT_SECRET matches in backend

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Created as a MERN stack learning project.

## 🙏 Acknowledgments

- Material-UI for beautiful components
- Bootstrap for responsive styling
- MongoDB for database management
- Express.js for backend framework
- React.js for frontend framework

---

**Happy House Hunting! 🏠**
