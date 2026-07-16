const bakeryKeywords = [
  "cake",
  "order",
  "delivery",
  "payment",
  "refund",
  "bakery",
  "flavour",
  "eggless",
  "custom cake",
];

if (!isBakeryQuestion(message)) {
    return res.json({
        success: true,
        answer:
            "I'm the Sweet Bakery assistant. I can help with cakes, orders, delivery, payments, and bakery-related questions.",
    });
}