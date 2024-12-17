"use client";
import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase"; // Update the import path as needed
import { Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";
import { DollarSign, PieChart, BarChart3, Trash2, AlertTriangle } from "lucide-react";

const expenseCategories = [
  "Medical",
  "Emergency",
  "Food",
  "Travel",
  "Outing",
  "Purchase",
  "EMI",
  "Rent",
  "Loan",
  "Education",
  "Utility",
  "Entertainment",
  "Insurance",
  "Subscriptions",
  "Maintenance",
  "Taxes",
  "Miscellaneous",
];

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [budgetData, setBudgetData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const budgetSnapshot = await getDocs(collection(db, "budgets"));
        const budgetItems = budgetSnapshot.docs.reduce((acc, doc) => {
          acc[doc.data().category] = doc.data().price;
          return acc;
        }, {});
        setBudgetData(budgetItems);

        const expenseSnapshot = await getDocs(collection(db, "expenses"));
        const expenseItems = expenseSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setExpenses(expenseItems);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleAddExpense = async () => {
    const newExpense = { category, amount: parseFloat(amount), description };
    try {
      const docRef = await addDoc(collection(db, "expenses"), newExpense);
      setExpenses([...expenses, { id: docRef.id, ...newExpense }]);
      alert("Expense added successfully!");
    } catch (error) {
      console.error("Error adding expense: ", error);
    }

    setCategory("");
    setAmount("");
    setDescription("");
  };

  const handleRemoveExpense = async (id) => {
    try {
      await deleteDoc(doc(db, "expenses", id));
      setExpenses(expenses.filter((item) => item.id !== id));
      alert("Expense removed successfully!");
    } catch (error) {
      console.error("Error removing expense: ", error);
    }
  };

  const pieData = {
    labels: expenseCategories,
    datasets: [
      {
        data: expenseCategories.map(
          (cat) =>
            expenses
              .filter((item) => item.category === cat)
              .reduce((sum, item) => sum + item.amount, 0) || 0
        ),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  const barData = {
    labels: expenseCategories,
    datasets: [
      {
        label: "Budget",
        data: expenseCategories.map((cat) => parseFloat(budgetData[cat]) || 0),
        backgroundColor: "#36A2EB",
      },
      {
        label: "Expenses",
        data: expenseCategories.map(
          (cat) =>
            expenses
              .filter((item) => item.category === cat)
              .reduce((sum, item) => sum + item.amount, 0) || 0
        ),
        backgroundColor: "#FF6384",
      },
    ],
  };

  const warnings = expenseCategories
    .filter(
      (cat) =>
        (expenses
          .filter((item) => item.category === cat)
          .reduce((sum, item) => sum + item.amount, 0) || 0) >
        (parseFloat(budgetData[cat]) || 0)
    )
    .map((cat) => `${cat} has exceeded its budget!`);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Expense Tracker</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white text-black p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add New Expense</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="category">
                Category
              </label>
              <select
                id="category"
                className="w-full p-2 border rounded"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select a category</option>
                {expenseCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="amount">
                Amount
              </label>
              <input
                id="amount"
                type="number"
                className="w-full p-2 border rounded"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="description">
                Description
              </label>
              <input
                id="description"
                type="text"
                className="w-full p-2 border rounded"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button
              className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
              onClick={handleAddExpense}
            >
              Add Expense
            </button>
          </div>
        </div>

        <div className="bg-white text-black p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Warnings</h2>
          {warnings.length > 0 ? (
            <ul className="space-y-2">
              {warnings.map((warning, index) => (
                <li key={index} className="flex items-center text-red-600">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  {warning}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-green-600">No budget warnings at this time.</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white text-black p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Expenses Distribution</h2>
          <div className="h-[300px]">
            <Pie data={pieData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="bg-white text-black p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Budget vs Expenses</h2>
          <div className="h-[300px]">
            <Bar data={barData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      <div className="bg-white text-black p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Expenses</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="px-4 py-2">{item.category}</td>
                  <td className="px-4 py-2">${item.amount.toFixed(2)}</td>
                  <td className="px-4 py-2">{item.description}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleRemoveExpense(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
