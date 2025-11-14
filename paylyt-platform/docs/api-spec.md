# API Specification for PayLyt Platform

## Overview
This document outlines the API endpoints for the PayLyt platform, detailing the request and response formats, as well as the expected behaviors for each endpoint. The PayLyt platform facilitates Bitcoin Lightning payments for freelance jobs, ensuring secure transactions between clients and freelancers.

## Base URL
The base URL for the API is:
```
http://localhost:3000/api
```

## Authentication
All sensitive endpoints require JWT authentication. Ensure to include the token in the Authorization header as follows:
```
Authorization: Bearer <token>
```

## Endpoints

### User Authentication

#### Register User
- **POST** `/auth/register`
- **Request Body**:
  - `username`: string
  - `email`: string
  - `password`: string
- **Response**:
  - `201 Created`: User registered successfully.
  - `400 Bad Request`: Validation errors.

#### Login User
- **POST** `/auth/login`
- **Request Body**:
  - `email`: string
  - `password`: string
- **Response**:
  - `200 OK`: Returns user details and JWT token.
  - `401 Unauthorized`: Invalid credentials.

### Job Management

#### Create Job
- **POST** `/jobs`
- **Request Body**:
  - `title`: string
  - `description`: string
  - `amount_fiat`: number
  - `amount_btc`: number
  - `deadline`: string (ISO 8601 date)
  - `milestones`: array (optional)
- **Response**:
  - `201 Created`: Job created successfully.
  - `400 Bad Request`: Validation errors.

#### Get Job Status
- **GET** `/jobs/:id/status`
- **Response**:
  - `200 OK`: Returns current job status.
  - `404 Not Found`: Job not found.

### Payment Management

#### Create Invoice
- **POST** `/jobs/:id/invoice`
- **Response**:
  - `201 Created`: Returns payment_request and QR code.
  - `404 Not Found`: Job not found.

#### Webhook for Invoice Payment
- **POST** `/webhooks/bitnob`
- **Request Body**:
  - `invoice_id`: string
  - `status`: string
- **Response**:
  - `200 OK`: Acknowledges receipt of webhook.
  - `400 Bad Request`: Invalid data.

### Job Completion and Payment Release

#### Submit Deliverable
- **POST** `/jobs/:id/complete`
- **Response**:
  - `200 OK`: Deliverable submitted successfully.
  - `404 Not Found`: Job not found.

#### Approve Job
- **POST** `/jobs/:id/approve`
- **Response**:
  - `200 OK`: Job approved successfully.
  - `404 Not Found`: Job not found.

#### Release Payment
- **POST** `/jobs/:id/release`
- **Response**:
  - `200 OK`: Payment released successfully.
  - `404 Not Found`: Job not found.

### Wallet Management

#### Convert BTC to Fiat
- **POST** `/wallet/convert`
- **Request Body**:
  - `amount_btc`: number
  - `target_currency`: string
- **Response**:
  - `200 OK`: Returns conversion rate and status.
  - `400 Bad Request`: Validation errors.

#### Withdraw Funds
- **POST** `/wallet/withdraw`
- **Request Body**:
  - `amount_fiat`: number
- **Response**:
  - `200 OK`: Withdrawal processed successfully.
  - `400 Bad Request`: Validation errors.

## Error Handling
All endpoints will return appropriate HTTP status codes and error messages in the response body for any issues encountered.

## Conclusion
This API specification serves as a guide for developers to implement and interact with the PayLyt platform's backend services. Ensure to follow the defined request and response formats for seamless integration.