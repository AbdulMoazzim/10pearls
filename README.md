# 📝 NotesApp — Full-Stack Notes Application

A modern, full-stack notes application built with **React**, **TypeScript**, **Node.js**, **Express**, and **MongoDB**. Features rich text editing, JWT authentication, dark mode, and a beautiful responsive UI.

---

## 📚 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Backend Architecture](#backend-architecture)
- [Frontend Architecture](#frontend-architecture)
- [API Reference](#api-reference)
- [Database Schema](#database-schema)
- [Authentication Flow](#authentication-flow)
- [Testing](#testing)
- [Logging](#logging)
- [Error Handling](#error-handling)
- [Security](#security)
- [Known Issues & Fixes](#known-issues--fixes)
- [Scripts](#scripts)
- [Contributing](#contributing)

---

## 🌟 Overview

NotesApp is a secure, full-stack web application that allows authenticated users to create, read, update, and delete personal notes. Each note supports rich text editing via TipTap, with support for headings, bold, italic, underline, lists, blockquotes, and code blocks.

### Key Features

- 🔐 **JWT Authentication** — Secure signup, login, and protected routes
- 📝 **Rich Text Editor** — TipTap-powered editor with full formatting support
- 🔍 **Search** — Real-time client-side and server-side note search
- 🌗 **Dark Mode** — Toggle between light and dark themes
- 📱 **Responsive Design** — Mobile-first UI using Tailwind CSS
- 🪵 **Structured Logging** — Pino logger with pretty-printing in development
- 🧪 **Unit Testing** — Mocha/Chai for backend, Jest-ready for frontend
- 🛡️ **Security** — Helmet, CORS, rate limiting, bcrypt password hashing
- 🗑️ **Soft Delete** — Notes are soft-deleted and never permanently removed instantly

---

## 🛠️ Tech Stack

### Backend

| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | Web framework |
| TypeScript | Type safety |
| MongoDB | NoSQL database |
| Mongoose | MongoDB ODM |
| JWT (jsonwebtoken) | Authentication tokens |
| bcryptjs | Password hashing |
| Pino | Structured logging |
| Helmet | HTTP security headers |
| express-rate-limit | API rate limiting |
| express-validator | Request validation |
| Mocha + Chai | Unit testing |
| Supertest | HTTP integration testing |

### Frontend

| Technology | Purpose |
|---|---|
| React 18 | UI library |
| TypeScript | Type safety |
| Vite | Build tool & dev server |
| Tailwind CSS | Utility-first styling |
| React Router v6 | Client-side routing |
| Axios | HTTP client |
| TipTap | Rich text editor |
| React Hot Toast | Toast notifications |
| React Icons | Icon library |
| Framer Motion | Animations |

---

## 📁 Project Structure

```
notesapp/
├── backend/                        # Express + TypeScript backend
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.ts         # MongoDB connection
│   │   │   └── logger.ts           # Pino logger configuration
│   │   ├── controllers/
│   │   │   ├── authController.ts   # Auth request handlers
│   │   │   └── noteController.ts   # Note request handlers
│   │   ├── middleware/
│   │   │   ├── authMiddleware.ts   # JWT verification
│   │   │   ├── errorMiddleware.ts  # Global error handler
│   │   │   └── validationMiddleware.ts # Request validation
│   │   ├── models/
│   │   │   ├── User.model.ts       # User Mongoose schema
│   │   │   └── Note.model.ts       # Note Mongoose schema
│   │   ├── routes/
│   │   │   ├── auth.routes.ts      # Auth routes
│   │   │   └── note.routes.ts      # Note routes
│   │   ├── services/
│   │   │   ├── authService.ts      # Auth business logic
│   │   │   └── noteService.ts      # Note business logic
│   │   ├── tests/
│   │   │   ├── auth.test.ts        # Auth unit tests
│   │   │   └── note.test.ts        # Note unit tests
│   │   ├── types/
│   │   │   └── index.ts            # Shared TypeScript types
│   │   ├── utils/
│   │   │   ├── ApiError.ts         # Custom error class
│   │   │   └── asyncHandler.ts     # Async error wrapper
│   │   ├── app.ts                  # Express app setup
│   │   └── server.ts               # Server entry point
│   ├── .env                        # Environment variables
│   ├── .gitignore
│   ├── nodemon.json                # Nodemon config
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/                       # Vite + React + TypeScript frontend
    ├── src/
    │   ├── api/
    │   │   ├── axios.ts            # Axios instance & interceptors
    │   │   ├── auth.api.ts         # Auth API calls
    │   │   └── notes.api.ts        # Notes API calls
    │   ├── components/
    │   │   ├── notes/
    │   │   │   ├── NoteCard.tsx    # Individual note card
    │   │   │   └── NoteEditor.tsx  # TipTap rich text editor modal
    │   │   └── ui/
    │   │       ├── Button.tsx      # Reusable button component
    │   │       ├── Input.tsx       # Reusable input component
    │   │       └── Spinner.tsx     # Loading spinner
    │   ├── context/
    │   │   └── AuthContext.tsx     # Global auth state
    │   ├── pages/
    │   │   ├── LandingPage.tsx     # Public landing page
    │   │   ├── LoginPage.tsx       # Login page
    │   │   ├── SignUpPage.tsx      # Signup page
    │   │   ├── Dashboard.tsx       # Main notes dashboard
    │   │   └── ProfilePage.tsx     # User profile page
    │   ├── utils/
    │   │   └── types.ts            # Shared TypeScript types
    │   ├── App.tsx                 # Root component with routing
    │   ├── main.tsx                # Entry point
    │   └── index.css               # Global styles + TipTap styles
    ├── .env                        # Frontend environment variables
    ├── package.json
    ├── tailwind.config.js
    ├── postcss.config.js
    └── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.x
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- npm >= 9.x

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/notesapp.git
cd notesapp
```

### 2. Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env with your values (see Environment Variables section)

# Start development server
npm run dev
```

### 3. Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env with your values

# Start development server
npm run dev
```

### 4. Open in Browser

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

---

## 🔧 Environment Variables

### Backend (`backend/.env`)

```env
# Server
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/notesapp

# JWT
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
JWT_EXPIRE=7d

# CORS
CORS_ORIGIN=http://localhost:3000

# Logging
LOG_LEVEL=info
```

| Variable | Required | Description |
|---|---|---|
| `NODE_ENV` | Yes | `development` or `production` |
| `PORT` | No | Server port (default: 5000) |
| `MONGODB_URI` | Yes | MongoDB connection string |
| `JWT_SECRET` | Yes | Secret key for signing JWTs (min 32 chars) |
| `JWT_EXPIRE` | No | JWT expiry duration (default: 7d) |
| `CORS_ORIGIN` | Yes | Allowed frontend origin |
| `LOG_LEVEL` | No | Pino log level (default: info) |

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:5000/api
```

| Variable | Required | Description |
|---|---|---|
| `VITE_API_URL` | Yes | Backend API base URL |

---

## 🏗️ Backend Architecture

### Request Lifecycle

```
Request
  → Rate Limiter
  → CORS
  → Helmet
  → Body Parser
  → Pino HTTP Logger
  → Router
    → Validation Middleware
    → Auth Middleware (protected routes)
    → Controller
      → Service
        → Model (MongoDB)
      ← Response
  ← Error Middleware (if error thrown)
Response
```

### Layers

#### Controllers
Thin layer that handles HTTP requests and responses. Delegates all business logic to services.

```typescript
signup = asyncHandler(async (req: AuthRequest, res: Response) => {
  const result = await authService.signup(req.body);
  res.status(201).json({ success: true, data: result });
});
```

#### Services
Contains all business logic. Validates data, interacts with models, throws `ApiError` on failure.

```typescript
async signup(data: SignupData) {
  const existing = await User.findOne({ email: data.email });
  if (existing) throw new ApiError(400, 'Email already registered');
  const user = await User.create(data);
  const token = this.generateToken(user._id, user.email);
  return { token, user };
}
```

#### Models
Mongoose schemas with validation, indexes, and instance methods.

#### Middleware
- `authMiddleware` — Verifies JWT and attaches `req.user`
- `errorMiddleware` — Catches all errors and returns consistent JSON responses
- `validationMiddleware` — Runs `express-validator` chains and returns 400 on failure

#### Utilities
- `ApiError` — Custom error class with `statusCode`
- `asyncHandler` — Wraps async route handlers to forward errors to `next()`

---

## 🎨 Frontend Architecture

### Routing

```
/               → LandingPage      (public)
/login          → LoginPage        (public, redirects if logged in)
/signup         → SignUpPage       (public, redirects if logged in)
/dashboard      → Dashboard        (protected)
/profile        → ProfilePage      (protected)
*               → Redirect to /
```

### Auth Context

Global state for authentication using React Context API:

```typescript
const { user, token, login, signup, logout, isLoading } = useAuth();
```

- Reads token and user from `localStorage` on mount
- Persists token and user to `localStorage` on login/signup
- Clears `localStorage` on logout
- Axios interceptor automatically attaches `Authorization: Bearer <token>` header

### API Layer

All API calls go through a centralized Axios instance with:
- Base URL from `VITE_API_URL`
- Request interceptor: attaches JWT token
- Response interceptor: redirects to `/login` on 401

### Component Hierarchy

```
App
├── AuthProvider (Context)
├── Toaster (react-hot-toast)
└── Routes
    ├── LandingPage
    ├── LoginPage
    ├── SignUpPage
    ├── Dashboard
    │   ├── Navbar
    │   ├── SearchBar
    │   ├── NoteCard (×n)
    │   └── NoteEditor (Modal)
    │       └── Toolbar
    └── ProfilePage
        └── Navbar
```

---

## 📡 API Reference

### Base URL

```
http://localhost:5000/api
```

### Auth Endpoints

#### POST `/auth/signup`

Register a new user.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "user": {
      "id": "698b319960538...",
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe"
    }
  }
}
```

---

#### POST `/auth/login`

Authenticate an existing user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "user": {
      "id": "698b319960538...",
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe"
    }
  }
}
```

---

#### GET `/auth/profile` 🔒

Get current user's profile.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "698b319960538...",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "createdAt": "2026-02-10T12:00:00.000Z"
  }
}
```

---

#### PUT `/auth/profile` 🔒

Update current user's profile.

**Request Body (all fields optional):**
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@example.com"
}
```

---

### Notes Endpoints

> All note endpoints require `Authorization: Bearer <token>` header.

---

#### GET `/notes`

Get all notes for the authenticated user.

**Response (200):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "699455930071ebdc1195bcf2",
      "userId": "698b319960538...",
      "title": "My First Note",
      "content": "<p>Hello world</p>",
      "isDeleted": false,
      "createdAt": "2026-02-10T12:00:00.000Z",
      "updatedAt": "2026-02-10T12:00:00.000Z"
    }
  ]
}
```

---

#### GET `/notes/search?q=<query>`

Search notes by title or content.

**Query Parameters:**

| Param | Type | Description |
|---|---|---|
| `q` | string | Search query (case-insensitive) |

---

#### GET `/notes/:id`

Get a single note by ID.

**Response (200):**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error (404):**
```json
{
  "success": false,
  "message": "Note not found"
}
```

---

#### POST `/notes`

Create a new note.

**Request Body:**
```json
{
  "title": "My New Note",
  "content": "<p>Note content in <strong>HTML</strong></p>"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Note created successfully",
  "data": { ... }
}
```

---

#### PUT `/notes/:id`

Update an existing note.

**Request Body (all fields optional):**
```json
{
  "title": "Updated Title",
  "content": "<p>Updated content</p>"
}
```

---

#### DELETE `/notes/:id`

Soft-delete a note (sets `isDeleted: true`).

**Response (200):**
```json
{
  "success": true,
  "message": "Note deleted successfully"
}
```

---

### Error Response Format

All errors follow this consistent format:

```json
{
  "success": false,
  "message": "Human-readable error message",
  "stack": "..." // Only in development mode
}
```

### HTTP Status Codes

| Code | Meaning |
|---|---|
| 200 | OK |
| 201 | Created |
| 304 | Not Modified (cached) |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (missing/invalid token) |
| 404 | Not Found |
| 429 | Too Many Requests (rate limited) |
| 500 | Internal Server Error |

---

## 🗄️ Database Schema

### Users Collection

```typescript
{
  _id:        ObjectId,         // Auto-generated
  email:      String,           // Unique, lowercase, required
  password:   String,           // Bcrypt hashed, select: false
  firstName:  String,           // Required, trimmed
  lastName:   String,           // Required, trimmed
  isActive:   Boolean,          // Default: true
  createdAt:  Date,             // Auto (timestamps)
  updatedAt:  Date              // Auto (timestamps)
}
```

**Indexes:**
- `{ email: 1 }` — Unique index for fast lookup
- `{ isActive: 1 }` — For filtering active users

---

### Notes Collection

```typescript
{
  _id:        ObjectId,         // Auto-generated
  userId:     String,           // References User._id, required
  title:      String,           // Required, max 255 chars, trimmed
  content:    String,           // HTML string from TipTap, default: ""
  isDeleted:  Boolean,          // Soft delete flag, default: false
  createdAt:  Date,             // Auto (timestamps)
  updatedAt:  Date              // Auto (timestamps)
}
```

**Indexes:**
- `{ userId: 1, isDeleted: 1, updatedAt: -1 }` — Compound index for efficient note listing
- `{ userId: 1, createdAt: -1 }` — For creation-date sorting

---

## 🔐 Authentication Flow

```
1. User submits signup/login form
        ↓
2. Frontend calls POST /api/auth/signup or /api/auth/login
        ↓
3. Backend validates request body (express-validator)
        ↓
4. AuthService checks credentials / creates user
        ↓
5. Password hashed with bcrypt (salt rounds: 10)
        ↓
6. JWT signed with JWT_SECRET, expires in JWT_EXPIRE
        ↓
7. Token + user data returned to frontend
        ↓
8. Frontend stores token in localStorage via AuthContext
        ↓
9. Axios interceptor attaches token to all future requests
        ↓
10. Protected routes verify token via authMiddleware
         ↓
11. req.user = { id, email } attached for downstream use
```

### Token Payload

```json
{
  "id": "698b319960538...",
  "email": "john@example.com",
  "iat": 1707566400,
  "exp": 1708171200
}
```

---

## 🧪 Testing

### Backend Tests (Mocha + Chai + Supertest)

```bash
cd backend
npm test
```

Test files are located in `src/tests/`:

- `auth.test.ts` — Tests for signup, login, validation
- `note.test.ts` — Tests for CRUD operations, auth protection

#### Example Test

```typescript
describe('POST /api/auth/signup', () => {
  it('should register a new user', async () => {
    const res = await request(app).post('/api/auth/signup').send({
      email: 'test@example.com',
      password: 'Test@1234',
      firstName: 'Test',
      lastName: 'User',
    });
    expect(res.status).to.equal(201);
    expect(res.body.data).to.have.property('token');
  });
});
```

#### Test Coverage Areas

| Area | Tests |
|---|---|
| Auth - Signup | Valid signup, duplicate email, invalid email, short password |
| Auth - Login | Valid login, wrong password, non-existent user |
| Notes - Create | Valid note, missing title, no auth token |
| Notes - Read | Get all, get by ID, 404 for missing note |
| Notes - Update | Valid update, wrong user, invalid ID |
| Notes - Delete | Soft delete, verify deleted note returns 404 |

---

## 📊 Logging

This project uses **Pino** for structured JSON logging.

### Log Levels

| Level | Usage |
|---|---|
| `trace` | Very detailed debugging |
| `debug` | Development debugging |
| `info` | General information (default) |
| `warn` | Non-critical warnings |
| `error` | Errors that need attention |
| `fatal` | Application crashes |

### Development Output (pino-pretty)

```
[13:26:55.967] INFO: MongoDB Connected: localhost
[13:26:55.970] INFO: Server running in development mode on port 5000
[13:27:01.123] INFO: New user registered: john@example.com
[13:27:05.456] INFO: User logged in: john@example.com
[13:27:10.789] INFO: Retrieved 3 notes for user: 698b319...
```

### Production Output (JSON)

```json
{
  "level": "info",
  "time": "2026-02-10T13:26:55.967Z",
  "message": "User logged in: john@example.com"
}
```

### HTTP Request Logging

In **production**, Pino HTTP logs every request:

```json
{
  "level": "info",
  "method": "GET",
  "url": "/api/notes",
  "statusCode": 200,
  "responseTime": 45
}
```

In **development**, Morgan provides clean single-line logs:

```
GET /api/notes 200 45ms
POST /api/auth/login 200 120ms
```

---

## 🚨 Error Handling

### Global Error Handler

All errors flow through the centralized `errorMiddleware`:

```typescript
// Automatically handles:
// - ApiError (custom)          → statusCode + message
// - Mongoose ValidationError   → 400 + field messages
// - Mongoose Duplicate Key     → 400 + "field already exists"
// - Mongoose CastError         → 400 + "Invalid ID"
// - JWT JsonWebTokenError      → 401 + "Invalid token"
// - JWT TokenExpiredError      → 401 + "Token expired"
// - Everything else            → 500 + "Internal Server Error"
```

### Custom ApiError

```typescript
// Usage in services
throw new ApiError(404, 'Note not found');
throw new ApiError(400, 'Email already registered');
throw new ApiError(401, 'Invalid credentials');
```

### Frontend Error Handling

- Axios interceptors catch 401 responses and redirect to `/login`
- All API calls wrapped in `try/catch` with `toast.error()` for user feedback
- Form validation shown inline before submitting

---

## 🛡️ Security

### Backend Security Measures

| Measure | Implementation |
|---|---|
| Password Hashing | bcryptjs with 10 salt rounds |
| JWT Signing | HMAC-SHA256 with secret key |
| HTTP Headers | Helmet.js (CSP, HSTS, XSS protection, etc.) |
| Rate Limiting | 100 requests per 15 minutes per IP |
| CORS | Restricted to `CORS_ORIGIN` only |
| Input Validation | express-validator on all endpoints |
| Soft Delete | Notes never permanently deleted instantly |
| Password Select | `select: false` on password field in Mongoose |

### Frontend Security Measures

| Measure | Implementation |
|---|---|
| Protected Routes | Redirect to `/login` if no token |
| Token Storage | `localStorage` (upgrade to httpOnly cookie in production) |
| Auto Logout | 401 interceptor clears token and redirects |
| Input Sanitization | TipTap sanitizes HTML content |

---

## 🐛 Known Issues & Fixes

### 1. `next is not a function` in Mongoose pre-save hook

**Cause:** Calling `next(error)` incorrectly in async Mongoose middleware.

**Fix:** Use async pre-save without `next()`:

```typescript
// ❌ Wrong
userSchema.pre('save', async function (next) {
  next(error); // causes TypeError
});

// ✅ Correct
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
```

---

### 2. `Cast to ObjectId failed for value "6"` on note routes

**Cause:** Express route order issue — `/search` was placed after `/:id`, causing Express to match `"search"` as a note ID, then only passing the first character `"6"` to MongoDB.

**Fix:** Always place specific routes before parameterized routes:

```typescript
// ✅ Correct order
router.get('/search', noteController.searchNotes);   // specific first
router.get('/', noteController.getAllNotes);
router.get('/:id', noteController.getNoteById);      // parameterized last
```

---

### 3. `E11000 duplicate key error — username_1`

**Cause:** Old `username` index left in the MongoDB `users` collection from a previous schema version.

**Fix:** Drop the stale index:

```bash
mongosh
use notesapp
db.users.dropIndex("username_1")
exit
```

---

### 4. TipTap toolbar buttons losing editor focus

**Cause:** `onClick` handler causes the editor to lose focus before the formatting command runs.

**Fix:** Use `onMouseDown` with `e.preventDefault()`:

```typescript
const handleMouseDown = (e: React.MouseEvent) => {
  e.preventDefault(); // prevents blur
  editor.chain().focus().toggleBold().run();
};
```

---

### 5. Wrong database (`test` instead of `notesapp`)

**Cause:** `MONGODB_URI` not set in `.env`, defaulting to the `test` database.

**Fix:** Set the correct URI in `.env`:

```env
MONGODB_URI=mongodb://localhost:27017/notesapp
```

---

## 📜 Scripts

### Backend

| Script | Command | Description |
|---|---|---|
| Development | `npm run dev` | Start with nodemon + ts-node |
| Build | `npm run build` | Compile TypeScript to `dist/` |
| Start | `npm start` | Run compiled production build |
| Test | `npm test` | Run Mocha test suite |
| Test Watch | `npm run test:watch` | Run tests in watch mode |

### Frontend

| Script | Command | Description |
|---|---|---|
| Development | `npm run dev` | Start Vite dev server on port 3000 |
| Build | `npm run build` | Type-check + Vite production build |
| Preview | `npm run preview` | Preview production build locally |
| Lint | `npm run lint` | ESLint check |

---

## 🤝 Contributing

### Git Workflow

```
main          ← Production-ready code
  └── develop ← Integration branch
        ├── feature/auth
        ├── feature/notes-crud
        ├── feature/rich-text-editor
        └── fix/objectid-cast-error
```

### Branch Naming

| Type | Pattern | Example |
|---|---|---|
| Feature | `feature/<name>` | `feature/search-notes` |
| Bug Fix | `fix/<name>` | `fix/objectid-cast-error` |
| Hotfix | `hotfix/<name>` | `hotfix/jwt-expiry` |
| Refactor | `refactor/<name>` | `refactor/note-service` |

### Commit Message Format

```
type(scope): short description

feat(auth): add JWT refresh token support
fix(notes): correct route order for search endpoint
docs(readme): update environment variables section
refactor(service): extract token generation to utility
test(auth): add tests for duplicate email signup
```

### Pull Request Checklist

- [ ] Tests pass (`npm test`)
- [ ] No TypeScript errors (`npm run build`)
- [ ] No ESLint errors (`npm run lint`)
- [ ] New features have tests
- [ ] README updated if needed
- [ ] Branch is up to date with `develop`

---

## 📄 License

This project is licensed under the MIT License.

---

## 👤 Author

Built with ❤️ as a full-stack learning project.

---

*Last updated: February 2026*
