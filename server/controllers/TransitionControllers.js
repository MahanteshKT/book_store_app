import Transactions from "../models/TransactionModel.js";

export const addTransition = async function (req, res) {
  const data = req.body;
  try {
    const transactions = await Transactions.create({ ...data });
    res.status(200).json({ transactions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
