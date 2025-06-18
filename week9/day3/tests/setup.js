const mongoose = require('mongoose');
const { MongoMemoryReplSet } = require('mongodb-memory-server');

let mongo;

beforeAll(async () => {
  mongo = await MongoMemoryReplSet.create({
    replSet: { count: 1 }, 
  });
  const uri = mongo.getUri();
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
  });
});

afterEach(async () => {
  const db = mongoose.connection.db;
  if (!db) return;
  const collections = await db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  }

  if (mongo) {
    await mongo.stop();
  }
});
