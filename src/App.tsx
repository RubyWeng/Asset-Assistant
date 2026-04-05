import { useState, useEffect, useMemo } from 'react';
import { Wallet, TrendingUp, TrendingDown, LayoutDashboard, ListFilter, Settings, Search, Globe, History } from 'lucide-react';
import { Transaction, TransactionType } from './types';
import { SummaryCard } from './components/SummaryCard';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { DashboardChart } from './components/DashboardChart';
import { RecordReview } from './components/RecordReview';
import { cn } from './lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage, Language } from './contexts/LanguageContext';

const STORAGE_KEY = 'asset_track_pro_data';

const INITIAL_DATA: Transaction[] = [
  { id: '1', type: 'income', category: 'Salary', amount: 5000, description: 'Monthly Salary', date: new Date(new Date().setDate(1)).toISOString() },
  { id: '2', type: 'expense', category: 'Rent', amount: 1200, description: 'Apartment Rent', date: new Date(new Date().setDate(2)).toISOString() },
  { id: '3', type: 'expense', category: 'Food', amount: 450, description: 'Groceries', date: new Date(new Date().setDate(5)).toISOString() },
  { id: '4', type: 'income', category: 'Stocks', amount: 200, description: 'Stock Profit', date: new Date(new Date().setDate(10)).toISOString() },
  { id: '5', type: 'expense', category: 'Credit Card', amount: 800, description: 'Monthly Bill', date: new Date(new Date().setDate(15)).toISOString() },
];

export default function App() {
  const { t, language, setLanguage } = useLanguage();
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });
  const [activeTab, setActiveTab] = useState<'dashboard' | 'transactions' | 'recordReview' | 'settings'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<TransactionType | 'all'>('all');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  const stats = useMemo(() => {
    const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    return {
      totalBalance: income - expenses,
      totalIncome: income,
      totalExpenses: expenses
    };
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter(t => {
        const matchesSearch = t.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             t.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = filterType === 'all' || t.type === filterType;
        return matchesSearch && matchesType;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, searchQuery, filterType]);

  const handleAddTransaction = (newTransaction: Omit<Transaction, 'id'>) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: crypto.randomUUID(),
    };
    setTransactions(prev => [transaction, ...prev]);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-blue-500/30">
      {/* Sidebar / Navigation */}
      <nav className="fixed left-0 top-0 bottom-0 w-20 lg:w-64 bg-slate-900 border-r border-slate-800 z-40 hidden md:flex flex-col p-6">
        <div className="flex items-center gap-3 mb-12">
          <div className="bg-blue-600 p-2 rounded-xl">
            <Wallet className="text-white w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold tracking-tight hidden lg:block text-white">{t.appName}</h1>
        </div>

        <div className="space-y-2 flex-1">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={cn(
              "w-full flex items-center gap-3 p-3 rounded-xl transition-all",
              activeTab === 'dashboard' ? "bg-blue-600/10 text-blue-400 font-bold" : "text-slate-400 hover:bg-slate-800"
            )}
          >
            <LayoutDashboard size={24} />
            <span className="hidden lg:block">{t.dashboard}</span>
          </button>
          <button 
            onClick={() => setActiveTab('transactions')}
            className={cn(
              "w-full flex items-center gap-3 p-3 rounded-xl transition-all",
              activeTab === 'transactions' ? "bg-blue-600/10 text-blue-400 font-bold" : "text-slate-400 hover:bg-slate-800"
            )}
          >
            <ListFilter size={24} />
            <span className="hidden lg:block">{t.transactions}</span>
          </button>
          <button 
            onClick={() => setActiveTab('recordReview')}
            className={cn(
              "w-full flex items-center gap-3 p-3 rounded-xl transition-all",
              activeTab === 'recordReview' ? "bg-blue-600/10 text-blue-400 font-bold" : "text-slate-400 hover:bg-slate-800"
            )}
          >
            <History size={24} />
            <span className="hidden lg:block">{t.recordReview}</span>
          </button>
        </div>

        <div className="pt-6 border-t border-slate-800">
          <button 
            onClick={() => setActiveTab('settings')}
            className={cn(
              "w-full flex items-center gap-3 p-3 rounded-xl transition-all",
              activeTab === 'settings' ? "bg-blue-600/10 text-blue-400 font-bold" : "text-slate-400 hover:bg-slate-800"
            )}
          >
            <Settings size={24} />
            <span className="hidden lg:block">{t.settings}</span>
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 z-40 flex md:hidden justify-around p-4">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={cn("p-2 rounded-xl", activeTab === 'dashboard' ? "text-blue-400" : "text-slate-500")}
        >
          <LayoutDashboard size={24} />
        </button>
        <button 
          onClick={() => setActiveTab('transactions')}
          className={cn("p-2 rounded-xl", activeTab === 'transactions' ? "text-blue-400" : "text-slate-500")}
        >
          <ListFilter size={24} />
        </button>
        <button 
          onClick={() => setActiveTab('recordReview')}
          className={cn("p-2 rounded-xl", activeTab === 'recordReview' ? "text-blue-400" : "text-slate-500")}
        >
          <History size={24} />
        </button>
        <button 
          onClick={() => setActiveTab('settings')}
          className={cn("p-2 rounded-xl", activeTab === 'settings' ? "text-blue-400" : "text-slate-500")}
        >
          <Settings size={24} />
        </button>
      </nav>

      {/* Main Content */}
      <main className="md:ml-20 lg:ml-64 p-6 lg:p-12 pb-24 md:pb-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-white">
                {activeTab === 'dashboard' ? t.overview : activeTab === 'transactions' ? t.transactions : activeTab === 'recordReview' ? t.recordReview : t.settings}
              </h2>
              <p className="text-slate-400">{t.welcomeBack}</p>
            </div>
            
            {activeTab !== 'settings' && (
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder={t.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl w-full md:w-64 lg:w-80 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-lg text-white placeholder:text-slate-600"
                />
              </div>
            )}
          </header>

          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' ? (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <SummaryCard title={t.totalBalance} amount={stats.totalBalance} icon={<Wallet size={24} />} type="balance" />
                  <SummaryCard title={t.totalIncome} amount={stats.totalIncome} icon={<TrendingUp size={24} />} type="income" />
                  <SummaryCard title={t.totalExpenses} amount={stats.totalExpenses} icon={<TrendingDown size={24} />} type="expense" />
                </div>

                {/* Charts */}
                <DashboardChart transactions={transactions} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Recent Transactions Section */}
                  <section className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white">{t.recentTransactions}</h3>
                      <button 
                        onClick={() => setActiveTab('transactions')}
                        className="text-blue-400 font-semibold hover:underline"
                      >
                        {t.viewAll}
                      </button>
                    </div>
                    <TransactionList 
                      transactions={transactions.slice(0, 5)} 
                      onDelete={handleDeleteTransaction} 
                    />
                  </section>

                  {/* Record Review Side Section */}
                  <section className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white">{t.recordReview}</h3>
                      <button 
                        onClick={() => setActiveTab('recordReview')}
                        className="text-blue-400 font-semibold hover:underline"
                      >
                        {t.viewAll}
                      </button>
                    </div>
                    <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-4">
                      {/* Show top 3 years */}
                      {Array.from(new Set(transactions.map(t => new Date(t.date).getFullYear())))
                        .sort((a: number, b: number) => b - a)
                        .slice(0, 3)
                        .map(year => {
                          const yearTransactions = transactions.filter(t => new Date(t.date).getFullYear() === year);
                          const income = yearTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
                          const expense = yearTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
                          const balance = income - expense;
                          return (
                            <div key={year} className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/50 border border-slate-800/50">
                              <div>
                                <p className="text-sm font-bold text-white">{year}</p>
                                <p className="text-xs text-slate-500">{t.balance}</p>
                              </div>
                              <p className={cn(
                                "font-bold",
                                balance >= 0 ? "text-emerald-400" : "text-rose-400"
                              )}>
                                ${balance.toLocaleString()}
                              </p>
                            </div>
                          );
                        })}
                    </div>
                  </section>
                </div>
              </motion.div>
            ) : activeTab === 'transactions' ? (
              <motion.div 
                key="transactions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Filters */}
                <div className="flex gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800 w-fit">
                  {(['all', 'income', 'expense'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setFilterType(type)}
                      className={cn(
                        "px-6 py-2 rounded-lg text-sm font-bold capitalize transition-all",
                        filterType === type ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:bg-slate-800"
                      )}
                    >
                      {type === 'all' ? t.viewAll : type === 'income' ? t.income : t.expense}
                    </button>
                  ))}
                </div>

                <TransactionList 
                  transactions={filteredTransactions} 
                  onDelete={handleDeleteTransaction} 
                />
              </motion.div>
            ) : activeTab === 'recordReview' ? (
              <motion.div 
                key="recordReview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <RecordReview transactions={transactions} />
              </motion.div>
            ) : (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl max-w-2xl">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl">
                      <Globe size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{t.language}</h3>
                      <p className="text-slate-400 text-sm">Choose your preferred display language.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={() => setLanguage('en')}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-2xl border transition-all",
                        language === 'en' 
                          ? "bg-blue-600/10 border-blue-500 text-blue-400 font-bold" 
                          : "bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800"
                      )}
                    >
                      <span>{t.english}</span>
                      {language === 'en' && <div className="w-2 h-2 rounded-full bg-blue-400" />}
                    </button>
                    <button
                      onClick={() => setLanguage('zh-TW')}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-2xl border transition-all",
                        language === 'zh-TW' 
                          ? "bg-blue-600/10 border-blue-500 text-blue-400 font-bold" 
                          : "bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800"
                      )}
                    >
                      <span>{t.traditionalChinese}</span>
                      {language === 'zh-TW' && <div className="w-2 h-2 rounded-full bg-blue-400" />}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Add Transaction Button & Modal */}
      <TransactionForm onAdd={handleAddTransaction} />
    </div>
  );
}
