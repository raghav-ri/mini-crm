# AI-Native Mini CRM

An AI-powered Customer Relationship Management (CRM) application that helps businesses manage customer segments, campaigns, analytics, and AI-generated audience targeting. The application allows users to create customer segments, launch campaigns, and leverage AI to generate audience filters automatically.

---

## Features

### Customer Management

* Store and manage customer information.
* View customer records and associated segments.
* Maintain customer engagement history.

### Segment Management

* Create audience segments using custom rules.
* Dynamic filtering based on customer attributes.
* AI-powered segment generation using Google Gemini AI.

### Campaign Management

* Create and manage marketing campaigns.
* Associate campaigns with customer segments.
* Track campaign creation history.

### Analytics Dashboard

* Customer insights and statistics.
* Segment-wise analysis.
* Campaign performance overview.

### AI Integration

* Natural language audience generation.
* Converts business requirements into structured segmentation rules.
* Powered by Google Gemini API.

---

## Tech Stack

### Frontend

* React.js
* Vite
* Axios
* React Router
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL
* Prisma ORM

### AI Services

* Google Gemini API

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: PostgreSQL (Neon/Supabase)

---

## Project Structure

```bash
mini-crm/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   │
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middlewares/
│   │   └── utils/
│   │
│   ├── app.js
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## Environment Variables

### Backend (.env)

```env
PORT=5000
NODE_ENV=development

CLIENT_URL=http://localhost:5173

DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"

GEMINI_API_KEY=your_gemini_api_key_here

CHANNEL_SERVICE_URL=http://localhost:5001
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd mini-crm
```

### Backend Setup

```bash
cd backend

npm install

npx prisma generate

npx prisma migrate dev

npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

## API Endpoints

### Health Check

```http
GET /api/health
```

Response:

```json
{
  "success": true,
  "message": "Backend Healthy"
}
```

### Segments

```http
GET    /api/segments
POST   /api/segments
DELETE /api/segments/:id
```

### Campaigns

```http
GET    /api/campaigns
POST   /api/campaigns
```

### Analytics

```http
GET /api/analytics
```

### AI Segment Generator

```http
POST /api/ai/generate-segment
```

Example Request:

```json
{
  "prompt": "Customers from Punjab who purchased more than 5 times"
}
```

---

## Database Schema Overview

### Customer

```text
id
name
email
phone
city
totalSpent
orderCount
createdAt
```

### Segment

```text
id
name
rules
createdAt
```

### Campaign

```text
id
name
message
channel
segmentId
createdAt
```

---

## Future Improvements

* Authentication and authorization.
* Campaign delivery tracking.
* Real-time notifications.
* Customer activity timeline.
* Advanced analytics dashboards.
* Multi-user workspace support.
* Email and SMS integration.
* AI-powered campaign suggestions.

---

## Learning Outcomes

This project demonstrates:

* Full Stack Development using React and Express.
* REST API design.
* PostgreSQL database management.
* Prisma ORM usage.
* AI integration with Google Gemini.
* Frontend-backend communication.
* Deployment on modern cloud platforms.

---

## Author
Raghav Issar

