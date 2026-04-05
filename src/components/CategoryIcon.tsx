import { 
  Briefcase, 
  TrendingUp, 
  PieChart, 
  Home, 
  Utensils, 
  CreditCard, 
  ShoppingBag, 
  Bus, 
  Film, 
  HeartPulse, 
  HelpCircle 
} from "lucide-react";
import { Category } from "../types";

export const CategoryIcon = ({ category, className }: { category: Category; className?: string }) => {
  switch (category) {
    case 'Salary': return <Briefcase className={className} />;
    case 'Stocks': return <TrendingUp className={className} />;
    case 'Dividends': return <PieChart className={className} />;
    case 'Rent': return <Home className={className} />;
    case 'Food': return <Utensils className={className} />;
    case 'Credit Card': return <CreditCard className={className} />;
    case 'Shopping': return <ShoppingBag className={className} />;
    case 'Transport': return <Bus className={className} />;
    case 'Entertainment': return <Film className={className} />;
    case 'Health': return <HeartPulse className={className} />;
    default: return <HelpCircle className={className} />;
  }
};
