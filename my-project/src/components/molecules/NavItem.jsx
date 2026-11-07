export default function NavItem({ icon, label, active, onClick, compact = false }) {
  const base = compact
    ? "flex-1 flex flex-col items-center gap-0.5 py-2 text-[10px]"
    : "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm";
  const state = active
    ? "bg-indigo-600/10 text-indigo-600 dark:text-indigo-300 font-semibold"
    : "text-slate-500 hover:bg-slate-500/10";
  return (
    <button onClick={onClick} aria-current={active ? "page" : undefined} className={`${base} ${state} transition`}>
      <span className={compact ? "text-xl" : "text-lg"}>{icon}</span>
      <span>{label}</span>
    </button>
  );
}
