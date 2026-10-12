const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    image: {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

   
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Indexes
//why used indexes -
// 1. improves the performance of database queries
// 2. reduces the time it takes to retrieve data
// 3. reduces the memory usage of the database
// MongoDB automatically creates an index on the _id field (which is unique for each document, used for identifying)
productSchema.index({ name: "text", brand: "text" });
productSchema.index({ category: 1 });
productSchema.index({ status: 1 });

module.exports = mongoose.model("Product", productSchema);