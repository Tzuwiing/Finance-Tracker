import SummaryCards from "../components/organisms/SummaryCards";
import TrendChart from "../components/organisms/TrendChart";
import RecentTransactions from "../components/organisms/RecentTransactions";
import InsightsPanel from "../components/organisms/InsightsPanel";
import ExpenseChart from "../components/organisms/ExpenseChart";
import WalletsPanel from "../components/organisms/WalletsPanel";
import { usePeriodData } from "../hooks/usePeriodData";

export default function DashboardPage() {
  const { all, items, monthKey } = usePeriodData();
  return (
    <div className="space-y-6">
      <SummaryCards />
      <div className="grid xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <TrendChart all={all} endKey={monthKey} />
          <RecentTransactions />
        </div>
        <div className="space-y-6">
          <InsightsPanel />
          <ExpenseChart items={items} />
          <WalletsPanel />
        </div>
      </div>
    </div>
  );
}
