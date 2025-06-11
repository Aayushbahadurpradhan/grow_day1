const simulateNetworkPartition = (duration = 5000) => {
  console.log(`[WARN] Simulating network partition for ${duration}ms...`);
  return new Promise(resolve => setTimeout(() => {
    console.log("[INFO] Partition resolved.");
    resolve();
  }, duration));
};

module.exports = { simulateNetworkPartition };
