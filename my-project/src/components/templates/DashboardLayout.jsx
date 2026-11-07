import { useEffect } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import BottomNav from "./BottomNav";
import ToastHost from "../organisms/ToastHost";
import TransactionModal from "../organisms/TransactionModal";
import { useUi } from "../../hooks/useUi";

export default function DashboardLayout({ children }) {
  const { page } = useUi();
  useEffect(() => { window.scrollTo?.({ top: 0 }); }, [page]);
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors relative overflow-x-hidden">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-0">
        <div className="absolute -top-32 -left-24 w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl animate-float" />
        <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-fuchsia-500/10 blur-3xl animate-float" />
      </div>
      <Sidebar />
      <main className="relative z-10 lg:pl-64">
        <div className="max-w-6xl mx-auto p-4 sm:p-8 pb-28 lg:pb-10 space-y-6">
          <TopBar />
          {children}
        </div>
      </main>
      <BottomNav />
      <ToastHost />
      <TransactionModal />
    </div>
  );
}
