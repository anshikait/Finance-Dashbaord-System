import { Record } from '../models/record.model.js';

export const getDashboardSummary = async () => {
  const matchStage = { $match: { isDeleted: false } };

  // Calculate total income and expenses
  const totals = await Record.aggregate([
    matchStage,
    { $group: { _id: "$type", totalAmount: { $sum: "$amount" } } }
  ]);

  let totalIncome = 0;
  let totalExpenses = 0;

  totals.forEach(t => {
    if (t._id === 'Income') totalIncome = t.totalAmount;
    if (t._id === 'Expense') totalExpenses = t.totalAmount;
  });

  const netBalance = totalIncome - totalExpenses;

  // Calculate category-wise totals
  const categoryTotals = await Record.aggregate([
    matchStage,
    { $group: { _id: "$category", total: { $sum: "$amount" } } }
  ]);

  // Fetch 5 most recent activities
  const recentActivity = await Record.find({ isDeleted: false }).sort({ date: -1 }).limit(5);

  return {
    totalIncome,
    totalExpenses,
    netBalance,
    categoryTotals,
    recentActivity
  };
};