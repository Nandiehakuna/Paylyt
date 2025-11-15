"use strict";
const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const auth = require('../middlewares/auth');
// Freelancer applies to a job
router.post('/:id/apply', auth, jobController.applyToJob);
// Get applications for a job
router.get('/:id/applications', auth, jobController.getApplicationsForJob);
// Freelancer views all jobs
router.get('/', auth, jobController.getAllJobs);
// Get job details
router.get('/:id', auth, jobController.getJobById);
// Client posts a job
router.post('/', auth, jobController.createJob);
// Freelancer accepts a job
router.post('/:id/accept', auth, jobController.acceptJob);
// Create Bitnob Lightning invoice for payment
router.post('/:id/invoice', auth, jobController.createInvoice);
// Freelancer submits deliverable
router.post('/:id/complete', auth, jobController.completeJob);
// Client approves work
router.post('/:id/approve', auth, jobController.approveJob);
// Release payment to freelancer
router.post('/:id/release', auth, jobController.releasePayment);
// Get job status
router.get('/:id/status', auth, jobController.getJobStatus);
module.exports = router;
