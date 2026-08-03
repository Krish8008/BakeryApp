
const express = require("express");

const router = express.Router();
const {protect} = require("../middleware/authMiddleware");
const chatController = require("../controllers/chatController");

router.post("/", protect, chatController.chat);
//router.post("/", chatController.chat);

router.get("/history", protect,  chatController.getHistoryy);
//router.get("/history",  chatController.getHistoryy);

module.exports = router;
