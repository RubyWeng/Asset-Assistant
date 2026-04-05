import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'zh-TW';

interface Translations {
  appName: string;
  dashboard: string;
  transactions: string;
  settings: string;
  recordReview: string;
  overview: string;
  welcomeBack: string;
  totalBalance: string;
  totalIncome: string;
  totalExpenses: string;
  monthlyOverview: string;
  yearlySummary: string;
  categories: string;
  recentTransactions: string;
  viewAll: string;
  searchPlaceholder: string;
  newTransaction: string;
  expense: string;
  income: string;
  amount: string;
  category: string;
  description: string;
  date: string;
  add: string;
  noTransactions: string;
  language: string;
  english: string;
  traditionalChinese: string;
  salary: string;
  stocks: string;
  dividends: string;
  rent: string;
  food: string;
  creditCard: string;
  shopping: string;
  transport: string;
  entertainment: string;
  health: string;
  other: string;
  year: string;
  balance: string;
}

const translations: Record<Language, Translations> = {
  'en': {
    appName: 'AssetTrack Pro',
    dashboard: 'Dashboard',
    transactions: 'Transactions',
    settings: 'Settings',
    recordReview: 'Record Review',
    overview: 'Overview',
    welcomeBack: "Welcome back! Here's your financial summary.",
    totalBalance: 'Total Balance',
    totalIncome: 'Total Income',
    totalExpenses: 'Total Expenses',
    monthlyOverview: 'Monthly Overview',
    yearlySummary: 'Yearly Summary',
    categories: 'Categories',
    recentTransactions: 'Recent Transactions',
    viewAll: 'View All',
    searchPlaceholder: 'Search transactions...',
    newTransaction: 'New Transaction',
    expense: 'Expense',
    income: 'Income',
    amount: 'Amount',
    category: 'Category',
    description: 'Description',
    date: 'Date',
    add: 'Add',
    noTransactions: 'No transactions yet. Start by adding one!',
    language: 'Language',
    english: 'English',
    traditionalChinese: 'Traditional Chinese',
    salary: 'Salary',
    stocks: 'Stocks',
    dividends: 'Dividends',
    rent: 'Rent',
    food: 'Food',
    creditCard: 'Credit Card',
    shopping: 'Shopping',
    transport: 'Transport',
    entertainment: 'Entertainment',
    health: 'Health',
    other: 'Other',
    year: 'Year',
    balance: 'Balance'
  },
  'zh-TW': {
    appName: '資產管理',
    dashboard: '儀表板',
    transactions: '交易紀錄',
    settings: '設定',
    recordReview: '紀錄回顧',
    overview: '概覽',
    welcomeBack: '歡迎回來！這是您的財務摘要。',
    totalBalance: '總餘額',
    totalIncome: '總收入',
    totalExpenses: '總支出',
    monthlyOverview: '每月概覽',
    yearlySummary: '年度摘要',
    categories: '類別',
    recentTransactions: '最近交易',
    viewAll: '查看全部',
    searchPlaceholder: '搜尋交易...',
    newTransaction: '新增交易',
    expense: '支出',
    income: '收入',
    amount: '金額',
    category: '類別',
    description: '描述',
    date: '日期',
    add: '新增',
    noTransactions: '尚無交易紀錄。開始新增一筆吧！',
    language: '語言',
    english: '英文',
    traditionalChinese: '繁體中文',
    salary: '薪資',
    stocks: '股票',
    dividends: '股息',
    rent: '房租',
    food: '飲食',
    creditCard: '信用卡',
    shopping: '購物',
    transport: '交通',
    entertainment: '娛樂',
    health: '健康',
    other: '其他',
    year: '年份',
    balance: '餘額'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('app_language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('app_language', language);
  }, [language]);

  const translateCategory = (category: string) => {
    const key = category.charAt(0).toLowerCase() + category.slice(1).replace(' ', '') as keyof Translations;
    return translations[language][key] || category;
  };

  const value = {
    language,
    setLanguage,
    t: translations[language],
    translateCategory
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
