const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

const {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
  getAllBookings,
  updateOrderStatus,
} = require("../controllers/bookingController");


// =======================
// Customer Routes
// =======================

// Create Booking
// POST /api/bookings
router.post("/", protect, createBooking);

// Get Logged-in User's Bookings
// GET /api/bookings/my
router.get("/my", protect, getMyBookings);

// Get All Bookings
// GET /api/bookings/all
router.get("/all", protect, adminOnly, getAllBookings);

// Get Single Booking
// GET /api/bookings/:id
router.get("/:id", protect, getBookingById);

// Cancel Booking
// PUT /api/bookings/:id/cancel
router.put("/:id/cancel", protect, cancelBooking);


// =======================
// Admin Routes
// =======================



// Update Booking Status
// PUT /api/bookings/:id/status
router.put("/:id/status", protect, adminOnly, updateOrderStatus);

module.exports = router;