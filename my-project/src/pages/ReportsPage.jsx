import TrendChart from "../components/organisms/TrendChart";
import BalanceChart from "../components/organisms/BalanceChart";
import ExpenseChart from "../components/organisms/ExpenseChart";
import MonthlyTable from "../components/organisms/MonthlyTable";
import { usePeriodData } from "../hooks/usePeriodData";

export default function ReportsPage() {
  const { all, items, monthKey } = usePeriodData();
  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        <TrendChart all={all} endKey={monthKey} />
        <BalanceChart all={all} endKey={monthKey} />
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <ExpenseChart items={items} />
        <ExpenseChart items={items} tipe="pemasukan" title="Pemasukan per Kategori" />
      </div>
      <MonthlyTable all={all} endKey={monthKey} />
    </div>
  );
}
