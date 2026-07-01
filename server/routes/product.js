const express = require("express");
const router = express.Router();

const Product = require("../models/product");
const upload = require("../middleware/upload");

// Create Cake
router.post(
  "/cakes",
  upload.array("images", 5),
  async (req, res) => {
    try {
      const {
        name,
        description,
        price,
        category,
        weight,
        flavor,
        eggless,
      } = req.body;

      const imageUrls = req.files.map(
        (file) => file.path
      );

      const cake = await Product.create({
        name,
        description,
        price,
        category,
        images: imageUrls,
        weight,
        flavor,
        eggless,
      });

      res.status(201).json({
        success: true,
        cake,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

// Get All Cakes
router.get("/cakes", async (req, res) => {
  try {
    const cakes = await Product.find();

    res.status(200).json({
      success: true,
      cakes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get Single Cake
router.get("/cakes/:id", async (req, res) => {
  try {
    const cake = await Product.findById(req.params.id);

    if (!cake) {
      return res.status(404).json({
        success: false,
        message: "Cake not found",
      });
    }

    res.status(200).json({
      success: true,
      cake,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.delete("/cakes/:id/delete", async (req, res) => {
  try {
    const deletedCake = await Product.findByIdAndDelete(
      req.params.id
    );

    if (!deletedCake) {
      return res.status(404).json({
        success: false,
        message: "Cake not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cake deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


router.put(
  "/cakes/:id",
  upload.array("images", 5),
  async (req, res) => {
    try {
      const updateData = {
        ...req.body,
      };

      if (req.files && req.files.length > 0) {
        updateData.images = req.files.map(
          (file) => file.path
        );
      }

      const cake = await Product.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
        }
      );

      res.json({
        success: true,
        cake,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

module.exports = router;