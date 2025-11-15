require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./utils/db');

// Import models
const User = require('./models/User');
const Profile = require('./models/Profile');
const Job = require('./models/Job');
const Application = require('./models/Application');
const Invoice = require('./models/Invoice');
const Ledger = require('./models/Ledger');

// Define associations
User.hasOne(Profile, { foreignKey: 'user_id' });
Profile.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Job, { as: 'ClientJobs', foreignKey: 'client_id' });
Job.belongsTo(User, { as: 'Client', foreignKey: 'client_id' });

User.hasMany(Job, { as: 'FreelancerJobs', foreignKey: 'freelancer_id' });
Job.belongsTo(User, { as: 'Freelancer', foreignKey: 'freelancer_id' });

Job.hasMany(Application, { foreignKey: 'job_id' });
Application.belongsTo(Job, { foreignKey: 'job_id' });

User.hasMany(Application, { foreignKey: 'freelancer_id' });
Application.belongsTo(User, { foreignKey: 'freelancer_id' });

Job.hasMany(Invoice, { foreignKey: 'job_id' });
Invoice.belongsTo(Job, { foreignKey: 'job_id' });

// Import routes
const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobs');
const paymentRoutes = require('./routes/payments');
const webhookRoutes = require('./routes/webhooks');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('PayLyt Backend Running'));

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/webhooks', webhookRoutes);

const PORT = process.env.PORT || 5000;

// Sync all models and start the server
sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('Database Sync Error:', err);
});
