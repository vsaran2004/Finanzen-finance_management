"use client";
import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FaMoneyBillWave, FaPiggyBank, FaExclamationCircle, FaCalendarAlt, FaLightbulb, FaChartPie } from 'react-icons/fa';
import dummyData from '../components/dummydata';

export default function MonthlyReport() {
  const [selectedMonth, setSelectedMonth] = useState('November');
  const [reportData, setReportData] = useState(dummyData['November']);
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    if (dummyData[selectedMonth]) {
      setReportData(dummyData[selectedMonth]);
      setNoData(false);
    } else {
      setNoData(true);
      setReportData(null);
    }
  }, [selectedMonth]);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text(`Monthly Report for ${selectedMonth}`, 20, 10);

    doc.autoTable({
      startY: 20,
      head: [['Category', 'Amount']],
      body: reportData.expenses.map((expense) => [expense.category, `₹${expense.amount}`]),
    });

    doc.text(`Income: ₹${reportData.income}`, 20, doc.autoTable.previous.finalY + 10);
    doc.text(`Savings: ₹${reportData.savings}`, 20, doc.autoTable.previous.finalY + 20);
    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 30,
      head: [['Notifications']],
      body: reportData.notifications.map((notification) => [notification]),
    });

    doc.save(`monthly_report_${selectedMonth}.pdf`);
  };

  return (
    <div className="min-h-screen bg-black-100 text-black p-6" style={{ marginLeft: "110px" }}>
      <h1 className="text-3xl text-white font-bold mb-4">Monthly Report</h1>
      <div className="mb-6">
        <label className="block text-sm text-white font-medium mb-2">Select Month</label>
        <select
          className="border rounded px-3 py-2 w-full bg-white text-black"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="November">November</option>
          <option value="October">October</option>
          <option value="September">September</option>
        </select>
      </div>

      {noData ? (
        <p className="text-red-500">No data found for the selected month.</p>
      ) : (
        <div>
          <h2 className="text-2xl text-white white font-bold mb-4">Report for {selectedMonth}</h2>
          <div className="grid grid-cols-2 gap-4">
            {/* Expense Card */}
            <div className="bg-white p-4 rounded shadow">
              <h3 className="flex items-center text-lg font-bold mb-2">
                <FaMoneyBillWave className="text-blue-500 mr-2" /> Expenses
              </h3>
              <ul>
                {reportData.expenses.map((expense, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{expense.category}:</span>
                    <span>₹{expense.amount}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Savings Card */}
            <div className="bg-white p-4 rounded shadow">
              <h3 className="flex items-center text-lg font-bold mb-2">
                <FaPiggyBank className="text-green-500 mr-2" /> Savings
              </h3>
              <p>₹{reportData.savings}</p>
            </div>

            {/* Budget Warnings Card */}
            <div className="bg-white p-4 rounded shadow">
              <h3 className="flex items-center text-lg font-bold mb-2">
                <FaExclamationCircle className="text-red-500 mr-2" /> Budget Warnings
              </h3>
              <ul>
                {reportData.budgetWarnings.map((warning, index) => (
                  <li key={index}>{warning}</li>
                ))}
              </ul>
            </div>

            {/* Activities Card */}
            <div className="bg-white p-4 rounded shadow">
              <h3 className="flex items-center text-lg font-bold mb-2">
                <FaCalendarAlt className="text-purple-500 mr-2" /> Activities
              </h3>
              <ul>
                {reportData.activities.map((activity, index) => (
                  <li key={index}>{activity}</li>
                ))}
              </ul>
            </div>

            {/* AI Suggestions Card */}
            <div className="bg-white p-4 rounded shadow">
              <h3 className="flex items-center text-lg font-bold mb-2">
                <FaLightbulb className="text-yellow-500 mr-2" /> AI Suggestions
              </h3>
              <p><strong>Improvements:</strong> {reportData.aiSuggestions.improvements}</p>
              <p><strong>Savings:</strong> {reportData.aiSuggestions.savings}</p>
            </div>

            {/* Monthly Budget Card */}
            <div className="bg-white p-4 rounded shadow">
              <h3 className="flex items-center text-lg font-bold mb-2">
                <FaChartPie className="text-orange-500 mr-2" /> Monthly Budget
              </h3>
              <p>₹{reportData.monthlyBudget}</p>
            </div>
          </div>

          <button
            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={downloadPDF}
            disabled={noData}
          >
            Download Report
          </button>
        </div>
      )}
    </div>
  );
}
