"use client";
import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase"; // Update the import path as needed
import { Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";
import { DollarSign, PieChart, BarChart3, Trash2 } from 'lucide-react';

// Expense Categories
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

export default function Budget() {
  const [budgetData, setBudgetData] = useState([]);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [suggestions, setSuggestions] = useState({});

  // Fetch budget data and monthly income from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const budgetSnapshot = await getDocs(collection(db, "budgets"));
        const budgetItems = budgetSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBudgetData(budgetItems);

        const incomeDoc = await getDocs(collection(db, "monthlyIncome"));
        if (!incomeDoc.empty) {
          const incomeData = incomeDoc.docs[0];
          setMonthlyIncome(incomeData.data().income.toString());
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  // Add or update monthly income in Firestore
  const handleSaveMonthlyIncome = async () => {
    try {
      const incomeRef = doc(db, "monthlyIncome", "userIncome");
      await setDoc(incomeRef, { income: parseFloat(monthlyIncome) });
      alert("Monthly income saved successfully!");
    } catch (error) {
      console.error("Error saving monthly income: ", error);
    }
  };

  // Remove monthly income from Firestore
  const handleRemoveMonthlyIncome = async () => {
    try {
      const incomeRef = doc(db, "monthlyIncome", "userIncome");
      await deleteDoc(incomeRef);
      setMonthlyIncome("");
      alert("Monthly income removed successfully!");
    } catch (error) {
      console.error("Error removing monthly income: ", error);
    }
  };

  // Add a new budget entry to Firestore
  const handleAddBudget = async () => {
    const newBudget = { category, price: parseFloat(price), description };
    try {
      const docRef = await addDoc(collection(db, "budgets"), newBudget);
      setBudgetData([...budgetData, { id: docRef.id, ...newBudget }]);
      alert("Budget entry saved successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
    }

    setCategory("");
    setPrice("");
    setDescription("");
  };

  // Delete a specific budget entry from Firestore
  const handleRemoveBudget = async (id) => {
    try {
      await deleteDoc(doc(db, "budgets", id));
      setBudgetData(budgetData.filter((item) => item.id !== id));
      alert("Budget entry removed successfully!");
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  // Calculate suggestions based on monthly income
  const calculateSuggestions = (income) => {
    if (!income) return;

    const suggestedBudget = expenseCategories.reduce((acc, category) => {
      acc[category] = (income * 0.05).toFixed(2);
      return acc;
    }, {});

    setSuggestions(suggestedBudget);
  };

  // Recalculate suggestions when monthly income changes
  useEffect(() => {
    calculateSuggestions(parseFloat(monthlyIncome));
  }, [monthlyIncome]);

  // Prepare data for charts
  const pieData = {
    labels: budgetData.map((item) => item.category),
    datasets: [
      {
        data: budgetData.map((item) => item.price),
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
        label: "Suggested Budget",
        data: expenseCategories.map((cat) => parseFloat(suggestions[cat]) || 0),
        backgroundColor: "#36A2EB",
      },
      {
        label: "Actual Spending",
        data: expenseCategories.map(
          (cat) =>
            budgetData
              .filter((item) => item.category === cat)
              .reduce((sum, item) => sum + item.price, 0) || 0
        ),
        backgroundColor: "#FF6384",
      },
    ],
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Financial Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md text-black">
          <h2 className="text-xl font-semibold mb-4">Monthly Income</h2>
          <div className="space-y-4">
            <input
              type="number"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(e.target.value)}
              placeholder="Enter monthly income"
              className="w-full p-2 border rounded"
            />
            <div className="flex space-x-2">
              <button
                onClick={handleSaveMonthlyIncome}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save Income
              </button>
              <button
                onClick={handleRemoveMonthlyIncome}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Remove Income
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md text-black">
          <h2 className="text-xl font-semibold mb-4">Add Budget Entry</h2>
          <div className="space-y-4">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select category</option>
              {expenseCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Amount"
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="w-full p-2 border rounded"
            />
            <button
              onClick={handleAddBudget}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Add Entry
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md text-black">
          <h2 className="text-xl font-semibold mb-4">AI-Powered Suggestions</h2>
          <div className="h-[200px] overflow-y-auto">
            {Object.entries(suggestions).map(([category, amount]) => (
              <div key={category} className="flex justify-between py-2 border-b">
                <span>{category}:</span>
                <span>${amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md text-black">
          <h2 className="text-xl font-semibold mb-4">Budget Distribution</h2>
          <div className="h-[300px]">
            <Pie data={pieData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-black">
          <h2 className="text-xl font-semibold mb-4">Budget Comparison</h2>
          <div className="h-[300px]">
            <Bar data={barData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md text-black">
        <h2 className="text-xl font-semibold mb-4">Budget Entries</h2>
        <div className="h-[300px] overflow-y-auto">
          {budgetData.map((item) => (
            <div key={item.id} className="flex justify-between items-center py-2 border-b">
              <div>
                <p className="font-medium">{item.category}</p>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-bold">${item.price.toFixed(2)}</span>
                <button
                  onClick={() => handleRemoveBudget(item.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

