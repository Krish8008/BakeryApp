const crypto = require("crypto");
const razorpay = require("../config/razorpay");

const Booking = require("../models/Booking");
const Cake = require("../models/product");

// Create Razorpay Order
module.exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Verify Payment & Create Booking
module.exports.verifyPayment = async (req, res) => {
  try {

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,

      cakeId,
      quantity,
      deliveryAddress,
      phone,
      deliveryDate,

    } = req.body;

    // Verify Signature
    const generatedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(
        razorpay_order_id + "|" + razorpay_payment_id
      )
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment Verification Failed",
      });
    }

    // Find Cake
    const cake = await Cake.findById(cakeId);

    if (!cake) {
      return res.status(404).json({
        success: false,
        message: "Cake not found",
      });
    }

    const totalPrice = cake.price * quantity;

    // Create Booking
    const booking = await Booking.create({
      user: req.user._id,

      cake: cakeId,

      quantity,

      totalPrice,

      deliveryAddress,

      phone,

      deliveryDate,

      paymentStatus: "Paid",

      razorpayOrderId: razorpay_order_id,

      razorpayPaymentId: razorpay_payment_id,

      paymentSignature: razorpay_signature,
    });

    res.status(201).json({
      success: true,
      message: "Payment Verified & Booking Created",
      booking,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};