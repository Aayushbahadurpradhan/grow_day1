const { MongoMemoryReplSet } = require('mongodb-memory-server');
const mongoose = require('mongoose');

const connectReplicaSet = async () => {
  const replSet = await MongoMemoryReplSet.create({
    replSet: { count: 3, storageEngine: 'wiredTiger' }
  });
  const uri = replSet.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("Connected to in-memory Mongo replica set.");
};

module.exports = connectReplicaSet;
