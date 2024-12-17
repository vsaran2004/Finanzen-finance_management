const dummyData = {
    November: {
      income: 5000,
      expenses: [
        { category: 'Food', amount: 600 },
        { category: 'Travel', amount: 300 },
        { category: 'Rent', amount: 1200 },
        { category: 'Utilities', amount: 200 },
        { category: 'Entertainment', amount: 150 },
        { category: 'Insurance', amount: 250 },
        { category: 'Subscriptions', amount: 100 },
      ],
      savings: 2200,
      monthlyBudget: 5000,
      budgetWarnings: ['You exceeded your food budget by ₹100!'],
      activities: ['Paid rent on Nov 5', 'Bought groceries', 'Recharged mobile plan'],
      aiSuggestions: {
        improvements: 'Reduce entertainment expenses by 10% to increase savings.',
        savings: 'Save ₹500 more this month by avoiding impulse shopping.',
      },
      notifications: ['Your rent is due on the 5th', 'Insurance premium due on the 15th'],
    }
  };
  
  export default dummyData;
  