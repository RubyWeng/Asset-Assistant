import { Category } from "./types";

export const CATEGORIES: Category[] = [
  'Salary',
  'Stocks',
  'Dividends',
  'Rent',
  'Food',
  'Credit Card',
  'Shopping',
  'Transport',
  'Entertainment',
  'Health',
  'Other'
];

export const INCOME_CATEGORIES: Category[] = ['Salary', 'Stocks', 'Dividends', 'Other'];
export const EXPENSE_CATEGORIES: Category[] = ['Rent', 'Food', 'Credit Card', 'Shopping', 'Transport', 'Entertainment', 'Health', 'Other'];

export const CATEGORY_COLORS: Record<Category, string> = {
  'Salary': '#10b981',
  'Stocks': '#3b82f6',
  'Dividends': '#8b5cf6',
  'Rent': '#ef4444',
  'Food': '#f59e0b',
  'Credit Card': '#6366f1',
  'Shopping': '#ec4899',
  'Transport': '#06b6d4',
  'Entertainment': '#f97316',
  'Health': '#14b8a6',
  'Other': '#64748b'
};
