# Project Flow for PayLyt Platform

## Overview
The PayLyt platform facilitates secure Bitcoin Lightning payments between clients and freelancers. The following outlines the user journey and core functionalities of the platform.

## User Journey

1. **Client Posts Job**
   - The client creates a job by providing:
     - Title
     - Description
     - Amount (displayed in local currency and BTC equivalent)
     - Deadline
     - Milestones (optional)

2. **Freelancer Accepts Job**
   - The freelancer views the job details and accepts the terms of the job.

3. **Client Pays**
   - Upon job acceptance, the client initiates payment.
   - The backend generates a Lightning invoice using the Bitnob API.
   - A QR code or payment link is displayed for the client to complete the payment.

4. **Platform Holds Funds**
   - Once Bitnob confirms the payment, the platform records the payment in a "paid_locked" state.
   - The funds are securely held in the platform's ledger until the job is completed and approved.

5. **Freelancer Completes Work**
   - The freelancer submits the deliverables through the PayLyt platform.

6. **Client Approves Work**
   - The client reviews the submitted work and clicks "Approve Release."

7. **Platform Releases Payment**
   - After client approval, the backend calls the Bitnob payout API to release the payment to the freelancer's wallet.
   - If the freelancer opts, the payment can be converted to local currency before release.

8. **Freelancer Converts/Withdraws Funds**
   - The freelancer has the option to convert BTC to fiat currency via Bitnob and withdraw the funds to their mobile money or bank account.

9. **Audit & Notifications**
   - Both parties receive receipts for the transaction.
   - The admin logs all events for auditing purposes.

## Flow Summary
- **Client Pay** → 
- **PayLyt Holds the Money** → 
- **Freelancer Finishes the Job** → 
- **Client Approves** → 
- **PayLyt Releases Payment Instantly** → 
- **Freelancer Can Convert Bitcoin to Local Currency or Withdraw** 

This flow ensures a secure and efficient transaction process, enhancing trust and transparency between clients and freelancers.