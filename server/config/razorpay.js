const Razorpay = require("razorpay");

// Only construct Razorpay client if credentials are provided to avoid crashed requires
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  // Export null to indicate missing configuration; callers should handle this case.
  module.exports = null;
} else {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  module.exports = razorpay;
}
