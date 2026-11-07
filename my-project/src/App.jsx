import UiProvider from "./context/UiProvider";
import FinanceProvider from "./context/FinanceProvider";
import DashboardLayout from "./components/templates/DashboardLayout";
import ErrorBoundary from "./components/templates/ErrorBoundary";
import DashboardPage from "./pages/DashboardPage";
import TransactionsPage from "./pages/TransactionsPage";
import BudgetPage from "./pages/BudgetPage";
import GoalsPage from "./pages/GoalsPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import { useUi } from "./hooks/useUi";

const ROUTES = {
  dashboard: DashboardPage,
  transaksi: TransactionsPage,
  anggaran: BudgetPage,
  tujuan: GoalsPage,
  laporan: ReportsPage,
  pengaturan: SettingsPage,
};

function Router() {
  const { page } = useUi();
  const Page = ROUTES[page] || DashboardPage;
  return <div key={page} className="animate-fade-up"><Page /></div>;
}

export default function App() {
  return (
    <ErrorBoundary>
      <UiProvider>
        <FinanceProvider>
          <DashboardLayout><Router /></DashboardLayout>
        </FinanceProvider>
      </UiProvider>
    </ErrorBoundary>
  );
}
