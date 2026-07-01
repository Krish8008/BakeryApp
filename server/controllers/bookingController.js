const Booking = require("../models/Booking");
const Cake = require("../models/product");

// Create Booking
const createBooking = async (req, res) => {
  try {
    const {
      cakeId,
      quantity,
      deliveryAddress,
      phone,
      deliveryDate,
    } = req.body;

    // Check Cake
    const cake = await Cake.findById(cakeId);

    if (!cake) {
      return res.status(404).json({
        success: false,
        message: "Cake not found",
      });
    }

    // Calculate Total Price
    const totalPrice = cake.price * quantity;

    // Create Booking
    const booking = await Booking.create({
      user: req.user.id,
      cake: cakeId,
      quantity,
      totalPrice,
      deliveryAddress,
      phone,
      deliveryDate,
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Logged-in User Bookings
const getMyBookings = async (req, res) => {
  try {
    
    const bookings = await Booking.find({
      user: req.user._id,
    }).populate("cake");

    res.status(200).json({
      success: true,
      bookings,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Booking
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("cake")
      .populate("user");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Only Owner or Admin
    if (
      booking.user._id.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Cancel Booking
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Only Owner
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Can cancel only Pending Order
    if (booking.orderStatus !== "Pending") {
      return res.status(400).json({
        success: false,
        message: "Order cannot be cancelled",
      });
    }

    booking.orderStatus = "Cancelled";

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin - Get All Bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("cake")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin - Update Order Status
const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    booking.orderStatus = orderStatus;

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
  getAllBookings,
  updateOrderStatus,
};