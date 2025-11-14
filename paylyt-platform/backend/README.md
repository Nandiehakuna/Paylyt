# PayLyt Backend Documentation

## Overview

PayLyt is a Bitcoin Lightning payment platform designed to facilitate secure transactions between clients and freelancers. The platform ensures that funds are held securely until the job is completed and approved by the client, allowing for instant payment release. Additionally, freelancers have the option to convert their Bitcoin earnings to local currency through Bitnob.

## Project Structure

The backend of the PayLyt platform is organized into several key directories, each serving a specific purpose:

- **src/controllers**: Contains controller files that manage incoming requests and responses for various routes, handling the business logic for job postings, payments, and user interactions.
  
- **src/models**: Includes model files that define the data structures for jobs, invoices, users, and other entities, typically using an ORM for database interactions.
  
- **src/routes**: Contains route files that define the API endpoints, mapping HTTP requests to the appropriate controller functions.
  
- **src/services**: Includes service files that encapsulate core business logic, such as payment processing, invoice management, and user authentication.
  
- **src/middlewares**: Contains middleware functions for tasks such as authentication, logging, and request validation before reaching the route handlers.
  
- **src/utils**: Includes utility functions and helpers that can be reused across the application, such as formatting functions and error handling.

- **tests**: Contains test files for unit and integration tests, ensuring the functionality of the backend components.

## Setup Instructions

1. **Clone the Repository**: 
   ```
   git clone <repository-url>
   cd paylyt-platform/backend
   ```

2. **Install Dependencies**: 
   ```
   npm install
   ```

3. **Environment Variables**: 
   Copy the `.env.example` file to `.env` and fill in the required environment variables, such as database connection strings and API keys.

4. **Run the Application**: 
   ```
   npm start
   ```

5. **Testing**: 
   To run tests, use:
   ```
   npm test
   ```

## API Usage

The backend exposes several API endpoints to interact with the PayLyt platform. Key endpoints include:

- **User Authentication**: 
  - `POST /auth/register`: Register a new user.
  - `POST /auth/login`: Log in an existing user.

- **Job Management**: 
  - `POST /jobs`: Create a new job.
  - `GET /jobs/:id/status`: Retrieve the current status of a job.

- **Payment Processing**: 
  - `POST /jobs/:id/invoice`: Create a Lightning invoice.
  - `POST /jobs/:id/approve`: Approve the completed job.
  - `POST /jobs/:id/release`: Release payment to the freelancer.

## Project Flow

1. **Client Posts Job**: The client creates a job with details such as title, description, amount, and deadline.
2. **Freelancer Accepts Job**: The freelancer reviews the job and accepts the terms.
3. **Client Pays**: The backend generates a Lightning invoice, and the client pays.
4. **PayLyt Holds the Money**: Upon payment confirmation, PayLyt holds the funds securely.
5. **Freelancer Completes Job**: The freelancer submits the deliverables.
6. **Client Approves**: The client inspects the work and approves it.
7. **PayLyt Releases Payment**: The backend releases the payment instantly to the freelancer, who can then convert Bitcoin to local currency.

## Conclusion

This README provides a high-level overview of the backend setup for the PayLyt platform. For more detailed documentation, please refer to the API specifications and architecture documents located in the `docs` directory.