require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./modules/routes/authRoutes');
const appointmentRoutes = require('./modules/routes/appointmentsRoutes');

const app = express();
const mongoUri = process.env.MONGO_URI;
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/appointments', appointmentRoutes);

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(res => console.log('DB has been connected'))
  .catch(e => console.log('DB connection problems: ', e.message));

app.listen(port, () => {
  console.log(`App has been started on port ${port}...`);
});


