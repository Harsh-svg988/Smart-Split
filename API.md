# SmartSplit API Documentation

## Authentication Service (Port 3001)

### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "message": "User created successfully",
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "message": "Login successful",
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

## Expense Service (Port 3002)

### Get All Expenses
```http
GET /api/expenses
Authorization: Bearer jwt_token
```

Response:
```json
[
  {
    "id": "expense_id",
    "userId": "user_id",
    "amount": 50.00,
    "description": "Grocery shopping",
    "category": "Food",
    "date": "2024-03-10T00:00:00.000Z",
    "createdAt": "2024-03-10T00:00:00.000Z"
  }
]
```

### Create Expense
```http
POST /api/expenses
Authorization: Bearer jwt_token
Content-Type: application/json

{
  "amount": 50.00,
  "description": "Grocery shopping",
  "category": "Food",
  "date": "2024-03-10"
}
```

Response:
```json
{
  "id": "expense_id",
  "userId": "user_id",
  "amount": 50.00,
  "description": "Grocery shopping",
  "category": "Food",
  "date": "2024-03-10T00:00:00.000Z",
  "createdAt": "2024-03-10T00:00:00.000Z"
}
```

### Update Expense
```http
PUT /api/expenses/:id
Authorization: Bearer jwt_token
Content-Type: application/json

{
  "amount": 55.00,
  "description": "Updated grocery shopping",
  "category": "Food",
  "date": "2024-03-10"
}
```

Response:
```json
{
  "id": "expense_id",
  "userId": "user_id",
  "amount": 55.00,
  "description": "Updated grocery shopping",
  "category": "Food",
  "date": "2024-03-10T00:00:00.000Z",
  "createdAt": "2024-03-10T00:00:00.000Z"
}
```

### Delete Expense
```http
DELETE /api/expenses/:id
Authorization: Bearer jwt_token
```

Response:
```json
{
  "message": "Expense deleted successfully"
}
```

## Report Service (Port 3003)

### Get Monthly Summary
```http
GET /api/reports/monthly?month=3&year=2024
Authorization: Bearer jwt_token
```

Response:
```json
{
  "total": 1500.00,
  "byCategory": {
    "Food": 500.00,
    "Transport": 300.00,
    "Housing": 700.00
  }
}
```

### Get Category Breakdown
```http
GET /api/reports/categories?startDate=2024-03-01&endDate=2024-03-31
Authorization: Bearer jwt_token
```

Response:
```json
{
  "Food": 500.00,
  "Transport": 300.00,
  "Housing": 700.00,
  "Entertainment": 200.00,
  "Shopping": 400.00,
  "Utilities": 300.00,
  "Other": 100.00
}
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "message": "Invalid request data"
}
```

### 401 Unauthorized
```json
{
  "message": "Please authenticate"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Error message",
  "error": "Error details"
}
``` 