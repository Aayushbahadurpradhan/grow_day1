module.exports = (requiredDepartment) => (req, res, next) => {
  if (req.user.department !== requiredDepartment)
    return res.status(403).json({ error: "Access denied to department" });
  next();
};
