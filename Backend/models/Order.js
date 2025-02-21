import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    pets: [
      {
        petId: { type: mongoose.Schema.Types.ObjectId, ref: "Pet", required: true }, // ✅ Required field
        name: String,
        rentPrice: Number,
        days: Number,
        deposit: Number,
      },
    ],
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    status: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
  },
  { timestamps: true }
);

// ✅ Correct ES Module export
const Order = mongoose.model("Order", orderSchema);
export default Order;
