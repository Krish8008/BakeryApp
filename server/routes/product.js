const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Product = require("../models/product");
const Review = require("../models/Review");
const Booking = require("../models/Booking");
const upload = require("../middleware/upload");
const cloudinary = require("../config/cloudinary");
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

const updateProductReviewStats = async (productId) => {
  const product = await Product.findById(productId);

  if (!product) return;

  const reviewCount = await Review.countDocuments({ productId });
  const reviewStats = await Review.aggregate([
    { $match: { productId: new mongoose.Types.ObjectId(productId) } },
    { $group: { _id: null, averageRating: { $avg: "$rating" } } },
  ]);

  const averageRating = reviewStats[0]?.averageRating ?? 0;

  product.totalReviews = reviewCount;
  product.ratings = Number(averageRating.toFixed(1));

  await product.save();
};

// Create Cake
router.post(
  "/cakes",
  protect,
  adminOnly,
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
    const requestedPage = Number.parseInt(req.query.page, 10);
    const requestedLimit = Number.parseInt(req.query.limit, 10);
    const page = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;
    // Keep catalogue requests intentionally small, even if a client sends a large limit.
    const limit = Number.isFinite(requestedLimit) && requestedLimit > 0
      ? Math.min(requestedLimit, 20)
      : 20;
    const totalCakes = await Product.countDocuments();
    const totalPages = Math.max(1, Math.ceil(totalCakes / limit));
    const safePage = Math.min(page, totalPages);
    const cakes = await Product.find()
      .sort({ createdAt: -1, _id: -1 })
      .skip((safePage - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      cakes,
      pagination: {
        page: safePage,
        limit,
        totalCakes,
        totalPages,
        hasNextPage: safePage < totalPages,
        hasPreviousPage: safePage > 1,
      },
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

router.get("/cakes/:id/reviews", async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.id })
      .populate("user", "name role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/cakes/:id/reviews", protect, async (req, res) => {
  try {
    const { rating, review } = req.body;
    const cake = await Product.findById(req.params.id);

    if (!cake) {
      return res.status(404).json({
        success: false,
        message: "Cake not found",
      });
    }

    const numericRating = Number(rating);
    const trimmedReview = review?.trim();

    if (!Number.isFinite(numericRating) || numericRating < 1 || numericRating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5.",
      });
    }

    if (!trimmedReview || trimmedReview.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Review must be at least 3 characters long.",
      });
    }

    const deliveredBooking = await Booking.findOne({
      user: req.user._id,
      cake: cake._id,
      orderStatus: "Delivered",
    }).sort({ updatedAt: -1 });

    if (!deliveredBooking) {
      return res.status(403).json({
        success: false,
        message: "You can only review a cake after purchasing it and after the delivery is completed.",
      });
    }

    const existingReview = await Review.findOne({
      productId: cake._id,
      user: req.user._id,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this cake.",
      });
    }

    const newReview = await Review.create({
      productId: cake._id,
      user: req.user._id,
      rating: numericRating,
      review: trimmedReview,
    });

    await updateProductReviewStats(cake._id);

    const populatedReview = await Review.findById(newReview._id).populate(
      "user",
      "name role"
    );

    res.status(201).json({
      success: true,
      review: populatedReview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.delete("/cakes/:id/reviews/:reviewId", protect, async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    const isOwner = review.user.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own reviews or ask an admin to remove it.",
      });
    }

    await Review.findByIdAndDelete(req.params.reviewId);
    await updateProductReviewStats(req.params.id);

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// router.delete("/cakes/:id/delete", protect, adminOnly, async (req, res) => {
//   try {
//     const deletedCake = await Product.findByIdAndDelete(
//       req.params.id
//     );

//     if (!deletedCake) {
//       return res.status(404).json({
//         success: false,
//         message: "Cake not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Cake deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });


router.delete(
  "/cakes/:id/delete",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const cake = await Product.findById(req.params.id);

      if (!cake) {
        return res.status(404).json({
          success: false,
          message: "Cake not found",
        });
      }

      // Delete images from Cloudinary
      if (cake.images && cake.images.length > 0) {
        for (const imageUrl of cake.images) {
          try {
            const parts = imageUrl.split("/");

            const uploadIndex = parts.indexOf("upload");

            if (uploadIndex !== -1) {
              let publicId = parts
                .slice(uploadIndex + 1)
                .join("/");

              // Remove transformation/version folders
              publicId = publicId.replace(
                /^v\d+\//,
                ""
              );

              // Remove file extension
              publicId = publicId.replace(
                /\.[^/.]+$/,
                ""
              );

              await cloudinary.uploader.destroy(
                publicId
              );

            }
          } catch (cloudinaryError) {
            console.error(
              "Cloudinary delete failed:",
              cloudinaryError.message
            );
          }
        }
      }

      // Delete product from MongoDB
      await Product.findByIdAndDelete(req.params.id);

      res.status(200).json({
        success: true,
        message: "Cake and Cloudinary images deleted successfully",
      });
    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);


router.put(
  "/cakes/:id",
  protect,
  adminOnly,
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
