const featureCAP = {
  login: "CA - Consistency and Availability (must not let inconsistent login states happen)",
  payrollUpdate: "CP - Consistency and Partition Tolerance (no updates during partition)",
  socialFeed: "AP - Availability and Partition Tolerance (ok to show stale data)"
};

module.exports = featureCAP;
