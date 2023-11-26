import mongoose, { Schema } from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    booksId: {
      type: Array,
      default: [],
    },
    transactionAmount: {
      type: mongoose.Types.Decimal128,
      default: 0.0,
      required: true,
    },
  },
  { timestamps: true }
);

const Transactions = mongoose.model("transaction", TransactionSchema);

export default Transactions;
