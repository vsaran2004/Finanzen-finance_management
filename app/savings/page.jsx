"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2"; // Importing Bar chart component
import "chart.js/auto";
import { Newspaper, TrendingUp, DollarSign, AlertTriangle } from "lucide-react";

const savingTypes = [
  "Digital Gold",
  "Stock Market",
  "Cryptocurrencies",
  "Fixed Deposits",
  "Real Estate",
  "Mutual Funds",
  "Savings Account",
  "Government Bonds",
];

const SavingSuggestions = () => {
  const [news, setNews] = useState([]);
  const [suggestions, setSuggestions] = useState([
    {
      type: "Digital Gold",
      description:
        "Invest in digital gold to diversify your portfolio and hedge against inflation.",
      riskLevel: "Medium",
      potentialReturn: "8-12% annually",
      minimumInvestment: "$50",
    },
    {
      type: "Stock Market",
      description: "Explore equity investments for potential long-term growth.",
      riskLevel: "High",
      potentialReturn: "10-15% annually",
      minimumInvestment: "$100",
    },
    {
      type: "Cryptocurrencies",
      description:
        "Consider cryptocurrencies for high-risk, high-reward opportunities.",
      riskLevel: "Very High",
      potentialReturn: "Highly variable",
      minimumInvestment: "$10",
    },
    {
      type: "Fixed Deposits",
      description: "Opt for fixed deposits for secure and guaranteed returns.",
      riskLevel: "Low",
      potentialReturn: "4-6% annually",
      minimumInvestment: "$500",
    },
    {
      type: "Real Estate",
      description: "Invest in property for stable long-term value appreciation.",
      riskLevel: "Medium",
      potentialReturn: "7-10% annually",
      minimumInvestment: "$10,000",
    },
    {
      type: "Mutual Funds",
      description:
        "Invest in professionally managed funds for diversified exposure.",
      riskLevel: "Medium",
      potentialReturn: "8-12% annually",
      minimumInvestment: "$100",
    },
    {
      type: "Savings Account",
      description:
        "Keep your money safe and easily accessible with modest interest.",
      riskLevel: "Very Low",
      potentialReturn: "0.5-2% annually",
      minimumInvestment: "$0",
    },
    {
      type: "Government Bonds",
      description:
        "Invest in low-risk government securities for stable returns.",
      riskLevel: "Low",
      potentialReturn: "2-5% annually",
      minimumInvestment: "$100",
    },
  ]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [portfolioAllocation, setPortfolioAllocation] = useState({});

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("https://newsapi.org/v2/everything", {
          params: {
            q: "investment OR savings",
            apiKey: "a165016062274772975cb8f24417cd13",
            sortBy: "publishedAt",
            language: "en",
          },
        });
        setNews(response.data.articles.slice(0, 6));
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    // Generate random portfolio allocation for demonstration
    const allocation = {};
    let remaining = 100;
    savingTypes.forEach((type, index) => {
      if (index === savingTypes.length - 1) {
        allocation[type] = remaining;
      } else {
        const value = Math.floor(Math.random() * remaining);
        allocation[type] = value;
        remaining -= value;
      }
    });
    setPortfolioAllocation(allocation);
  }, []);

  // Bar Chart data
  const barData = {
    labels: Object.keys(portfolioAllocation),
    datasets: [
      {
        label: "Portfolio Allocation (%)",
        data: Object.values(portfolioAllocation),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#FF6384",
          "#36A2EB",
        ],
        borderColor: "#333333",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen container mx-auto p-6 space-y-6 text-black">
      <h1 className="text-3xl text-white font-bold mb-6">AI-Powered Saving Suggestions</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Top Saving Suggestions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="p-4 bg-gray-100 rounded-lg shadow cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedSuggestion(suggestion)}
              >
                <h3 className="font-bold text-lg mb-2">{suggestion.type}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {suggestion.description}
                </p>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Risk: {suggestion.riskLevel}</span>
                  <span>Return: {suggestion.potentialReturn}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Portfolio Allocation</h2>
          <div className="h-[300px]">
            <Bar data={barData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      {selectedSuggestion && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            {selectedSuggestion.type} Details
          </h2>
          <p className="mb-2">{selectedSuggestion.description}</p>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="p-3 bg-gray-100 rounded">
              <h3 className="font-semibold mb-1">Risk Level</h3>
              <p>{selectedSuggestion.riskLevel}</p>
            </div>
            <div className="p-3 bg-gray-100 rounded">
              <h3 className="font-semibold mb-1">Potential Return</h3>
              <p>{selectedSuggestion.potentialReturn}</p>
            </div>
            <div className="p-3 bg-gray-100 rounded">
              <h3 className="font-semibold mb-1">Minimum Investment</h3>
              <p>{selectedSuggestion.minimumInvestment}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Latest Financial News</h2>
        {news.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {news.map((article, index) => (
              <div
                key={index}
                className="p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="font-bold text-lg mb-2">{article.title}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {article.description}
                </p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-sm flex items-center"
                >
                  <Newspaper className="w-4 h-4 mr-1" />
                  Read More
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">Loading financial news...</p>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Investment Tips</h2>
        <ul className="space-y-2">
          <li className="flex items-start">
            <TrendingUp className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-1" />
            <span>
              Diversify your portfolio to spread risk across different asset
              classes.
            </span>
          </li>
          <li className="flex items-start">
            <DollarSign className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-1" />
            <span>
              Start investing early to take advantage of compound interest.
            </span>
          </li>
          <li className="flex items-start">
            <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500 flex-shrink-0 mt-1" />
            <span>
              Always research and understand an investment before committing
              your money.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SavingSuggestions;
