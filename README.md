# Job Search Clone

A full-stack authentication system built with React, TypeScript, Express, MongoDB, and session-based authentication**.

The project demonstrates how a modern frontend application communicates with a backend API to handle user registration, login, logout, authenticated sessions, and protected user information.

## 🚀 Features

- User registration
- User login
- User logout
- Session-based authentication
- Persistent authentication sessions
- Protected authenticated-user endpoint
- Password hashing with bcrypt
- MongoDB database integration
- MongoDB session storage
- TypeScript on both frontend and backend
- RESTful API architecture
- React Router navigation
- Environment variable configuration
- HTTP error handling
- CORS and credential-based requests

## 🛠️ Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS

### Backend
- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- express-session
- connect-mongo
- bcrypt
- http-errors
- dotenv

## 📁 Project Structure

The project is separated into frontend and backend applications.

```text
authentication-project/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   ├── 
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── util/
│   │   └── ...
│   ├── 
│   ├── package.json
│   └── ...
│
└── README.md
```

## 🔐 Authentication Flow

The application uses **server-side sessions** rather than storing authentication tokens in local storage.

### Registration

1. The user submits a username, email, and password.
2. The backend validates the request.
3. The password is securely hashed using `bcrypt`.
4. The user is stored in MongoDB.
5. The frontend receives the appropriate response.

### Login

1. The user submits their username and password.
2. The backend searches MongoDB for the user.
3. The stored password hash is compared with the supplied password using `bcrypt`.
4. A server-side session is created.
5. The user's ID is stored in the session.
6. The session ID is sent to the browser as a cookie.

### Authenticated Requests

For requests that require authentication, the browser sends the session cookie to the backend.

The backend retrieves the user's ID from:

```ts
req.session.userId
```

It can then retrieve the corresponding user from MongoDB.

### Logout

When the user logs out, the backend destroys the active session, and the frontend redirects the user to the login page.

## 🔗 API Endpoints

### Users

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| `POST` | `/api/users/signup` | Create a new account | No |
| `POST` | `/api/users/login` | Authenticate a user | No |
| `GET` | `/api/users` | Get the authenticated user | Yes |
| `POST` | `/api/users/logout` | Log out the current user | Yes |

### Jobs

The application also contains job-related API endpoints:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/jobs` | Get available jobs |
| `GET` | `/api/jobs/:id` | Get a specific job |

## 🔒 Security Considerations

This project follows several important authentication practices:

- Passwords are hashed with `bcrypt`.
- Passwords are never returned in API responses.
- Session data is stored server-side.
- Session data is persisted in MongoDB.
- Authentication cookies are configured with appropriate security attributes.
- Environment variables are used for secrets and database credentials.
- Login requests validate user credentials before creating a session.
- The authenticated-user endpoint verifies the session before returning user data.

For production deployment, additional security measures should be considered, including:

- HTTPS
- Secure cookies
- CSRF protection where appropriate
- Rate limiting
- Strong session secrets
- Input validation
- Security headers
- Production CORS configuration
- Proper database access controls

## 🌱 Development Goals

This project is being developed as a practical full-stack application to strengthen understanding of:

- Full-stack TypeScript development
- REST APIs
- Authentication and authorisation
- HTTP sessions and cookies
- MongoDB and Mongoose
- React frontend architecture
- Frontend/backend integration
- Environment configuration
- Error handling
- Secure credential management

## 🚧 Future Improvements

Potential improvements include:

- Password reset functionality
- Email verification
- OAuth authentication
- Role-based authorisation
- Protected frontend routes
- Improved form validation
- Automated tests
- API documentation
- Rate limiting
- CSRF protection
- Production deployment
- CI/CD
- Improved session management
- User profile management

## 📌 Project Status

**In development**

The core authentication flow is being implemented and integrated between the React frontend and Express backend.

## 📄 License

This project is available for educational and development purposes.
GitHub: `https://github.com/acquah_forever`
