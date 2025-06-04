# Swap Space Backend

A comprehensive real estate platform backend built with Node.js, Express, TypeScript, and PostgreSQL.

## Features

- 🏠 Property Management
- 👥 User Authentication & Authorization
- 🏢 Real Estate Agent Portal
- 📊 Property Analytics
- 💬 Feedback System
- ⭐ Rating System
- 👥 Team Management
- 📝 Task Management
- 📸 Image Upload Support
- 📱 Apple Sign-in Integration

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT, Passport.js
- **Documentation**: Swagger/OpenAPI
- **File Upload**: Multer
- **API Security**: Helmet, XSS Protection, Rate Limiting

## Prerequisites

- Node.js 18.x or higher
- PostgreSQL 14.x
- Docker Desktop (optional, for containerization)
- Git

## Getting Started

1. **Clone the repository**
```bash
git clone https://github.com/swapspaces/SSBackendMainWebApp.git
cd SSBackendMainWebApp
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**

Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/swapspace"
JWT_SECRET="your-secret-key"
PORT=6001
```

4. **Database Setup**

Option A: Using Docker
```bash
docker-compose up -d
```

Option B: Local PostgreSQL
```bash
createdb swapspace
```

5. **Run Migrations**
```bash
npm run migrate
```

6. **Start Development Server**
```bash
npm run dev
```

The server will start at `http://localhost:6001`

## API Documentation

API documentation is available via Swagger UI at:
```
http://localhost:6001/api-docs
```

### Main API Endpoints

- **Authentication**
  - POST `/api/v1/auth/signup` - Register new user
  - POST `/api/v1/auth/users/login` - User login
  - GET `/api/v1/auth/logout` - User logout

- **Properties**
  - GET `/api/v1/properties` - List all properties
  - POST `/api/v1/properties/:agentId/add` - Add new property
  - POST `/api/v1/properties/:propertyId/images` - Upload property images
  - GET `/api/v1/properties/filters/find` - Filter properties

- **Users & Profiles**
  - GET `/api/v1/profiles` - Get user profiles
  - PATCH `/api/v1/profiles` - Update profile

- **Feedback**
  - POST `/api/v1/feedbacks/add` - Submit feedback
  - GET `/api/v1/feedbacks` - Get all feedback

## Development

### Available Scripts

- `npm run dev` - Start development server with hot-reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run migrate` - Run database migrations
- `npm run showdb` - Open Prisma Studio

### Project Structure

```
src/
├── controllers/    # Request handlers
├── middleware/     # Custom middleware
├── router/        # Route definitions
├── DB/            # Database configuration
├── config/        # App configuration
├── types/         # TypeScript type definitions
└── app.ts         # Application entry point
```

## Contributing

1. Create a new issue
2. Create a new branch
```bash
git fetch origin
git checkout -b feature/your-feature-name
```
3. Make your changes
4. Create a pull request

## Security

The API implements several security measures:
- JWT Authentication
- Rate Limiting
- XSS Protection
- Helmet Security Headers
- Input Validation
- File Upload Restrictions

## License

[Add your license information here]

## Support

[Add support contact information here] 