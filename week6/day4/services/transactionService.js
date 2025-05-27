const mongoose = require('mongoose');

async function runTransaction(taskFn) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const result = await taskFn(session);
    await session.commitTransaction();
    session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
}

module.exports = runTransaction;
