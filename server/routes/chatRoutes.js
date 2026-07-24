
const express = require("express");

const router = express.Router();
const {protect} = require("../middleware/authMiddleware");
const chatController = require("../controllers/chatController");

router.post("/", protect, chatController.chat);

router.get("/history", protect,  chatController.getHistoryy);

module.exports = router;
