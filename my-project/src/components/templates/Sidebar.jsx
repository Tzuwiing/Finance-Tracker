import NavItem from "../molecules/NavItem";
import { PAGES } from "../../constants/pages";
import { useUi } from "../../hooks/useUi";

export default function Sidebar() {
  const { page, setPage } = useUi();
  return (
    <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 flex-col p-5 bg-white/70 dark:bg-slate-900/70 backdrop-blur border-r border-slate-500/15 z-30">
      <div className="flex items-center gap-3 mb-8 px-2">
        <span className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 grid place-items-center text-2xl shadow-lg shadow-indigo-500/40 animate-float">💎</span>
        <div>
          <h1 className="font-extrabold leading-tight">Finance<br />Tracker</h1>
        </div>
      </div>
      <nav className="space-y-1 flex-1" aria-label="Navigasi utama">
        {PAGES.map((p) => <NavItem key={p.id} icon={p.icon} label={p.label} active={page === p.id} onClick={() => setPage(p.id)} />)}
      </nav>
      <p className="text-xs text-slate-400 px-2">🔒 Data tersimpan aman di perangkat Anda.</p>
    </aside>
  );
}
