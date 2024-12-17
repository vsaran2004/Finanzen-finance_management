"use client";
import { useEffect, useState } from 'react';
import { Bell, Calendar, DollarSign, TrendingUp, ArrowUpCircle, PieChart } from 'lucide-react';

const notifications = [
  {
    title: "Enter today's expenses and stay on top of your finances!",
    explanation: "This notification reminds you to input your daily expenses. Keeping track of daily expenditures helps you stay organized and ensure you're not overspending, while also helping to build good financial habits.",
    type: "Reminder"
  },
  {
    title: "Gold prices surged by 2% today. Is it time to invest?",
    explanation: "This is an update on the current performance of gold in the market. A 2% surge could mean it's a good time to invest if you're considering adding gold to your portfolio. Market updates like these keep you informed of price movements and help you make timely decisions.",
    type: "Market Update"
  },
  {
    title: "Bitcoin hit $42,000! Experts say it could be the future. Explore now!",
    explanation: "Bitcoin has reached a significant price point, and this notification is suggesting that Bitcoin could be a valuable long-term investment. It encourages you to consider exploring Bitcoin's potential, especially with expert opinions suggesting its promising future.",
    type: "Market Update"
  },
  {
    title: "TCS shares are trending! Invest in the stock market for potential growth.",
    explanation: "This notification highlights a trending stock (TCS shares) in the market. It encourages you to explore the potential of investing in TCS for growth, suggesting that this may be a good time to invest in that particular stock.",
    type: "Investment Opportunity"
  },
  {
    title: "Your monthly expense report is ready! View insights on your spending habits.",
    explanation: "This message informs you that your monthly expense report is ready for review. Viewing the report allows you to gain insights into where you're spending the most, which can help you adjust your budget and improve your financial health.",
    type: "Report"
  },
  {
    title: "Did you know? Early investments lead to better compounding returns.",
    explanation: "This is a financial tip reminding you about the power of compound interest. Investing early allows your investments to grow over time, as the returns earned on your investments themselves earn additional returns, leading to exponential growth.",
    type: "Tip"
  },
  {
    title: "Quarterly report meeting with your financial advisor is due next week!",
    explanation: "This notification informs you of an upcoming event: your quarterly meeting with your financial advisor. It's a reminder to prepare and review your financial goals, investments, and any adjustments you need to make.",
    type: "Event"
  },
  {
    title: "Congratulations! You've saved $1,000 this quarter!",
    explanation: "This is a congratulatory notification celebrating your financial milestone. You've saved $1,000 over the course of the quarter, which is an achievement worth recognizing. This kind of notification helps boost motivation and keep you focused on your savings goals.",
    type: "Milestone"
  }
];

const Notifications = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Financial Notifications</h1>

      {/* Grid Layout: 2 notifications per row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center mb-4">
              <Bell className="w-6 h-6 mr-2 text-blue-500" />
              <h3 className="font-bold text-lg">{notification.title}</h3>
            </div>
            <p className="text-sm text-gray-600 mb-2">{notification.explanation}</p>
            <span className="text-xs font-medium text-gray-500">{notification.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
