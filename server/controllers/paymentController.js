const crypto = require("crypto");
const razorpay = require("../config/razorpay");

const Booking = require("../models/Booking");
const Cake = require("../models/product");

// Create Razorpay Order
module.exports.createOrder = async (req, res) => {
  try {
    const { cakeId, quantity } = req.body;
    const numericQuantity = Number(quantity);

    if (!cakeId || !Number.isInteger(numericQuantity) || numericQuantity < 1 || numericQuantity > 20) {
      return res.status(400).json({ success: false, message: "Please select a valid cake quantity." });
    }

    const cake = await Cake.findById(cakeId);
    if (!cake || !cake.available) {
      return res.status(404).json({ success: false, message: "This cake is no longer available." });
    }

    // Ensure Razorpay is configured
    if (!razorpay) {
      return res.status(500).json({
        success: false,
        message:
          "Razorpay is not configured on the server. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in environment variables.",
      });
    }

    const options = {
      // Price is always calculated from the product record, never from browser input.
      amount: Math.round(cake.price * numericQuantity * 100),
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    //console.log("order - ", order);

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

    // Ensure Razorpay secret is configured for signature verification
    if (!process.env.RAZORPAY_KEY_SECRET) {
      return res.status(500).json({
        success: false,
        message:
          "Razorpay secret is not configured on the server. Please set RAZORPAY_KEY_SECRET in environment variables.",
      });
    }

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

    const numericQuantity = Number(quantity);
    const phoneValue = String(phone || "").trim();
    const address = String(deliveryAddress || "").trim();
    const requestedDate = new Date(`${deliveryDate}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!cakeId || !Number.isInteger(numericQuantity) || numericQuantity < 1 || numericQuantity > 20 || !address || !/^[6-9]\d{9}$/.test(phoneValue) || Number.isNaN(requestedDate.getTime()) || requestedDate < today) {
      return res.status(400).json({ success: false, message: "Please provide valid delivery details." });
    }

    // Find Cake
    const cake = await Cake.findById(cakeId);

    if (!cake || !cake.available) {
      return res.status(404).json({
        success: false,
        message: "Cake not found",
      });
    }

    const totalPrice = cake.price * numericQuantity;

    if (!razorpay) {
      return res.status(500).json({ success: false, message: "Payments are not configured on the server." });
    }

    const razorpayOrder = await razorpay.orders.fetch(razorpay_order_id);
    if (razorpayOrder.amount !== Math.round(totalPrice * 100) || razorpayOrder.currency !== "INR") {
      return res.status(400).json({ success: false, message: "Payment amount does not match this order." });
    }

    const existingBooking = await Booking.findOne({ razorpayPaymentId: razorpay_payment_id });
    if (existingBooking) {
      return res.status(409).json({ success: false, message: "This payment has already been used for an order." });
    }

    // Create Booking
    const booking = await Booking.create({
      user: req.user._id,

      cake: cakeId,

      quantity: numericQuantity,

      totalPrice,

      deliveryAddress: address,

      phone: phoneValue,

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
