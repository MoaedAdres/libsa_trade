# LibsaHub Backend API

A comprehensive NestJS backend for LibsaHub - a clothing rental marketplace platform for Syria.

## 🚀 Features

- **Complete Authentication System**
  - JWT-based authentication
  - Phone OTP authentication (Twilio ready)
  - Google OAuth2 integration
  - Facebook OAuth2 integration
  - Role-based access control

- **Comprehensive Database Schema**
  - 19 entities with proper relationships
  - Polymorphic relationships for addresses and files
  - Audit logging system
  - Photo requirements validation

- **File Management System**
  - Multer-based file uploads
  - Image quality scoring
  - Metadata extraction
  - Organized storage structure

- **Business Logic Modules**
  - User management
  - Supplier management
  - Item catalog
  - Booking system
  - Payment processing
  - Dispute management
  - Communication system

## 🛠️ Tech Stack

- **Framework**: NestJS + TypeScript
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT + Passport
- **File Upload**: Multer + Sharp
- **Validation**: class-validator + class-transformer
- **Documentation**: Swagger/OpenAPI
- **Security**: Helmet + CORS + Rate Limiting

## 📋 Prerequisites

- Node.js (v18+)
- PostgreSQL (v13+)
- npm or yarn

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd libsahub-backend
npm install
```

### 2. Environment Setup

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=libsahub

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key

# OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret

# SMS/OTP (Optional)
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
```

### 3. Database Setup

```bash
# Create database
createdb libsahub

# Run migrations
npm run migration:run

# Seed initial data
npm run seed
```

### 4. Start Development Server

```bash
npm run start:dev
```

The API will be available at:
- **API**: http://localhost:3000/api/v1
- **Documentation**: http://localhost:3000/api/docs

## 📚 API Documentation

Once the server is running, visit http://localhost:3000/api/docs for interactive API documentation.

### Authentication Endpoints

- `POST /auth/register` - Register new user
- `POST /auth/login` - Login with email/password
- `POST /auth/refresh` - Refresh access token
- `GET /auth/google` - Google OAuth login
- `GET /auth/facebook` - Facebook OAuth login
- `POST /auth/otp/request` - Request OTP
- `POST /auth/otp/verify` - Verify OTP
- `GET /auth/profile` - Get current user profile

### User Management

- `GET /users` - Get all users (Admin only)
- `GET /users/:id` - Get user by ID
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user (Admin only)

### File Management

- `POST /files/upload` - Upload file
- `GET /files/entity/:ownerType/:ownerId` - Get files for entity
- `DELETE /files/:id` - Delete file

## 🗄️ Database Schema

The application includes 19 main entities:

### Core Entities
- **users** - User accounts
- **user_phones** - Phone numbers
- **addresses** - Polymorphic addresses
- **suppliers** - Shop/tailor profiles
- **files** - Central file management

### Business Entities
- **items** - Physical garments
- **consignments** - Consignment tracking
- **listings** - Rental/sale offers
- **bookings** - Reservations
- **payments** - Financial transactions
- **payouts** - Supplier payouts

### Support Entities
- **disputes** - Damage claims
- **damage_assessments** - Detailed damage records
- **conversations** - Chat conversations
- **messages** - Chat messages
- **audit_logs** - Action tracking
- **photo_requirements** - Photo validation rules

## 🔧 Development Scripts

```bash
# Development
npm run start:dev          # Start with hot reload
npm run start:debug        # Start with debugging

# Building
npm run build              # Build for production
npm run start:prod         # Start production server

# Database
npm run migration:generate # Generate new migration
npm run migration:run      # Run migrations
npm run migration:revert   # Revert last migration
npm run seed              # Seed database

# Testing
npm run test              # Run unit tests
npm run test:e2e          # Run e2e tests
npm run test:cov          # Run tests with coverage

# Code Quality
npm run lint              # Run ESLint
npm run format            # Format code with Prettier
```

## 🔐 Authentication & Authorization

### User Roles
- **CUSTOMER** - Can rent items, create bookings
- **SUPPLIER** - Can list items, manage inventory
- **ADMIN** - Full system access
- **STAFF** - Support and moderation access

### Authentication Methods
1. **Email/Password** - Traditional login
2. **Phone OTP** - SMS-based authentication
3. **Google OAuth2** - Social login
4. **Facebook OAuth2** - Social login

### Authorization
- JWT tokens with 15-minute expiration
- Refresh tokens with 7-day expiration
- Role-based guards for endpoint protection
- Rate limiting on sensitive endpoints

## 📁 Project Structure

```
src/
├── modules/                 # Feature modules
│   ├── auth/               # Authentication
│   ├── users/              # User management
│   ├── suppliers/          # Supplier management
│   ├── items/              # Item catalog
│   ├── bookings/           # Booking system
│   ├── payments/           # Payment processing
│   ├── disputes/           # Dispute management
│   ├── conversations/      # Communication
│   ├── files/             # File management
│   └── audit/             # Audit logging
├── common/                 # Shared utilities
│   ├── decorators/        # Custom decorators
│   ├── filters/           # Exception filters
│   ├── interceptors/      # Response interceptors
│   ├── pipes/             # Validation pipes
│   └── enums/             # TypeScript enums
├── config/                # Configuration
├── database/              # Database setup
│   ├── migrations/        # Database migrations
│   └── seeds/            # Database seeds
└── utils/                 # Utility functions
```

## 🚀 Deployment

### Production Environment Variables

```env
NODE_ENV=production
PORT=3000
DB_SYNCHRONIZE=false
DB_LOGGING=false
```

### Docker Deployment (Optional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3000
CMD ["node", "dist/main"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the API documentation at `/api/docs`

## 🔄 Changelog

### v1.0.0
- Initial release
- Complete authentication system
- All 19 database entities
- File upload system
- API documentation
- Database migrations and seeds

---

**Built with ❤️ for LibsaHub**