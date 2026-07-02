AI CRM — Intelligent Sales Pipeline
# aI CRM Dashboard

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-darkgreen?logo=mongodb)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![Gemini](https://img.shields.io/badge/AI-Google%20Gemini-blueviolet)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

A full-stack CRM built with the MERN stack and powered by Google Gemini AI. Manage leads, contacts, tasks, and notes in one workspace — with an AI assistant that surfaces insights, drafts outreach, and answers questions about your pipeline.


##  Screenshots

### Dashboard

![Dashboard](./screenshots/dashboard.jpg)

### Leads

![Leads](./screenshots/leads.jpg)

### Pipeline

![Pipeline](./screenshots/pipeline.jpg)




Features

Pipeline & Lead Management


Kanban-style pipeline with drag-and-drop stage progression
Lead scoring by priority (High / Medium / Low) and weighted deal value
Source tracking — Website, Referral, Cold Outreach, Social, Event
Full-text search and multi-filter across all leads


Contacts


Contact directory with title, company, and tag management
Favourite contacts for quick access
Linked to related leads for full relationship context


Tasks


Task buckets: Overdue, Due Today, Upcoming, Completed
Priority weighting and lead association
Status tracking — Pending → In Progress → Completed


Notes


Rich note-taking linked to individual leads
Pin important notes to the top
Timestamped activity trail per lead


Analytics Dashboard


Pipeline value by stage
Lead source breakdown
Conversion rate tracking
Task completion metrics


AI Assistant (Gemini)


Ask natural-language questions about your pipeline
Generate email drafts and follow-up messages
Summarise lead activity and suggest next steps


Auth


JWT-based authentication with protected routes
Registration, login, and persistent sessions



Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, React Router, Tailwind CSS, Framer Motion |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| AI | Google Gemini API |
| Authentication | JWT |
| Validation | Zod |
| Charts | Recharts |
| Build Tool | Vite |

##Architecture
React
   │
Axios
   │
Express API
   │
Controllers
   │
Services
   │
Models
   │
MongoDB


Project Structure

ai-crm/
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── middleware/
│   │   └── error.middleware.js    # Centralised error handler
│   │   └── auth.middleware.js    # Centralised error handler
│   ├── models/
│   │   ├── User.js
│   │   ├── Lead.js
│   │   ├── Contact.js
│   │   ├── Note.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.route.js
│   │   ├── lead.routes.js
│   │   ├── contact.route.js
│   │   ├── note.route.js
│   │   ├── task.route.js
│   │   ├── ai.route.js
│   │   └── analytics.route.js
|   |---services/
|   |     |--ai.services.js
│   ├── seed.js                    # Database seeder (demo data)
│   └── index.js                   # Express entry point
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── layout/
    │   │       ├── AppLayout.jsx
    │   │       └── ProtectedRoute.jsx
    │   ├── pages/
    │   │   ├── auth/
    │   │   │   ├── Login.jsx
    │   │   │   └── Register.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── Leads.jsx
    │   │   ├── Contacts.jsx
    │   │   ├── Pipeline.jsx
    │   │   ├── Notes.jsx
    │   │   ├── Tasks.jsx
    │   │   └── Settings.jsx
    │   └── App.jsx
    └── index.html

##  Security

- Password hashing with bcrypt
- JWT Authentication
- Protected Routes
- Zod Input Validation
- Centralized Error Handling
- Mongoose Schema Validation

Getting Started

Prerequisites


Node.js 18+
MongoDB (local or Atlas free tier)
Google Gemini API key (get one free)


1. Clone the repository

bashgit clone https://github.com/Ali-eng-git/AI-CRM-Dashboard-App
cd ai-crm

2. Set up environment variables

Create a .env file inside backend/:

envPORT=8100
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
CLIENT_URL=http://localhost:5173
NODE_ENV=development

3. Install dependencies

bash# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install

4. Seed the database (optional)

Populate the database with realistic demo data — 40 leads, 26 contacts, 22 notes, and 28 tasks across varied pipeline stages.

bashcd backend
node seed.js

Demo login after seeding:

Email:    test@email.com
Password: 123456

5. Run the app

bash# In one terminal — backend
cd backend && npm run dev

# In another terminal — frontend
cd frontend && npm run dev

Open http://localhost:5173


API Reference

Base URL: http://localhost:7000/api

## 📡 API Endpoints

All endpoints (except **Register** and **Login**) require a valid JWT token in the `Authorization` header.

```http
Authorization: Bearer <your_jwt_token>
```

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/health` | Health check endpoint | ❌ |
| POST | `/api/auth/register` | Register a new user | ❌ |
| POST | `/api/auth/login` | Login and receive a JWT | ❌ |
| GET | `/api/auth/me` | Get current authenticated user | ✅ |
| PUT | `/api/auth/profile` | Update user profile | ✅ |
| GET | `/api/leads` | Get all leads | ✅ |
| POST | `/api/leads` | Create a new lead | ✅ |
| GET | `/api/leads/:id` | Get a single lead | ✅ |
| PUT | `/api/leads/:id` | Update a lead | ✅ |
| DELETE | `/api/leads/:id` | Delete a lead | ✅ |
| PATCH | `/api/leads/reorder` | Reorder leads in the sales pipeline | ✅ |
| GET | `/api/contacts` | Get all contacts | ✅ |
| POST | `/api/contacts` | Create a new contact | ✅ |
| GET | `/api/contacts/:id` | Get a single contact | ✅ |
| PUT | `/api/contacts/:id` | Update a contact | ✅ |
| DELETE | `/api/contacts/:id` | Delete a contact | ✅ |
| GET | `/api/notes` | Get all notes | ✅ |
| POST | `/api/notes` | Create a new note | ✅ |
| PUT | `/api/notes/:id` | Update a note | ✅ |
| DELETE | `/api/notes/:id` | Delete a note | ✅ |
| GET | `/api/tasks` | Get all tasks | ✅ |
| POST | `/api/tasks` | Create a new task | ✅ |
| PUT | `/api/tasks/:id` | Update a task | ✅ |
| DELETE | `/api/tasks/:id` | Delete a task | ✅ |
| GET | `/api/ai/status` | Check AI service status | ✅ |
| POST | `/api/ai/lead-summary` | Generate AI summary for a lead | ✅ |
| POST | `/api/ai/generate-email` | Generate an AI sales email draft | ✅ |
| POST | `/api/ai/sales-insights` | Generate AI-powered sales insights | ✅ |
| GET | `/api/analytics/overview` | Get CRM dashboard analytics | ✅ |

---

## 🔐 Authentication

Protected endpoints require a JWT access token.

Example:

```http
GET /api/leads
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

---

## 📊 Response Format

Successful responses:

```json
{
  "success": true,
  "data": {}
}
```

Error responses:

```json
{
  "success": false,
  "message": "Error message"
}
```

All protected routes require an Authorization: Bearer <token> header.


Environment Variables

VariableDescriptionPORTPort the Express server runs on (default: 8100)MONGO_URIMongoDB connection stringJWT_SECRETSecret key for signing JWTsGEMINI_API_KEYGoogle Gemini API keyCLIENT_URLFrontend origin for CORS (default: http://localhost:5173)NODE_ENVdevelopment or production


Author

Ali — @Ali-eng-git
