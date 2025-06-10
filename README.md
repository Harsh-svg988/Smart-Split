# SmartSplit - Expense & Budget Tracker

A personal finance web application that helps users track expenses, manage budgets, and split bills with others.

## Features

- User Authentication
- Expense Tracking
- Budget Management
- Analytics & Reports
- Bill Splitting
- Monthly Reports

## Tech Stack

### Frontend
- React + Vite
- Tailwind CSS
- Chart.js for visualizations

### Backend
- Node.js + Express
- MongoDB
- JWT Authentication
- Microservices Architecture

## Project Structure

```
smartsplit/
├── frontend/          # React + Vite frontend
├── backend/           # Node.js microservices
│   ├── auth-service/  # Authentication service
│   ├── expense-service/ # Expense management service
│   └── report-service/  # Analytics and reporting service
└── README.md
```

## Setup Instructions

### Backend Setup
1. Navigate to backend directory
2. Install dependencies: `npm install`
3. Set up environment variables
4. Start services: `npm run dev`

### Frontend Setup
1. Navigate to frontend directory
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`

## Environment Variables

Create `.env` files in each backend service with the following variables:

```
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```



