const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  organDetailsController,
} = require("../controllers/analyticsController");

const router = express.Router();

//routes

// GET organ-data
router.get("/organs-data", authMiddleware, organDetailsController);

module.exports = router;
