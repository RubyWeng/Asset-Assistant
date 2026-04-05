import React from "react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

interface SummaryCardProps {
  title: string;
  amount: number;
  icon: React.ReactNode;
  type?: 'income' | 'expense' | 'balance';
}

export const SummaryCard = ({ title, amount, icon, type = 'balance' }: SummaryCardProps) => {
  const isPositive = amount >= 0;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-800 flex items-center gap-4"
    >
      <div className={cn(
        "p-3 rounded-xl",
        type === 'income' ? "bg-emerald-500/10 text-emerald-400" : 
        type === 'expense' ? "bg-rose-500/10 text-rose-400" : 
        "bg-blue-500/10 text-blue-400"
      )}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-400">{title}</p>
        <p className={cn(
          "text-2xl font-bold",
          type === 'income' ? "text-emerald-400" : 
          type === 'expense' ? "text-rose-400" : 
          "text-white"
        )}>
          {type === 'balance' && !isPositive ? '-' : ''}${Math.abs(amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </p>
      </div>
    </motion.div>
  );
};
