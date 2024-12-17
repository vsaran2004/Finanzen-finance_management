"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { PieChartIcon, WalletIcon, TrendingUpIcon, ShieldIcon, RocketIcon } from 'lucide-react';

const Button = ({ children, className = "", variant = "", size = "", asChild = false, href = "" }) => {
  const baseClasses = "px-4 py-2 rounded transition duration-300 ease-in-out";
  const variantClasses = variant === "outline" 
    ? "border border-white text-white hover:bg-white hover:text-black" 
    : "bg-blue-600 text-white hover:bg-blue-700";
  const sizeClasses = size === "lg" ? "text-lg px-6 py-3" : "";

  if (asChild) {
    return (
      <Link href={href} className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}>{children}</button>
  );
};

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-gray-900 border border-gray-800 shadow-lg rounded-lg p-6 transition duration-300 ease-in-out hover:shadow-xl hover:border-gray-700">
    <div className="flex items-center mb-4">
      <Icon className="mr-2 h-6 w-6 text-blue-400" />
      <h3 className="text-xl font-bold text-white">{title}</h3>
    </div>
    <p className="text-gray-300">
      {description}
    </p>
  </div>
);

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center justify-start p-4">
      <header className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center mb-12">
        <div className={`transition-all duration-1000 mb-8 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <Image
            src="/logo-1.png"
            alt="Finanzen Logo"
            width={250}
            height={100}
            className="object-contain"
          />
        </div>
        <div className="flex justify-between items-center w-full">
          <h1 className="text-3xl font-bold">Finanzen</h1>
          <div className="space-x-4">
            <Link href="Auth/login">
            <Button variant="outline" href="/Auth/login">Log In</Button>
            </Link>
            <Link href="Auth/signup">
            <Button href="/Auth/signup">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Take Control of Your Finances</h2>
          <p className="text-2xl text-gray-300 mb-8">
            AI-Powered Personal Finance Management for a Brighter Financial Future
          </p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Finanzen is your all-in-one solution for managing your personal finances. 
            Our cutting-edge AI technology helps you track expenses, plan budgets, and gain 
            valuable insights into your financial health. With Finanzen, you're not just 
            managing money - you're mastering your financial future.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <FeatureCard 
            icon={PieChartIcon}
            title="Expense Tracking"
            description="Easily track and categorize your expenses with our intuitive interface and AI-powered suggestions. Our smart algorithms learn from your spending habits to provide accurate categorization."
          />
          <FeatureCard 
            icon={WalletIcon}
            title="Budget Planning"
            description="Set realistic budgets and receive personalized recommendations to help you stick to your financial goals. Our AI analyzes your income and spending patterns to suggest optimal budget allocations."
          />
          <FeatureCard 
            icon={TrendingUpIcon}
            title="Financial Insights"
            description="Gain valuable insights into your spending habits and financial health with our AI-powered analytics. Visualize your financial data with interactive charts and receive actionable advice to improve your finances."
          />
        </div>

        <div className="bg-gray-900 border border-gray-800 shadow-lg rounded-lg p-8 mb-16">
          <h3 className="text-3xl font-bold mb-6 text-center">Why Choose Finanzen?</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: ShieldIcon, title: "Bank-Level Security", description: "Your financial data is protected with state-of-the-art encryption and security measures." },
              { icon: RocketIcon, title: "Smart Automation", description: "Automate your financial tasks and save time with our intelligent features." },
              { icon: PieChartIcon, title: "Comprehensive Reports", description: "Get detailed financial reports and projections to make informed decisions." },
              { icon: WalletIcon, title: "Multi-Account Support", description: "Manage all your bank accounts, credit cards, and investments in one place." }
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <item.icon className="mr-3 h-6 w-6 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white text-lg mb-2">{item.title}</h4>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold mb-6 text-white">
            Ready to Transform Your Financial Life?
          </h3>
          <Button size="lg" href="/signup" asChild>Get Started for Free</Button>
          <p className="mt-4 text-gray-400">
            Join thousands of users who have already taken control of their finances with Finanzen.
          </p>
        </div>
      </main>

      <footer className="mt-12 text-center text-gray-400">
        <p>&copy; 2023 Finanzen. All rights reserved.</p>
        <p className="mt-2">Empowering financial freedom through intelligent technology.</p>
      </footer>
    </div>
  );
}

