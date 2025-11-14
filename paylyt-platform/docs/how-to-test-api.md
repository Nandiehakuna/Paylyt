# How to Test the API

## Prerequisites
- Node.js and npm installed
- Backend server running (`npm start` in `backend` directory)
- Postman or any API client

## 1. Register Users
### Register a Client
POST http://localhost:5000/api/auth/register
```
{
  "name": "Client Example",
  "email": "client@example.com",
  "password": "yourpassword",
  "role": "client"
}
```
### Register a Freelancer
POST http://localhost:5000/api/auth/register
```
{
  "name": "Freelancer Example",
  "email": "freelancer@example.com",
  "password": "yourpassword",
  "role": "freelancer"
}
```

## 2. Login
POST http://localhost:5000/api/auth/login
```
{
  "email": "freelancer@example.com",
  "password": "yourpassword"
}
```
- Copy the `token` from the response for authenticated requests.

## 3. Create a Job (Client)
POST http://localhost:5000/api/jobs
- Headers: `Authorization: Bearer CLIENT_TOKEN`
```
{
  "title": "Sample Job",
  "description": "This is a test job.",
  "amount_fiat": 100,
  "amount_btc": 0.001,
  "deadline": "2025-12-01",
  "milestones": []
}
```

## 4. View Jobs (Freelancer)
GET http://localhost:5000/api/jobs
- Headers: `Authorization: Bearer FREELANCER_TOKEN`

## 5. Apply to a Job (Freelancer)
POST http://localhost:5000/api/jobs/{jobId}/apply
- Headers: `Authorization: Bearer FREELANCER_TOKEN`
```
{
  "proposal": "I am interested in this job."
}
```

## 6. Accept, Complete, Approve, and Release Payment
- Use the relevant endpoints as described in the API routes.
- Always include the correct Authorization token.

## Notes
- Replace `{jobId}` with the actual job ID from the jobs list.
- All requests and responses are JSON.
- For payment and payout, Bitnob API is integrated (see backend/services/bitnobService.js).

---
For more details, see the backend code and controllers.
