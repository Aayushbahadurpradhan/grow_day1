const fs = require('fs-extra');

exports.readJsonFile = async (filePath) => {
  try {
    return await fs.readJson(filePath);
  } catch {
    return [];
  }
};

exports.writeJsonFile = async (filePath, data) => {
  try {
    await fs.writeJson(filePath, data, { spaces: 2 });
    return true;
  } catch (error) {
    console.error(`Error writing to ${filePath}:`, error);
    return false;
  }
};
