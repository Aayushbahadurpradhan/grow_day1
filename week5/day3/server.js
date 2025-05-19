const express = require('express');
const clientRoutes = require('./src/routes/clientRoutes');

const app = express();
app.use(express.json());

app.use('/client', clientRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
