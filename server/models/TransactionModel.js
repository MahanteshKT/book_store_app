import mongoose, { Schema } from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    TransactionId: {},
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    booksId: {
      type: Array,
      default: [],
    },
    transactionAmount: {
      type: Decimal,
      default: 0.0,
      required: true,
    },
  },
  { timestamps: true }
);

const Transactions = mongoose.model("transaction", TransactionSchema);

export default Transactions;
