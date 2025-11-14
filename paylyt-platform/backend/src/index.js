require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./utils/db');

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
const Application = require('./models/Application');
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('SQLite/Sequelize connection error:', err);
});