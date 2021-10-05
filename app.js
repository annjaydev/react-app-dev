require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/routes');
const config = require('config');

const app = express();
const mongoUri = process.env.MONGO_URI;
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use('/', apiRoutes);

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(res => console.log('DB has been connected'))
  .catch(e => console.log('DB connection problems: ', e.message));

app.listen(port, () => {
  console.log(`App has been started on port ${port}...`);
});


