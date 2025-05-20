const express = require("express");
const {
  getAllClients,
  addClient,
  getClientById,
} = require("../controllers/clientController");

const router = express.Router();

router.get("/", getAllClients);
router.post("/", addClient);
router.get("/:id", getClientById);

module.exports = router;
