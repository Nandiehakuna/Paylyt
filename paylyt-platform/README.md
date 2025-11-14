# PayLyt Platform

## Overview
PayLyt is a Bitcoin Lightning payment platform designed to facilitate secure transactions between clients and freelancers. The platform ensures that funds are held securely until the job is completed and approved by the client, allowing for instant payment release. Additionally, freelancers have the option to convert their Bitcoin earnings to local currency through Bitnob.

## Project Structure
The project is organized into the following main directories:

- **backend**: Contains the server-side application, including controllers, models, routes, services, middlewares, and utilities.
- **frontend**: Contains the client-side application built with React, including components, pages, hooks, and styles.
- **docs**: Contains documentation files that outline the architecture, API specifications, team roles, and project flow.

## User Journey
1. **Client Posts Job**: The client creates a job with a title, description, amount (in local currency and BTC), deadline, and optional milestones.
2. **Freelancer Accepts Job**: The freelancer reviews the job details and accepts the terms.
3. **Client Pays**: The backend generates a Lightning invoice using the Bitnob API, displaying a QR code or payment link to the client.
4. **Platform Holds Funds**: Upon payment confirmation from Bitnob, the platform records the funds as "held" in the ledger.
5. **Freelancer Completes Work**: The freelancer submits the deliverables through the PayLyt platform.
6. **Client Approves**: The client inspects the work and clicks "Approve Release."
7. **Platform Releases Payment**: The backend calls the Bitnob payout API to release the payment to the freelancer's wallet, or converts it to local currency if requested.
8. **Freelancer Converts/Withdraws**: The freelancer can convert their BTC earnings to fiat currency via Bitnob and withdraw to their bank or mobile money.
9. **Audit & Notifications**: Both parties receive receipts, and all events are logged for auditing purposes.

## Setup Instructions

### Backend
1. Navigate to the `backend` directory.
2. Install dependencies using npm:
   ```
   npm install
   ```
3. Create a `.env` file based on the `.env.example` template and configure your environment variables.
4. Start the backend server:
   ```
   npm start
   ```

### Frontend
1. Navigate to the `frontend` directory.
2. Install dependencies using npm:
   ```
   npm install
   ```
3. Create a `.env` file based on the `.env.example` template and configure your environment variables.
4. Start the frontend application:
   ```
   npm start
   ```

## Documentation
For detailed documentation, please refer to the following files:
- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.md)
- [Architecture Documentation](./docs/architecture.md)
- [API Specifications](./docs/api-spec.md)
- [Team Roles](./docs/team-roles.md)
- [Project Flow](./docs/project-flow.md)

## Team Members
The project team consists of:
- 2 Backend Developers
- 2 Frontend Developers
- 1 AI/ML Specialist
- 1 Cloud Engineer
- 1 UI/UX Designer

## Conclusion
PayLyt aims to streamline the payment process for freelancers and clients while ensuring security and efficiency through the use of Bitcoin Lightning technology. For any questions or contributions, please refer to the documentation or contact the project team.