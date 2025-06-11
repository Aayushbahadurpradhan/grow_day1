const express = require('express');
const app = express();
const connectReplicaSet = require('./config/mongoReplica');
const jobRoutes = require('./routes/jobRoutes');

app.use(express.json());
app.use('/api', jobRoutes);

connectReplicaSet().then(() => {
  app.listen(3000, () => console.log("Server running on http://localhost:3000"));
});
