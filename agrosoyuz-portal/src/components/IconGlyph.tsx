import {
  BookOpenCheck,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  ClipboardList,
  CreditCard,
  FileText,
  LandPlot,
  Leaf,
  LogIn,
  LogOut,
  PackageCheck,
  Sprout,
  Tractor,
  Warehouse,
  Wheat,
  type LucideIcon,
} from 'lucide-react';

const icons: Record<string, LucideIcon> = {
  BookOpenCheck,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  ClipboardList,
  CreditCard,
  FileText,
  LandPlot,
  Leaf,
  LogIn,
  LogOut,
  PackageCheck,
  Sprout,
  Tractor,
  Warehouse,
  Wheat,
};

export function IconGlyph({ name, className }: { name: string; className?: string }) {
  const Icon = icons[name] ?? Sprout;
  return <Icon aria-hidden="true" className={className} strokeWidth={1.9} />;
}
