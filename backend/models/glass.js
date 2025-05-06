//Kumod
import mongoose from "mongoose";
const glassSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    trending: {
      type: Boolean,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    oldPrice: {
      type: Number,
      required: true,
    },
    newPrice: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    stockCount: { type: Number, required: true, default: 1 },
  },
  {
    timestamps: true,
  }
);

const Glass = mongoose.model("Glass", glassSchema);

export default Glass;
