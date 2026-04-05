import React, { useMemo } from 'react';
import { Transaction } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { cn } from '../lib/utils';

interface RecordReviewProps {
  transactions: Transaction[];
}

export const RecordReview = ({ transactions }: RecordReviewProps) => {
  const { t } = useLanguage();

  const yearlyData = useMemo(() => {
    const years: Record<number, { income: number; expense: number }> = {};
    
    transactions.forEach(t => {
      const year = new Date(t.date).getFullYear();
      if (!years[year]) {
        years[year] = { income: 0, expense: 0 };
      }
      if (t.type === 'income') {
        years[year].income += t.amount;
      } else {
        years[year].expense += t.amount;
      }
    });

    return Object.entries(years)
      .map(([year, data]) => ({
        year: parseInt(year),
        income: data.income,
        expense: data.expense,
        balance: data.income - data.expense
      }))
      .sort((a, b) => b.year - a.year);
  }, [transactions]);

  if (yearlyData.length === 0) {
    return (
      <div className="text-center py-12 bg-slate-900 rounded-3xl border border-dashed border-slate-800">
        <p className="text-slate-500 font-medium">{t.noTransactions}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white mb-4">{t.yearlySummary}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {yearlyData.map((data, index) => (
          <motion.div
            key={data.year}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-lg hover:border-blue-500/30 transition-all group"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
                  <Calendar size={20} />
                </div>
                <span className="text-2xl font-bold text-white">{data.year}</span>
              </div>
              <div className={cn(
                "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                data.balance >= 0 ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
              )}>
                {data.balance >= 0 ? t.income : t.expense}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm font-medium">{t.totalIncome}</span>
                <div className="flex items-center gap-1 text-emerald-400 font-bold">
                  <TrendingUp size={14} />
                  <span>${data.income.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm font-medium">{t.totalExpenses}</span>
                <div className="flex items-center gap-1 text-rose-400 font-bold">
                  <TrendingDown size={14} />
                  <span>${data.expense.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                <span className="text-white font-bold">{t.balance}</span>
                <span className={cn(
                  "text-xl font-black",
                  data.balance >= 0 ? "text-blue-400" : "text-rose-400"
                )}>
                  ${data.balance.toLocaleString()}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
