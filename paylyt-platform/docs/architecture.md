# PayLyt Platform Architecture

## Overview
The PayLyt platform is designed as a Bitcoin Lightning payment solution that facilitates secure transactions between clients and freelancers. The architecture is built to ensure seamless interactions, efficient payment processing, and robust security measures.

## Components

### 1. Frontend
- **Technology**: React with Bootstrap
- **Responsibilities**:
  - User interface for clients and freelancers.
  - Job posting and management.
  - Payment processing interface with QR code generation.
  - Dashboard for freelancers to manage their jobs and payments.
  - Admin panel for overseeing platform activities.

### 2. Backend
- **Technology**: Node.js with Express
- **Responsibilities**:
  - API server handling requests from the frontend.
  - Integration with Bitnob for payment processing and wallet management.
  - Business logic for job postings, payment holds, and releases.
  - Webhook handling for payment confirmations.
  - Database interactions for storing user, job, and transaction data.

### 3. Database
- **Technology**: PostgreSQL
- **Responsibilities**:
  - Persistent storage for users, jobs, invoices, and transaction logs.
  - Support for complex queries and data relationships.
  - Audit logging for all financial transactions.

### 4. Bitnob API
- **Responsibilities**:
  - Creation of Lightning invoices.
  - Handling payment confirmations via webhooks.
  - Facilitating payouts to freelancers and currency conversions.

### 5. Lightning Network
- **Responsibilities**:
  - Payment rails for fast and secure Bitcoin transactions.
  - Integration with Bitnob for seamless payment processing.

### 6. Admin Dashboard
- **Responsibilities**:
  - Manual overrides for payment disputes.
  - Monitoring of platform activities and user interactions.
  - Access to audit logs for compliance and security.

## Data Flow
1. **Client Posts Job**: The client creates a job with details such as title, description, amount, and deadline.
2. **Freelancer Accepts Job**: The freelancer reviews the job and accepts the terms.
3. **Client Pays**: The backend generates a Lightning invoice via the Bitnob API and presents it to the client.
4. **PayLyt Holds the Money**: Upon payment confirmation from Bitnob, the funds are marked as "held" in the system.
5. **Freelancer Completes Job**: The freelancer submits the deliverables through the platform.
6. **Client Approves**: The client reviews the work and approves the release of payment.
7. **PayLyt Releases Payment**: The backend processes the payout to the freelancer's wallet or converts it to local currency as requested.
8. **Freelancer Converts/Withdraws**: The freelancer can convert their Bitcoin to local currency or withdraw funds to their bank/mobile money.

## Security Measures
- Use of HMAC verification for webhook authenticity.
- JWT authentication for secure user sessions.
- Database transactions to prevent race conditions during payment holds and releases.
- Audit logs for tracking all financial actions and user interactions.

## Conclusion
The architecture of the PayLyt platform is designed to provide a secure, efficient, and user-friendly experience for both clients and freelancers. By leveraging modern technologies and best practices, the platform aims to facilitate seamless Bitcoin transactions while ensuring compliance and security.