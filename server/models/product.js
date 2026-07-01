const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Birthday",
        "Wedding",
        "Anniversary",
        "Cupcake",
        "Pastry",
        "Chocolate",
        "Fruit",
        "Custom",
      ],
    },

    images: [
  {
    type: String,
    required: true,
  },
],

    weight: {
      type: String,
      required: true,
      enum: ["0.5kg", "1kg", "1.5kg", "2kg", "3kg", "5kg"],
    },

    flavor: {
      type: String,
      required: true,
    },

    eggless: {
      type: Boolean,
      default: false,
    },

    available: {
      type: Boolean,
      default: true,
    },

    ratings: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);