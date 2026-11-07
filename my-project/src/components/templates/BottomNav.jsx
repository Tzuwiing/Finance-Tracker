import NavItem from "../molecules/NavItem";
import { PAGES } from "../../constants/pages";
import { useUi } from "../../hooks/useUi";

export default function BottomNav() {
  const { page, setPage } = useUi();
  return (
    <nav aria-label="Navigasi utama" className="lg:hidden fixed bottom-0 inset-x-0 z-40 flex bg-white/90 dark:bg-slate-900/90 backdrop-blur border-t border-slate-500/15 px-1">
      {PAGES.map((p) => <NavItem compact key={p.id} icon={p.icon} label={p.label} active={page === p.id} onClick={() => setPage(p.id)} />)}
    </nav>
  );
}
