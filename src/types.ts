export type TransactionType = 'income' | 'expense';

export type Category = 
  | 'Salary' 
  | 'Stocks' 
  | 'Dividends' 
  | 'Rent' 
  | 'Food' 
  | 'Credit Card' 
  | 'Shopping' 
  | 'Transport' 
  | 'Entertainment' 
  | 'Health' 
  | 'Other';

export interface Transaction {
  id: string;
  type: TransactionType;
  category: Category;
  amount: number;
  description: string;
  date: string; // ISO string
}

export interface DashboardStats {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  recentTransactions: Transaction[];
}
