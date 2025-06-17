const express = require('express');
const cors = require('cors');
const corsMiddleware = require('./middlewares/corsConfig');
require('dotenv').config();


const app = express();

app.use(corsMiddleware);

app.use(express.json());

app.use('/api/check-cors', require('./routes/corsRoutes'));
app.use('/api/weather', require('./routes/weatherRoutes'));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
