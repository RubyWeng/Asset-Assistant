import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Plus } from "lucide-react";
import { Transaction, TransactionType, Category } from "../types";
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from "../constants";
import { cn } from "../lib/utils";
import { useLanguage } from "../contexts/LanguageContext";

interface TransactionFormProps {
  onAdd: (transaction: Omit<Transaction, 'id'>) => void;
}

export const TransactionForm = ({ onAdd }: TransactionFormProps) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>('Food');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category) return;

    onAdd({
      type,
      amount: parseFloat(amount),
      category,
      description,
      date: new Date(date).toISOString(),
    });

    // Reset form
    setAmount('');
    setDescription('');
    setIsOpen(false);
  };

  const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all flex items-center gap-2 z-50"
      >
        <Plus size={24} />
        <span className="font-semibold pr-2">{t.newTransaction}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-slate-800"
            >
              <div className="p-6 flex justify-between items-center border-b border-slate-800">
                <h2 className="text-xl font-bold text-white">{t.newTransaction}</h2>
                <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-slate-300">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="flex bg-slate-950 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => { setType('expense'); setCategory('Food'); }}
                    className={cn(
                      "flex-1 py-2 rounded-lg text-sm font-semibold transition-all",
                      type === 'expense' ? "bg-slate-800 text-rose-400 shadow-sm" : "text-slate-500"
                    )}
                  >
                    {t.expense}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setType('income'); setCategory('Salary'); }}
                    className={cn(
                      "flex-1 py-2 rounded-lg text-sm font-semibold transition-all",
                      type === 'income' ? "bg-slate-800 text-emerald-400 shadow-sm" : "text-slate-500"
                    )}
                  >
                    {t.income}
                  </button>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.amount}</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">$</span>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-semibold text-lg text-white placeholder:text-slate-700"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.category}</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Category)}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-white"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat} className="bg-slate-900">{t[cat.charAt(0).toLowerCase() + cat.slice(1).replace(' ', '') as keyof typeof t] || cat}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.description}</label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What was this for?"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-white placeholder:text-slate-700"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.date}</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-white"
                  />
                </div>

                <button
                  type="submit"
                  className={cn(
                    "w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all active:scale-95 mt-4",
                    type === 'income' ? "bg-emerald-600 hover:bg-emerald-700" : "bg-rose-600 hover:bg-rose-700"
                  )}
                >
                  {t.add} {type === 'income' ? t.income : t.expense}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
