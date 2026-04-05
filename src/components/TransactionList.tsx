import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import { Transaction } from "../types";
import { CategoryIcon } from "./CategoryIcon";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export const TransactionList = ({ transactions, onDelete }: TransactionListProps) => {
  const { t, translateCategory } = useLanguage();
  if (transactions.length === 0) {
    return (
      <div className="text-center py-12 bg-slate-900 rounded-3xl border border-dashed border-slate-800">
        <p className="text-slate-500 font-medium">{t.noTransactions}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {transactions.map((transaction) => (
          <motion.div
            key={transaction.id}
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-800 flex items-center justify-between group hover:border-blue-900/50 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className={cn(
                "p-3 rounded-xl",
                transaction.type === 'income' ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
              )}>
                <CategoryIcon category={transaction.category} className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-white">{translateCategory(transaction.category)}</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-slate-500">{format(new Date(transaction.date), 'MMM d, yyyy • h:mm a')}</p>
                  {transaction.description && (
                    <>
                      <span className="text-slate-700">•</span>
                      <p className="text-sm text-slate-500 italic">{transaction.description}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <p className={cn(
                "text-lg font-bold",
                transaction.type === 'income' ? "text-emerald-400" : "text-rose-400"
              )}>
                {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
              <button 
                onClick={() => onDelete(transaction.id)}
                className="p-2 text-slate-700 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
